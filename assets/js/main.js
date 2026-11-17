/* Bildungsspuren: navigation and restrained scroll reveals */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isGerman = (document.documentElement.lang || "de").toLowerCase().startsWith("de");
  const menuOpenLabel = isGerman ? "Menü öffnen" : "Abrir menú";
  const menuCloseLabel = isGerman ? "Menü schließen" : "Cerrar menú";
  const menuOpenText = isGerman ? "Menü" : "Menú";
  const menuCloseText = isGerman ? "Schließen" : "Cerrar";

  document.querySelectorAll(".menu-toggle").forEach((button) => {
    const panel = button.closest(".header-right");
    const nav = panel?.querySelector("nav");
    if (!panel || !nav) return;

    button.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? menuCloseLabel : menuOpenLabel);
      button.textContent = isOpen ? menuCloseText : menuOpenText;
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", menuOpenLabel);
        button.textContent = menuOpenText;
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        panel.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", menuOpenLabel);
        button.textContent = menuOpenText;
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
