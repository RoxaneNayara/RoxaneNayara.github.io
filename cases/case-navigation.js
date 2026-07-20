"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const header =
    document.querySelector(".header");

  const caseNavigation =
    document.querySelector(".case-navigation");

  const links = Array.from(
    document.querySelectorAll(
      ".case-navigation a[href^='#']"
    )
  );

  if (!caseNavigation || links.length === 0) {
    return;
  }

  const sections = links
    .map((link) => {
      const targetId = link.getAttribute("href");

      return document.querySelector(targetId);
    })
    .filter(Boolean);

  function prefersReducedMotion() {
    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }

  function getFixedOffset() {
    const headerHeight =
      header?.offsetHeight ?? 0;

    const navigationHeight =
      caseNavigation.offsetHeight;

    return headerHeight + navigationHeight + 16;
  }

  function activateLink(sectionId) {
    links.forEach((link) => {
      const isActive =
        link.getAttribute("href") ===
        `#${sectionId}`;

      link.classList.toggle(
        "is-active",
        isActive
      );

      link.setAttribute(
        "aria-current",
        isActive ? "location" : "false"
      );

      if (isActive) {
        link.scrollIntoView({
          behavior: prefersReducedMotion()
            ? "auto"
            : "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    });
  }

  function scrollToSection(target) {
    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      getFixedOffset();

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: prefersReducedMotion()
        ? "auto"
        : "smooth"
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      scrollToSection(target);
      activateLink(target.id);

      history.replaceState(
        null,
        "",
        targetId
      );
    });
  });

  function updateActiveSection() {
    const triggerPosition =
      getFixedOffset() + 40;

    let currentSectionId =
      sections[0]?.id ?? "inicio";

    sections.forEach((section) => {
      const sectionTop =
        section.getBoundingClientRect().top;

      if (sectionTop <= triggerPosition) {
        currentSectionId = section.id;
      }
    });

    const nearPageBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10;

    if (nearPageBottom) {
      currentSectionId =
        sections.at(-1)?.id ??
        currentSectionId;
    }

    activateLink(currentSectionId);
  }

  window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveSection
  );

  window.addEventListener("pageshow", () => {
    const hash = window.location.hash;

    if (hash) {
      const target =
        document.querySelector(hash);

      if (target) {
        window.requestAnimationFrame(() => {
          scrollToSection(target);
          activateLink(target.id);
        });

        return;
      }
    }

    updateActiveSection();
  });

  updateActiveSection();
});
