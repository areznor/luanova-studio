(function () {
  const STORAGE_KEY = "luanova-lang";

  /** Browser locales starting with pt (BR, PT, AO, MZ, CV, etc.). */
  function isLusophoneLocale(locale) {
    if (!locale) return false;
    const normalized = String(locale).trim().toLowerCase().replace(/_/g, "-");
    return normalized === "pt" || normalized.startsWith("pt-");
  }

  function detectDefaultLang() {
    const candidates = [];
    if (Array.isArray(navigator.languages)) {
      candidates.push(...navigator.languages);
    }
    if (navigator.language) candidates.push(navigator.language);
    try {
      const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
      if (intlLocale) candidates.push(intlLocale);
    } catch (_) {
      /* ignore */
    }

    for (const locale of candidates) {
      if (isLusophoneLocale(locale)) return "pt";
    }
    return "en";
  }

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") return stored;
    return detectDefaultLang();
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
    detectDefaultLang,
    init() {
      const lang = getLang();
      setLang(lang);
      bindLangToggle();
      applyStaticI18n(lang);
      return lang;
    },
  };
})();
