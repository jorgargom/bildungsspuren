/* Bildungsspuren: navigation and restrained scroll reveals */
(() => {

  // Only the language-neutral entry URL is redirected. Explicit language URLs stay untouched.
  const languageChoices = document.querySelectorAll("[data-language-choice]");
  languageChoices.forEach((link) => {
    link.addEventListener("click", () => {
      try { localStorage.setItem("bildungsspuren-language", link.dataset.languageChoice); } catch (_) {}
    });
  });

  const isEntryPage = window.location.pathname === "/" || window.location.pathname === "/index.html";
  if (isEntryPage) {
    let savedLanguage = null;
    try { savedLanguage = localStorage.getItem("bildungsspuren-language"); } catch (_) {}
    const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language || "de"];
    const normalized = browserLanguages.map((language) => language.toLowerCase());
    const detectedLanguage = normalized.find((language) => ["de", "es", "en"].some((code) => language.startsWith(code)));
    const browserPreference = detectedLanguage ? detectedLanguage.slice(0, 2) : "de";
    const preferredLanguage = ["es", "de", "en"].includes(savedLanguage) ? savedLanguage : browserPreference;
    if (preferredLanguage === "es") { window.location.replace("/es/"); return; }
    if (preferredLanguage === "en") { window.location.replace("/en/"); return; }
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pageLanguage = (document.documentElement.lang || "de").toLowerCase();
  const isGerman = pageLanguage.startsWith("de");
  const isEnglish = pageLanguage.startsWith("en");
  const menuOpenLabel = isGerman ? "Menü öffnen" : isEnglish ? "Open menu" : "Abrir menú";
  const menuCloseLabel = isGerman ? "Menü schließen" : isEnglish ? "Close menu" : "Cerrar menú";
  document.querySelectorAll(".menu-toggle").forEach((button) => {
    const panel = button.closest(".header-right");
    const nav = panel?.querySelector("nav");
    const menuLabel = button.querySelector(".sr-only");
    if (!panel || !nav) return;

    button.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? menuCloseLabel : menuOpenLabel);
      if (menuLabel) menuLabel.textContent = isOpen ? menuCloseLabel : menuOpenLabel;
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", menuOpenLabel);
        if (menuLabel) menuLabel.textContent = menuOpenLabel;
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        panel.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", menuOpenLabel);
        if (menuLabel) menuLabel.textContent = menuOpenLabel;
        button.focus();
      }
    });
  });

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const revealItems = document.querySelectorAll(
    ".hero, main > .section, .topics .topic, .article, .empty, .project, .contact"
  );
  if (!revealItems.length) return;

  document.body.classList.add("has-motion");
  revealItems.forEach((item, index) => {
    item.dataset.reveal = "";
    if (item.classList.contains("topic")) {
      item.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    }
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

  revealItems.forEach((item) => observer.observe(item));
})();
