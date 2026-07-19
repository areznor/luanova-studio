(function () {
  const RESUME_DELAY = 1000;

  function duplicateForLoop(track) {
    const children = Array.from(track.children);
    if (!children.length) return;
    children.forEach((child) => {
      const clone = child.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.tabIndex = -1;
      track.appendChild(clone);
    });
  }

  function clearClones(track) {
    track.querySelectorAll('[aria-hidden="true"]').forEach((el) => el.remove());
  }

  function setupCarousel(root) {
    const track = root.querySelector(".carousel-track");
    if (!track || track.children.length === 0) return;

    if (root._carouselAbort) root._carouselAbort.abort();
    clearClones(track);
    root.classList.remove("is-marquee", "is-static", "is-paused");

    const applyMode = () => {
      clearClones(track);
      const overflows = track.scrollWidth > root.clientWidth + 4;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!overflows || reduceMotion) {
        root.classList.add("is-static");
        root.classList.remove("is-marquee", "is-paused");
        return;
      }

      root.classList.remove("is-static");
      root.classList.add("is-marquee");
      duplicateForLoop(track);

      const count = track.children.length / 2;
      const duration = Math.max(28, count * 5);
      root.style.setProperty("--marquee-duration", `${duration}s`);

      root._carouselAbort = new AbortController();
      const { signal } = root._carouselAbort;
      let resumeTimer = null;

      const pause = () => {
        if (resumeTimer) {
          clearTimeout(resumeTimer);
          resumeTimer = null;
        }
        root.classList.add("is-paused");
      };

      const scheduleResume = () => {
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
          root.classList.remove("is-paused");
          resumeTimer = null;
        }, RESUME_DELAY);
      };

      root.addEventListener("mouseenter", pause, { signal });
      root.addEventListener("mouseleave", scheduleResume, { signal });
      root.addEventListener("focusin", pause, { signal });
      root.addEventListener(
        "focusout",
        (e) => {
          if (!root.contains(e.relatedTarget)) scheduleResume();
        },
        { signal }
      );
    };

    requestAnimationFrame(() => requestAnimationFrame(applyMode));

    if (!root._resizeBound) {
      root._resizeBound = () => {
        setupCarousel(root);
      };
      window.addEventListener("resize", root._resizeBound);
    }
  }

  window.LuaCarousel = {
    initAll(scope = document) {
      scope.querySelectorAll("[data-carousel]").forEach(setupCarousel);
    },
  };
})();
