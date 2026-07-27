"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const navigation =
    document.querySelector(".case-navigation");
  const links = navigation
    ? Array.from(
        navigation.querySelectorAll('a[href^="#"]')
      )
    : [];

  const folderToCase = {
    "as-is-maturidade-qa": "case-01",
    "implantacao-processos-qa": "case-02",
    "azure-devops-rastreabilidade": "case-03",
    "criterios-qualidade-fluxo": "case-04",
    "matriz-raci-governanca": "case-05",
    "tmmi-nivel-2": "case-06",
    "poc-playwright-api": "case-07",
    "onboarding-qa-ti": "case-08",
    "cultura-qualidade-conhecimento": "case-09",
    "processo-seletivo-qa": "case-10",
    "kanban-operacional": "case-11",
    "agentes-ia-qualidade": "case-12"
  };

  const currentFolder =
    window.location.pathname
      .split("/")
      .filter(Boolean)
      .at(-2);

  const returnTarget =
    folderToCase[currentFolder] ?? "cases";

  document
    .querySelectorAll(
      'a[href="../../#cases"], ' +
      'a[href="../../index.html#cases"], ' +
      'a[href="../../#inicio"]'
    )
    .forEach((link) => {
      if (link.matches('a[href="../../#inicio"]')) {
        return;
      }

      link.setAttribute(
        "href",
        `../../index.html#${returnTarget}`
      );
    });

  if (!navigation || links.length === 0) return;

  function getOffset() {
    const header = document.querySelector(".header");
    return (
      (header ? header.offsetHeight : 76) +
      navigation.offsetHeight +
      14
    );
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (!target) return;

      event.preventDefault();

      const visibleTarget =
        target.querySelector(
          ".case-section-heading, .case-hero-grid, .case-breadcrumb"
        ) ?? target;

      const top =
        visibleTarget.getBoundingClientRect().top +
        window.scrollY -
        getOffset();

      window.scrollTo({
        top,
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth"
      });

      history.replaceState(
        null,
        "",
        `#${target.id}`
      );
    });
  });

  const sections = links
    .map((link) =>
      document.querySelector(link.getAttribute("href"))
    )
    .filter(Boolean);

  function updateActiveLink() {
    const position =
      window.scrollY + getOffset() + 24;

    let activeId = sections[0]?.id;

    sections.forEach((section) => {
      if (position >= section.offsetTop) {
        activeId = section.id;
      }
    });

    links.forEach((link) => {
      const active =
        link.getAttribute("href") === `#${activeId}`;

      link.classList.toggle("is-active", active);

      if (active) {
        link.setAttribute("aria-current", "page");

        const navigationRect =
          navigation.getBoundingClientRect();
        const linkRect =
          link.getBoundingClientRect();

        const isPartiallyHidden =
          linkRect.left < navigationRect.left + 12 ||
          linkRect.right > navigationRect.right - 12;

        if (isPartiallyHidden) {
          link.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
          });
        }
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, {
    passive: true
  });
  window.addEventListener("resize", updateActiveLink);
  updateActiveLink();
});
