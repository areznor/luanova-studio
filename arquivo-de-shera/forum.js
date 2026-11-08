/* Sala de Leitura — the Shera forum.
   Two backends behind one interface:
   - Firebase (Auth + Firestore) on the live site, once firebase-config.js is filled in;
   - a localStorage demo on localhost or with ?demo, to try the forum without an account.
   User text is always rendered with textContent, never as HTML. */

const I = window.SheraI18n;
const cfg = window.SHERA_FIREBASE || {};
const root = document.querySelector("[data-forum]");
const authEl = document.querySelector("[data-forum-auth]");
const FIREBASE_VERSION = "10.12.2";

const ROOMS = [
  { id: "geral" },
  { id: "v1", vol: 1, color: "#d3a766" },
  { id: "v2", vol: 2, color: "#d89a99" },
  { id: "v3", vol: 3, color: "#c3d1dc" },
  { id: "v4", vol: 4, color: "#83bfa3" },
  { id: "v5", vol: 5, color: "#ba9cd4" },
];

const LIMITS = { title: 120, body: 4000, name: 60 };

const isLocal =
  ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname) || new URLSearchParams(location.search).has("demo");

const state = {
  room: "geral",
  view: "list", // list | thread | compose
  threadId: null,
  user: null,
  isAdmin: false,
  threads: [],
  thread: null,
  posts: [],
  notice: "",
  error: "",
};

let backend = null;

/* ——— DOM helpers ——— */
function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "style") el.style.cssText = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  children.flat().forEach((c) => c != null && el.append(c));
  return el;
}

function fmtDate(d) {
  if (!d) return I.t("fJustNow");
  return new Intl.DateTimeFormat(I.lang === "pt" ? "pt-BR" : "en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function roomLabel(room) {
  return room.vol ? `Vol. ${room.vol}` : I.t("roomGeneral");
}

function replyLabel(n) {
  return n === 1 ? I.t("fReply1") : I.t("fReplies", { n });
}

function canDelete(item) {
  return !!state.user && (state.isAdmin || item.authorUid === state.user.uid);
}

/* ——— Rendering ——— */
function renderAuth() {
  authEl.replaceChildren();
  if (!backend) return;
  if (state.user) {
    const name = state.user.name || "?";
    authEl.append(
      h(
        "span",
        { class: "auth-user" },
        h("span", { class: "auth-avatar", "aria-hidden": "true", text: name.trim().charAt(0).toUpperCase() }),
        h("span", { text: name })
      ),
      h("button", { type: "button", class: "btn btn-line btn-small", text: I.t("fLogout"), onclick: () => backend.signOut() })
    );
  }
}

function renderRooms() {
  const tabs = h("div", { class: "rooms", role: "tablist", "aria-label": I.t("forumTitle") });
  ROOMS.forEach((room) => {
    tabs.append(
      h("button", {
        type: "button",
        class: "room",
        role: "tab",
        "aria-selected": String(state.room === room.id),
        style: room.color ? `--room:${room.color}` : null,
        text: roomLabel(room),
        onclick: () => {
          state.room = room.id;
          state.view = "list";
          render();
        },
      })
    );
  });
  const room = ROOMS.find((r) => r.id === state.room);
  const note = room.vol ? I.t("roomNoteVol", { n: room.vol }) : I.t("roomNoteGeneral");
  return [tabs, h("p", { class: "room-note", text: note })];
}

function loginBox() {
  const box = h("div", { class: "login-box" }, h("p", { text: I.t("fLoginToPost") }));
  if (backend.demo) {
    box.append(
      h("button", {
        type: "button",
        class: "btn btn-bronze btn-small",
        text: I.t("fDemoLogin"),
        onclick: () => backend.signInDemo(),
      })
    );
    return box;
  }
  const msg = h("p", { class: "form-msg", role: "status" });
  const email = h("input", {
    class: "field",
    type: "email",
    required: true,
    autocomplete: "email",
    placeholder: I.t("fEmailPlaceholder"),
    "aria-label": "E-mail",
  });
  box.append(
    h("button", {
      type: "button",
      class: "btn btn-bronze btn-small",
      text: I.t("fLoginGoogle"),
      onclick: async () => {
        try {
          await backend.signInGoogle();
        } catch (e) {
          if (e && e.code !== "auth/popup-closed-by-user") msg.textContent = I.t("fLoginFail");
        }
      },
    }),
    h(
      "form",
      {
        class: "email-form",
        onsubmit: async (ev) => {
          ev.preventDefault();
          try {
            await backend.sendEmailLink(email.value.trim());
            msg.style.color = "var(--jade)";
            msg.textContent = I.t("fEmailSent", { email: email.value.trim() });
          } catch (e) {
            msg.style.color = "";
            msg.textContent = I.t("fEmailFail");
          }
        },
      },
      email,
      h("button", { type: "submit", class: "btn btn-line btn-small", text: I.t("fLoginEmail") })
    ),
    msg
  );
  return box;
}

function postBody(item) {
  const body = h("p", { class: "post-body", text: item.body });
  if (!item.spoiler) return [body];
  return [
    body,
    h("button", {
      type: "button",
      class: "btn btn-line btn-small spoiler-btn",
      text: I.t("fReveal"),
      onclick: (ev) => ev.currentTarget.closest(".spoiler").classList.add("revealed"),
    }),
  ];
}

function deleteButton(onConfirm) {
  return h(
    "span",
    { class: "post-actions" },
    h("button", {
      type: "button",
      class: "link-btn",
      text: I.t("fDelete"),
      onclick: async () => {
        if (!confirm(I.t("fConfirmDelete"))) return;
        await onConfirm();
      },
    })
  );
}

function renderList() {
  const list = state.threads.filter((th) => th.room === state.room);
  const toolbar = h(
    "div",
    { class: "forum-toolbar" },
    h("h3", { text: I.t("fTopics") }),
    state.user
      ? h("button", {
          type: "button",
          class: "btn btn-bronze btn-small",
          text: I.t("fNewTopic"),
          onclick: () => {
            state.view = "compose";
            render();
          },
        })
      : null
  );
  const ul = h("ul", { class: "threads" });
  list.forEach((th) => {
    ul.append(
      h(
        "li",
        { class: "thread-row" },
        h(
          "button",
          { type: "button", onclick: () => openThread(th.id) },
          h("span", { class: "thread-title" }, th.title, th.spoiler ? h("span", { class: "tag-spoiler", text: I.t("fSpoiler") }) : null),
          h("span", { class: "thread-meta", text: `${I.t("fBy")} ${th.authorName} · ${fmtDate(th.lastActivity)}` }),
          h("span", { class: "thread-count", text: replyLabel(th.replyCount || 0) })
        )
      )
    );
  });
  return [
    toolbar,
    list.length ? ul : h("p", { class: "empty", text: I.t("fEmpty") }),
    state.user ? null : loginBox(),
  ];
}

function composeForm({ isReply }) {
  const msg = h("p", { class: "form-msg", role: "alert" });
  const title = isReply
    ? null
    : h("input", { class: "field", name: "title", maxlength: LIMITS.title, required: true, autocomplete: "off" });
  const body = h("textarea", { class: "field", name: "body", maxlength: LIMITS.body, required: true });
  const spoiler = h("input", { type: "checkbox", name: "spoiler" });
  const submit = h("button", { type: "submit", class: "btn btn-bronze btn-small", text: I.t(isReply ? "fSendReply" : "fPublish") });

  const form = h(
    "form",
    {
      class: "compose",
      onsubmit: async (ev) => {
        ev.preventDefault();
        const data = { body: body.value.trim(), spoiler: spoiler.checked };
        if (!isReply) data.title = title.value.trim();
        if (!data.body || (!isReply && !data.title)) {
          msg.textContent = I.t(isReply ? "fTooShortReply" : "fTooShort");
          return;
        }
        submit.disabled = true;
        try {
          if (isReply) {
            await backend.createPost(state.threadId, data);
            await refreshThreads();
            await openThread(state.threadId, { keepScroll: true });
          } else {
            data.room = state.room;
            const id = await backend.createThread(data);
            await refreshThreads();
            await openThread(id);
          }
        } catch (e) {
          console.error(e);
          msg.textContent = I.t("fSendFail");
          submit.disabled = false;
        }
      },
    },
    title ? h("label", {}, I.t("fTitle"), title) : null,
    h("label", {}, I.t(isReply ? "fReplyLabel" : "fMessage"), body),
    h(
      "div",
      { class: "compose-row" },
      h("label", { class: "check" }, spoiler, I.t("fMarkSpoiler")),
      h(
        "span",
        { class: "auth" },
        isReply
          ? null
          : h("button", {
              type: "button",
              class: "btn btn-line btn-small",
              text: I.t("fCancel"),
              onclick: () => {
                state.view = "list";
                render();
              },
            }),
        submit
      )
    ),
    msg
  );
  return form;
}

function renderThread() {
  const th = state.thread;
  if (!th) return [h("p", { class: "empty", text: I.t("fEmpty") })];
  const wrap = h(
    "div",
    { class: "thread-view" },
    h("button", {
      type: "button",
      class: "back-link",
      text: I.t("fBack"),
      onclick: () => {
        state.view = "list";
        render();
      },
    }),
    h(
      "article",
      { class: `post post-first${th.spoiler ? " spoiler" : ""}` },
      h("h3", { text: th.title }),
      h(
        "div",
        { class: "post-meta" },
        h("span", { class: "post-author", text: th.authorName }),
        h("span", { text: fmtDate(th.createdAt) }),
        th.spoiler ? h("span", { class: "tag-spoiler", text: I.t("fSpoiler") }) : null,
        // Authors may delete their own topic only while it has no replies (mirrors firestore.rules).
        canDelete(th) && (state.isAdmin || !(th.replyCount || 0))
          ? deleteButton(async () => {
              await backend.deleteThread(th.id);
              state.view = "list";
              await refreshThreads();
            })
          : null
      ),
      postBody(th)
    )
  );
  state.posts.forEach((p) => {
    wrap.append(
      h(
        "article",
        { class: `post${p.spoiler ? " spoiler" : ""}` },
        h(
          "div",
          { class: "post-meta" },
          h("span", { class: "post-author", text: p.authorName }),
          h("span", { text: fmtDate(p.createdAt) }),
          canDelete(p)
            ? deleteButton(async () => {
                await backend.deletePost(th.id, p.id);
                await refreshThreads();
                await openThread(th.id, { keepScroll: true });
              })
            : null
        ),
        postBody(p)
      )
    );
  });
  return [wrap, state.user ? composeForm({ isReply: true }) : loginBox()];
}

function render() {
  if (!backend) return;
  const parts = [];
  if (backend.demo) parts.push(h("p", { class: "forum-banner", text: I.t("fDemo") }));
  parts.push(...renderRooms());
  if (state.error) parts.push(h("p", { class: "forum-status", text: state.error }));
  else if (state.view === "thread") parts.push(...renderThread());
  else if (state.view === "compose" && state.user) parts.push(composeForm({ isReply: false }));
  else parts.push(...renderList());
  root.replaceChildren(...parts);
  root.after(rulesNote());
  renderAuth();
}

let rulesEl = null;
function rulesNote() {
  if (!rulesEl) rulesEl = h("p", { class: "forum-rules" });
  rulesEl.textContent = I.t("fRules");
  return rulesEl;
}

function renderMessage(key) {
  root.replaceChildren(h("p", { class: "forum-status", text: I.t(key) }));
  root.dataset.msg = key;
}

/* ——— Data flow ——— */
async function refreshThreads() {
  try {
    state.threads = await backend.listThreads();
    state.error = "";
  } catch (e) {
    console.error(e);
    state.error = I.t("fError");
  }
  render();
}

async function openThread(id, { keepScroll = false } = {}) {
  const y = window.scrollY;
  try {
    const [thread, posts] = await Promise.all([backend.getThread(id), backend.listPosts(id)]);
    state.thread = thread;
    state.posts = posts;
    state.threadId = id;
    state.view = thread ? "thread" : "list";
    if (thread) state.room = thread.room;
  } catch (e) {
    console.error(e);
    state.error = I.t("fError");
  }
  render();
  if (keepScroll) window.scrollTo(0, y);
  else document.getElementById("sala").scrollIntoView({ block: "start" });
}

function onUser(user, isAdmin) {
  state.user = user;
  state.isAdmin = !!isAdmin;
  render();
}

/* ——— Backends ——— */
function clean(s, max) {
  return String(s || "").slice(0, max);
}

function demoBackend() {
  const KEY = "shera-forum-demo";
  const UKEY = "shera-forum-demo-user";
  const load = () => JSON.parse(localStorage.getItem(KEY) || '{"threads":[]}');
  const save = (db) => localStorage.setItem(KEY, JSON.stringify(db));
  const rev = (o) => ({ ...o, createdAt: new Date(o.createdAt), lastActivity: o.lastActivity ? new Date(o.lastActivity) : null });
  const uid = () => Math.random().toString(36).slice(2, 10);
  let cb = null;
  const me = () => JSON.parse(localStorage.getItem(UKEY) || "null");

  return {
    demo: true,
    init(onUserCb) {
      cb = onUserCb;
      cb(me(), true);
    },
    signInDemo() {
      const name = clean((prompt(I.t("fNameAsk")) || "").trim(), LIMITS.name);
      if (!name) return;
      localStorage.setItem(UKEY, JSON.stringify({ uid: "demo-" + uid(), name }));
      cb(me(), true);
    },
    signOut() {
      localStorage.removeItem(UKEY);
      cb(null, false);
    },
    async listThreads() {
      return load()
        .threads.map(({ posts, ...t }) => rev(t))
        .sort((a, b) => b.lastActivity - a.lastActivity);
    },
    async getThread(id) {
      const t = load().threads.find((x) => x.id === id);
      if (!t) return null;
      const { posts, ...rest } = t;
      return rev(rest);
    },
    async listPosts(id) {
      const t = load().threads.find((x) => x.id === id);
      return t ? t.posts.map(rev) : [];
    },
    async createThread({ title, body, room, spoiler }) {
      const db = load();
      const u = me();
      const now = Date.now();
      const id = uid();
      db.threads.push({
        id,
        title: clean(title, LIMITS.title),
        body: clean(body, LIMITS.body),
        room,
        spoiler: !!spoiler,
        authorUid: u.uid,
        authorName: u.name,
        createdAt: now,
        lastActivity: now,
        replyCount: 0,
        posts: [],
      });
      save(db);
      return id;
    },
    async createPost(threadId, { body, spoiler }) {
      const db = load();
      const u = me();
      const t = db.threads.find((x) => x.id === threadId);
      const now = Date.now();
      t.posts.push({ id: uid(), body: clean(body, LIMITS.body), spoiler: !!spoiler, authorUid: u.uid, authorName: u.name, createdAt: now });
      t.replyCount += 1;
      t.lastActivity = now;
      save(db);
    },
    async deleteThread(id) {
      const db = load();
      db.threads = db.threads.filter((x) => x.id !== id);
      save(db);
    },
    async deletePost(threadId, postId) {
      const db = load();
      const t = db.threads.find((x) => x.id === threadId);
      t.posts = t.posts.filter((p) => p.id !== postId);
      t.replyCount = Math.max(0, t.replyCount - 1);
      save(db);
    },
  };
}

async function firebaseBackend() {
  const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
  const [{ initializeApp }, A, F] = await Promise.all([
    import(`${base}/firebase-app.js`),
    import(`${base}/firebase-auth.js`),
    import(`${base}/firebase-firestore.js`),
  ]);
  const app = initializeApp(cfg);
  const auth = A.getAuth(app);
  const db = F.getFirestore(app);
  const EMAIL_KEY = "shera-forum-email";

  const fromDoc = (d) => {
    const x = d.data();
    return {
      id: d.id,
      ...x,
      createdAt: x.createdAt ? x.createdAt.toDate() : null,
      lastActivity: x.lastActivity ? x.lastActivity.toDate() : null,
    };
  };
  const author = () => ({ authorUid: auth.currentUser.uid, authorName: clean(auth.currentUser.displayName || "Leitor", LIMITS.name) });

  // Finish an email-link sign-in when the visitor comes back through the link.
  if (A.isSignInWithEmailLink(auth, location.href)) {
    let email = localStorage.getItem(EMAIL_KEY) || prompt(I.t("fEmailAsk"));
    if (email) {
      try {
        await A.signInWithEmailLink(auth, email, location.href);
        localStorage.removeItem(EMAIL_KEY);
      } catch (e) {
        console.error(e);
      }
    }
    history.replaceState(null, "", location.pathname + "#sala");
  }

  return {
    demo: false,
    init(cb) {
      A.onAuthStateChanged(auth, async (u) => {
        if (!u) return cb(null, false);
        if (!u.displayName) {
          const name = clean((prompt(I.t("fNameAsk")) || "").trim(), LIMITS.name) || "Leitor";
          await A.updateProfile(u, { displayName: name });
        }
        let admin = false;
        try {
          admin = (await F.getDoc(F.doc(db, "admins", u.uid))).exists();
        } catch (e) {
          admin = false;
        }
        cb({ uid: u.uid, name: u.displayName }, admin);
      });
    },
    signInGoogle() {
      return A.signInWithPopup(auth, new A.GoogleAuthProvider());
    },
    async sendEmailLink(email) {
      await A.sendSignInLinkToEmail(auth, email, { url: location.origin + location.pathname, handleCodeInApp: true });
      localStorage.setItem(EMAIL_KEY, email);
    },
    signOut() {
      return A.signOut(auth);
    },
    async listThreads() {
      const q = F.query(F.collection(db, "threads"), F.orderBy("lastActivity", "desc"), F.limit(200));
      return (await F.getDocs(q)).docs.map(fromDoc);
    },
    async getThread(id) {
      const d = await F.getDoc(F.doc(db, "threads", id));
      return d.exists() ? fromDoc(d) : null;
    },
    async listPosts(id) {
      const q = F.query(F.collection(db, "threads", id, "posts"), F.orderBy("createdAt", "asc"), F.limit(500));
      return (await F.getDocs(q)).docs.map(fromDoc);
    },
    async createThread({ title, body, room, spoiler }) {
      const ref = await F.addDoc(F.collection(db, "threads"), {
        title: clean(title, LIMITS.title),
        body: clean(body, LIMITS.body),
        room,
        spoiler: !!spoiler,
        ...author(),
        createdAt: F.serverTimestamp(),
        lastActivity: F.serverTimestamp(),
        replyCount: 0,
      });
      return ref.id;
    },
    async createPost(threadId, { body, spoiler }) {
      const batch = F.writeBatch(db);
      batch.set(F.doc(F.collection(db, "threads", threadId, "posts")), {
        body: clean(body, LIMITS.body),
        spoiler: !!spoiler,
        ...author(),
        createdAt: F.serverTimestamp(),
      });
      batch.update(F.doc(db, "threads", threadId), { replyCount: F.increment(1), lastActivity: F.serverTimestamp() });
      await batch.commit();
    },
    async deleteThread(id) {
      const posts = await F.getDocs(F.collection(db, "threads", id, "posts"));
      const batch = F.writeBatch(db);
      posts.docs.forEach((d) => batch.delete(d.ref));
      batch.delete(F.doc(db, "threads", id));
      await batch.commit();
    },
    async deletePost(threadId, postId) {
      await F.deleteDoc(F.doc(db, "threads", threadId, "posts", postId));
    },
  };
}

/* ——— Boot ——— */
async function boot() {
  const configured = !!(cfg.apiKey && cfg.projectId);
  try {
    if (configured) backend = await firebaseBackend();
    else if (isLocal) backend = demoBackend();
    else {
      renderMessage("fSoon");
      return;
    }
  } catch (e) {
    console.error(e);
    renderMessage("fError");
    return;
  }
  backend.init(onUser);
  await refreshThreads();
  if (location.hash === "#sala" && configured) document.getElementById("sala").scrollIntoView();
}

I.onChange(() => {
  if (backend) render();
  else if (root.dataset.msg) renderMessage(root.dataset.msg);
});

boot();
