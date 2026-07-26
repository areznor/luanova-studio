(function () {
  const { t } = window.LuaI18n;

  function sealById(id) {
    return window.LUA_NOVA.seals.find((s) => s.id === id);
  }

  function primarySeal(book) {
    return sealById(book.seals[0]) || window.LUA_NOVA.seals[0];
  }

  function authorNames(book) {
    return book.authorIds
      .map((id) => window.LUA_NOVA.authors[id]?.name)
      .filter(Boolean)
      .join(", ");
  }

  function sortCatalogBooks(books) {
    return [...books].sort((a, b) => {
      if (a.status === b.status) return 0;
      return a.status === "published" ? -1 : 1;
    });
  }

  function coverFaceHTML(book, lang, large = false) {
    const seal = primarySeal(book);
    const color = seal.color;
    const title = t(book.title, lang);
    const provisionalLabel = t(window.LUA_NOVA.ui.placeholderCover, lang);
    const w = large ? 220 : 160;
    const h = large ? 330 : 240;

    if (book.cover) {
      const provisional = book.provisional
        ? `<span class="cover-provisional">${escapeHtml(provisionalLabel)}</span>`
        : "";
      return `
        <div class="cover-face" style="--seal-color:${color}">
          <span class="cover-badge" aria-hidden="true"></span>
          <img src="${book.cover}" alt="${escapeAttr(title)}" width="${w}" height="${h}" loading="lazy" />
          ${provisional}
        </div>`;
    }

    return `
      <div class="cover-face" style="--seal-color:${color}">
        <span class="cover-badge" aria-hidden="true"></span>
        <div class="cover-placeholder" style="--seal-color:${color}">
          <span class="ph-label">${escapeHtml(provisionalLabel)}</span>
        </div>
      </div>`;
  }

  function coverCardHTML(book, lang) {
    const title = t(book.title, lang);
    const author = authorNames(book);
    return `
      <a class="cover-card" href="livro.html?id=${encodeURIComponent(book.id)}" title="${escapeAttr(title)}">
        ${coverFaceHTML(book, lang)}
        <div class="cover-meta">
          <p class="title">${escapeHtml(title)}</p>
          <p class="author">${escapeHtml(author)}</p>
        </div>
      </a>`;
  }

  function sealChipsHTML(book, lang) {
    return book.seals
      .map((id) => {
        const seal = sealById(id);
        if (!seal) return "";
        return `<span class="seal-chip" style="--seal-color:${seal.color}">${escapeHtml(t(seal.name, lang))}</span>`;
      })
      .join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  function bioParagraphsHTML(bio, lang) {
    return t(bio, lang)
      .split(/\n\n+/)
      .filter(Boolean)
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  function actionButton(label, href, lang, primary = false) {
    const cls = primary ? "btn btn-primary" : "btn btn-ghost";
    if (href) {
      return `<a class="${cls}" href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
    }
    return `<span class="${cls} btn-disabled" aria-disabled="true" title="${escapeAttr(t(window.LUA_NOVA.ui.linkSoon, lang))}">${escapeHtml(label)}</span>`;
  }

  const SOCIAL_ICONS = {
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></svg>`,
  };

  function socialIconButton(network, href, lang) {
    const labels = {
      instagram: t(window.LUA_NOVA.ui.socialInstagram, lang),
      facebook: t(window.LUA_NOVA.ui.socialFacebook, lang),
      youtube: t(window.LUA_NOVA.ui.socialYoutube, lang),
      linkedin: t(window.LUA_NOVA.ui.socialLinkedin, lang),
    };
    const label = labels[network] || network;
    const icon = SOCIAL_ICONS[network] || "";
    if (href) {
      return `<a class="social-icon" href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttr(label)}" title="${escapeAttr(label)}">${icon}</a>`;
    }
    return `<span class="social-icon social-icon--disabled" aria-disabled="true" title="${escapeAttr(t(window.LUA_NOVA.ui.linkSoon, lang))}" aria-label="${escapeAttr(label)}">${icon}</span>`;
  }

  function socialRow(social, lang, networks = ["instagram", "facebook", "youtube"]) {
    const data = social || {};
    return `
      <div class="social-row">
        ${networks.map((n) => socialIconButton(n, data[n] || null, lang)).join("")}
      </div>`;
  }

  /** EN prefers Amazon.com when buyUrlEn exists; otherwise falls back to Amazon.com.br (buyUrl). */
  function resolveBuyUrl(book, lang) {
    if (lang === "en") {
      return book.buyUrlEn || book.buyUrl || null;
    }
    return book.buyUrl || book.buyUrlEn || null;
  }

  function renderSeals(lang, options = {}) {
    const grid = document.querySelector(options.selector || "[data-seals]");
    if (!grid) return;
    const compact = !!options.compact;
    const hrefFor = (seal) => {
      if (options.hashOnly) return `#selo-${seal.id}`;
      if (options.linkToCatalog) return `catalogo.html#selo-${seal.id}`;
      return null;
    };

    grid.classList.toggle("seals-grid--compact", compact);
    grid.innerHTML = window.LUA_NOVA.seals
      .map((seal) => {
        const href = hrefFor(seal);
        const blurb = compact ? "" : `<p>${escapeHtml(t(seal.blurb, lang))}</p>`;
        const inner = `<h3>${escapeHtml(t(seal.name, lang))}</h3>${blurb}`;
        const cls = compact ? "seal-card seal-card--tag" : "seal-card";
        if (href) {
          return `<a class="${cls}" href="${href}" style="--seal-color:${seal.color}">${inner}</a>`;
        }
        return `<article class="${cls}" style="--seal-color:${seal.color}">${inner}</article>`;
      })
      .join("");
  }

  function renderCarousel(selector, books, lang) {
    const root = document.querySelector(selector);
    if (!root) return;

    root.classList.remove("is-paused", "is-marquee", "is-static");

    if (!books.length) {
      root.innerHTML = `<p class="carousel-empty">${lang === "pt" ? "Em breve." : "Coming soon."}</p>`;
      return;
    }

    root.innerHTML = `<div class="carousel-track"></div>`;
    const track = root.querySelector(".carousel-track");
    track.innerHTML = books.map((b) => coverCardHTML(b, lang)).join("");
  }

  function renderHome(lang) {
    const published = window.LUA_NOVA.books.filter((b) => b.status === "published");
    const upcoming = window.LUA_NOVA.books.filter((b) => b.status === "upcoming");
    renderSeals(lang, {
      selector: "[data-seals-home]",
      linkToCatalog: true,
      compact: false,
    });
    renderCarousel("[data-carousel-published]", published, lang);
    renderCarousel("[data-carousel-upcoming]", upcoming, lang);
    window.LuaCarousel.initAll();
  }

  function renderCatalog(lang) {
    renderSeals(lang, {
      selector: "[data-seals]",
      hashOnly: true,
      compact: true,
    });

    const mount = document.querySelector("[data-catalog]");
    if (!mount) return;

    const ui = window.LUA_NOVA.ui;
    mount.innerHTML = window.LUA_NOVA.seals
      .map((seal) => {
        const books = sortCatalogBooks(
          window.LUA_NOVA.books.filter((b) => b.seals.includes(seal.id))
        );
        const published = books.filter((b) => b.status === "published");
        const upcoming = books.filter((b) => b.status === "upcoming");

        let body = "";
        if (!books.length) {
          body = `<p class="carousel-empty">${escapeHtml(t(ui.emptySeal, lang))}</p>`;
        } else {
          if (published.length) {
            body += `
              <h3 class="catalog-subgroup">${escapeHtml(t(ui.subgroupPublished, lang))}</h3>
              <div class="catalog-grid">${published.map((b) => coverCardHTML(b, lang)).join("")}</div>`;
          }
          if (upcoming.length) {
            body += `
              <h3 class="catalog-subgroup">${escapeHtml(t(ui.subgroupUpcoming, lang))}</h3>
              <div class="catalog-grid">${upcoming.map((b) => coverCardHTML(b, lang)).join("")}</div>`;
          }
        }

        return `
          <section class="catalog-seal" id="selo-${seal.id}" style="--seal-color:${seal.color}">
            <div class="section-head">
              <h2>${escapeHtml(t(seal.name, lang))}</h2>
              <p>${escapeHtml(t(seal.blurb, lang))}</p>
            </div>
            ${body}
            <div class="catalog-section-actions">
              <a class="btn btn-ghost btn-back-top" href="#topo-catalogo">${escapeHtml(t(ui.backToTop, lang))}</a>
            </div>
          </section>`;
      })
      .join("");

    const hash = window.location.hash;
    if (hash && hash !== "#topo-catalogo") {
      requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function getQueryId() {
    return new URLSearchParams(window.location.search).get("id");
  }

  function renderBookPage(lang) {
    const mount = document.querySelector("[data-book-page]");
    if (!mount) return;

    const id = getQueryId();
    const book = window.LUA_NOVA.books.find((b) => b.id === id);

    if (!book) {
      mount.innerHTML = `<p class="prose">${lang === "pt" ? "Livro não encontrado." : "Book not found."}</p>
        <p><a class="crumb" href="index.html">${escapeHtml(t(window.LUA_NOVA.ui.backHome, lang))}</a></p>`;
      return;
    }

    const ui = window.LUA_NOVA.ui;
    const authors = book.authorIds
      .map((aid) => {
        const a = window.LUA_NOVA.authors[aid];
        if (!a) return "";
        return `<a href="autor.html?id=${encodeURIComponent(a.id)}">${escapeHtml(a.name)}</a>`;
      })
      .join(", ");

    const statusLabel =
      book.status === "published" ? t(ui.statusPublished, lang) : t(ui.statusUpcoming, lang);

    const buyUrl = resolveBuyUrl(book, lang);
    const interactUrl = book.interactUrl || null;
    const siteUrl = book.siteUrl || null;
    const downloadUrl = book.downloadUrl || null;
    const social = book.social || {};
    const isTasting = book.seals.includes("degustacoes");

    const actionBtns = [
      actionButton(t(ui.acquire, lang), buyUrl, lang, true),
      actionButton(t(ui.interact, lang), interactUrl, lang),
      actionButton(t(ui.siteBtn, lang), siteUrl, lang),
    ];

    if (isTasting || downloadUrl) {
      actionBtns.push(actionButton(t(ui.downloadSample, lang), downloadUrl, lang));
    }

    const socialBtns = socialRow(social, lang);

    document.title = `${t(book.title, lang)} · Lua Nova Studio`;

    mount.innerHTML = `
      <a class="crumb" href="catalogo.html">← ${escapeHtml(t(ui.navCatalog, lang))}</a>
      <div class="book-layout">
        <div class="book-cover-lg">${coverFaceHTML(book, lang, true)}</div>
        <div>
          <h1 class="book-title">${escapeHtml(t(book.title, lang))}</h1>
          <p class="book-subtitle">${escapeHtml(t(book.subtitle, lang))}</p>
          <div class="meta-row">
            <div class="meta-pair"><dt>${escapeHtml(t(ui.authorLabel, lang))}:</dt><dd>${authors}</dd></div>
            <div class="meta-pair"><dt>${escapeHtml(t(ui.sealsLabel, lang))}:</dt><dd>${sealChipsHTML(book, lang)}</dd></div>
            <div class="meta-pair"><dt>Status:</dt><dd>${escapeHtml(statusLabel)}${book.year ? ` · ${book.year}` : ""}</dd></div>
          </div>
          <div class="prose">
            <p>${escapeHtml(t(book.synopsis, lang))}</p>
            <p>${escapeHtml(t(book.details, lang))}</p>
          </div>
          <div class="book-actions">${actionBtns.join("")}</div>
          ${socialBtns}
        </div>
      </div>`;
  }

  function renderAuthorPage(lang) {
    const mount = document.querySelector("[data-author-page]");
    if (!mount) return;

    const id = getQueryId() || "amanda-reznor";
    const author = window.LUA_NOVA.authors[id];
    const ui = window.LUA_NOVA.ui;

    if (!author) {
      mount.innerHTML = `<p class="prose">${lang === "pt" ? "Autor(a) não encontrado(a)." : "Author not found."}</p>`;
      return;
    }

    const books = sortCatalogBooks(
      window.LUA_NOVA.books.filter((b) => b.authorIds.includes(author.id))
    );
    const photo = author.photo || "assets/brand/logo-minimalista-lua-nova.png";
    const displayName = author.fullName || author.name;
    const credit = author.photoCredit ? t(author.photoCredit, lang) : "";
    const links = author.links || {};

    const authorLinks = `
      <div class="book-actions author-links">
        ${actionButton(t(ui.siteBtn, lang), links.site || null, lang)}
        ${socialRow(links, lang, ["instagram", "facebook", "youtube", "linkedin"])}
      </div>`;

    document.title = `${author.name} · Lua Nova Studio`;

    mount.innerHTML = `
      <a class="crumb" href="index.html">${escapeHtml(t(ui.backHome, lang))}</a>
      <div class="author-layout">
        <div class="author-photo-wrap">
          <div class="author-photo">
            <img src="${escapeAttr(photo)}" alt="${escapeAttr(displayName)}" width="280" height="360" />
          </div>
          ${credit ? `<p class="photo-credit">${escapeHtml(credit)}</p>` : ""}
        </div>
        <div>
          <h1 class="author-name">${escapeHtml(displayName)}</h1>
          <div class="prose">${bioParagraphsHTML(author.bio, lang)}</div>
          ${authorLinks}
          <h2 class="author-books-title">${escapeHtml(t(ui.booksByAuthor, lang))}</h2>
          <ul class="book-list">
            ${books
              .map((b) => {
                const seal = primarySeal(b);
                return `<li>
                  <a href="livro.html?id=${encodeURIComponent(b.id)}">
                    <span class="dot" style="--seal-color:${seal.color}"></span>
                    <span>${escapeHtml(t(b.title, lang))}
                      <small style="color:var(--text-muted);font-weight:400"> · ${escapeHtml(
                        b.status === "published" ? t(ui.statusPublished, lang) : t(ui.statusUpcoming, lang)
                      )}</small>
                    </span>
                  </a>
                </li>`;
              })
              .join("")}
          </ul>
        </div>
      </div>`;
  }

  function renderAboutExtras(lang) {
    const contact = document.querySelector("[data-contact]");
    if (!contact) return;
    const site = window.LUA_NOVA.site;
    const ui = window.LUA_NOVA.ui;
    contact.innerHTML = `
      <ul class="contact-list">
        <li><strong>${escapeHtml(t(ui.emailLabel, lang))}</strong> ${escapeHtml(site.email)}</li>
        <li><strong>Instagram</strong> <a href="${escapeAttr(site.instagram)}" rel="noopener noreferrer">${escapeHtml(site.instagram.replace(/^https?:\/\//, ""))}</a></li>
        ${site.youtube ? `<li><strong>YouTube</strong> <a href="${escapeAttr(site.youtube)}" target="_blank" rel="noopener noreferrer">${escapeHtml(site.youtube.replace(/^https?:\/\//, ""))}</a></li>` : ""}
        ${site.facebook ? `<li><strong>Facebook</strong> <a href="${escapeAttr(site.facebook)}" target="_blank" rel="noopener noreferrer">${escapeHtml(site.name)}</a></li>` : ""}
        <li><strong>${escapeHtml(t(ui.shopLabel, lang))}</strong> <a href="${escapeAttr(site.amazon)}" target="_blank" rel="noopener noreferrer">Amazon / KDP</a></li>
      </ul>`;
  }

  function refreshPage(lang) {
    window.LuaI18n.applyStaticI18n(lang);
    const page = document.body.dataset.page;
    if (page === "home") renderHome(lang);
    if (page === "catalog") renderCatalog(lang);
    if (page === "book") renderBookPage(lang);
    if (page === "author") renderAuthorPage(lang);
    if (page === "about") renderAboutExtras(lang);
  }

  window.LuaApp = {
    refreshPage,
    init() {
      const lang = window.LuaI18n.init();
      refreshPage(lang);
      window.addEventListener("luanova:lang", (e) => {
        refreshPage(e.detail.lang);
      });
    },
  };

  document.addEventListener("DOMContentLoaded", () => window.LuaApp.init());
})();
