(function () {
  const STORAGE_KEY = "luanova-lang";

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") return stored;
    return "pt";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.documentElement.dataset.lang = lang;
    window.dispatchEvent(new CustomEvent("luanova:lang", { detail: { lang } }));
  }

  function t(value, lang) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[lang] || value.pt || value.en || "";
  }

  function withYear(text) {
    return String(text).replace(/\{year\}/g, String(new Date().getFullYear()));
  }

  function applyStaticI18n(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const path = key.split(".");
      let node = window.LUA_NOVA;
      for (const part of path) {
        node = node?.[part];
      }
      if (node != null) el.textContent = withYear(t(node, lang));
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const path = key.split(".");
      let node = window.LUA_NOVA;
      for (const part of path) {
        node = node?.[part];
      }
      if (node != null) el.innerHTML = withYear(t(node, lang));
    });

    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      const pressed = btn.dataset.lang === lang;
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
    });
  }

  function bindLangToggle() {
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (lang === "pt" || lang === "en") {
          setLang(lang);
          applyStaticI18n(lang);
        }
      });
    });
  }

  window.LuaI18n = {
    getLang,
    setLang,
    t,
    applyStaticI18n,
    bindLangToggle,
    init() {
      const lang = getLang();
      setLang(lang);
      bindLangToggle();
      applyStaticI18n(lang);
      return lang;
    },
  };
})();
