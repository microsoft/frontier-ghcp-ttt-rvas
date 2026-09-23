(() => {
  "use strict";

  function setupPresentation() {
    const dialog = document.getElementById("pres-modal");
    const launch = document.querySelector("[data-presentation-open]");
    if (!dialog || !launch || typeof dialog.showModal !== "function") return;

    const frame = dialog.querySelector("iframe");
    let returnFocus = launch;
    launch.hidden = false;
    launch.addEventListener("click", () => {
      returnFocus = document.activeElement;
      if (!frame.hasAttribute("src")) frame.src = frame.dataset.src;
      dialog.showModal();
    });
    dialog.querySelector("[data-presentation-close]").addEventListener("click", () => {
      dialog.close();
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      dialog.close();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) {
        dialog.close();
      }
    });
    dialog.addEventListener("close", () => {
      // Unload slides so embedded playback does not continue after closing.
      frame.removeAttribute("src");
      if (returnFocus && returnFocus.isConnected) returnFocus.focus();
    });
    frame.addEventListener("load", () => {
      // Slides are same-origin; handle Escape even when the iframe owns focus.
      if (!frame.hasAttribute("src")) return;
      const frameDocument = frame.contentDocument;
      if (frameDocument) {
        frameDocument.addEventListener("keydown", (event) => {
          if (event.key === "Escape" && dialog.open) {
            event.preventDefault();
            dialog.close();
          }
        }, { capture: true });
      }
    });
  }

  function setupTrainer() {
    const controls = document.querySelector(".trainer-controls");
    if (!controls) return;
    const article = controls.closest("article") || controls.parentElement;
    const sections = Array.from(article.querySelectorAll("h2[id]"));
    const timer = controls.querySelector(".trainer-timer");
    const toggle = controls.querySelector("[data-trainer-timer]");
    const previous = controls.querySelector("[data-trainer-previous]");
    const next = controls.querySelector("[data-trainer-next]");
    const shortcuts = controls.querySelector("[data-trainer-shortcuts]");
    let elapsed = 0;
    let startedAt = null;
    let interval = null;

    function updateTimer() {
      const milliseconds = elapsed + (startedAt === null ? 0 : performance.now() - startedAt);
      const seconds = Math.floor(milliseconds / 1000);
      timer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    }

    function toggleTimer() {
      if (startedAt === null) {
        startedAt = performance.now();
        interval = window.setInterval(updateTimer, 250);
        toggle.textContent = "Pause timer";
      } else {
        elapsed += performance.now() - startedAt;
        startedAt = null;
        window.clearInterval(interval);
        toggle.textContent = "Resume timer";
      }
      updateTimer();
    }

    toggle.addEventListener("click", toggleTimer);
    controls.querySelector("[data-trainer-reset]").addEventListener("click", () => {
      window.clearInterval(interval);
      elapsed = 0;
      startedAt = null;
      toggle.textContent = "Start timer";
      updateTimer();
    });
    controls.querySelector("[data-trainer-print]").addEventListener("click", () => window.print());

    function currentSection() {
      // Include the header and any sticky controls in the reading position.
      const header = document.querySelector(".md-header");
      const top = Math.max(
        header ? header.getBoundingClientRect().bottom : 0,
        controls.getBoundingClientRect().bottom,
        0
      ) + 16;
      const scrollPadding = Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop
      ) || 0;
      let index = -1;
      sections.forEach((section, position) => {
        const scrollMargin = Number.parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0;
        if (section.getBoundingClientRect().top <= Math.max(top, scrollMargin + scrollPadding + 2)) {
          index = position;
        }
      });
      return index;
    }

    function updateNavigation() {
      const index = currentSection();
      previous.disabled = index <= 0;
      next.disabled = index >= sections.length - 1;
    }

    function moveSection(direction) {
      if (!sections.length) return;
      const index = Math.max(0, Math.min(currentSection() + direction, sections.length - 1));
      const section = sections[index];
      const url = new URL(window.location.href);
      url.hash = section.id;
      window.history.replaceState(null, "", url);
      section.tabIndex = -1;
      section.focus({ preventScroll: true });
      section.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start"
      });
      updateNavigation();
    }

    previous.addEventListener("click", () => moveSection(-1));
    next.addEventListener("click", () => moveSection(1));
    document.addEventListener("keydown", (event) => {
      if (!shortcuts.checked || event.defaultPrevented || event.repeat ||
          event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof Element && (target.isContentEditable ||
          target.closest("input, textarea, select, button, a, [role='textbox'], [contenteditable]:not([contenteditable='false'])"))) return;
      if (document.querySelector("dialog[open]")) return;
      const key = event.key.toLowerCase();
      if (!["j", "k", "t"].includes(key)) return;
      event.preventDefault();
      if (key === "t") toggleTimer();
      else moveSection(key === "j" ? 1 : -1);
    });
    let scrollPending = false;
    window.addEventListener("scroll", () => {
      if (scrollPending) return;
      scrollPending = true;
      window.requestAnimationFrame(() => {
        scrollPending = false;
        updateNavigation();
      });
    }, { passive: true });
    window.addEventListener("resize", updateNavigation);
    window.addEventListener("pagehide", () => window.clearInterval(interval));
    window.addEventListener("pageshow", (event) => {
      if (event.persisted && startedAt !== null) {
        updateTimer();
        interval = window.setInterval(updateTimer, 250);
      }
    });
    controls.hidden = false;
    updateNavigation();
  }

  function setupCurriculum() {
    const links = document.querySelectorAll(".ghcp-module-node");
    if (!links.length) return;
    function updateSelection() {
      links.forEach((link) => {
        if (link.hash === window.location.hash) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
    window.addEventListener("hashchange", updateSelection);
    updateSelection();
  }

  function setup() {
    setupPresentation();
    setupTrainer();
    setupCurriculum();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup, { once: true });
  else setup();
})();
