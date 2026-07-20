"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const navigation =
    document.querySelector(".case-navigation");

  const links =
    document.querySelectorAll(
      ".case-navigation a[href^='#']"
    );

  if (!navigation || links.length === 0) {
    return;
  }

  const sections = Array.from(links)
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

  function activateLink(sectionId) {
    links.forEach((link) => {
      const active =
        link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("is-active", active);

      if (active) {
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

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      target.scrollIntoView({
        behavior: prefersReducedMotion()
          ? "auto"
          : "smooth",
        block: "start"
      });

      history.replaceState(null, "", targetId);
    });
  });

  function updateActiveSection() {
    const offset =
      navigation.offsetTop +
      navigation.offsetHeight +
      36;

    const scrollPosition =
      window.scrollY + offset;

    let currentSection =
      sections[0]?.id ?? "inicio";

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSection = section.id;
      }
    });

    activateLink(currentSection);
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

  updateActiveSection();
});
