"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");

  const caseNavigation =
    document.querySelector(".case-navigation");

  const navigationInner =
    document.querySelector(".case-navigation-inner");

  const links = Array.from(
    document.querySelectorAll(
      ".case-navigation a[href^='#']",
    ),
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
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }

  function getFixedOffset() {
    const headerHeight =
      header?.offsetHeight ?? 0;

    const navigationHeight =
      caseNavigation.offsetHeight;

    return headerHeight + navigationHeight + 16;
  }

  function centerActiveLink(link) {
    if (!navigationInner) {
      return;
    }

    const containerWidth =
      navigationInner.clientWidth;

    const linkCenter =
      link.offsetLeft + link.offsetWidth / 2;

    const targetScroll =
      linkCenter - containerWidth / 2;

    navigationInner.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: prefersReducedMotion()
        ? "auto"
        : "smooth",
    });
  }

  function activateLink(sectionId) {
    links.forEach((link) => {
      const isActive =
        link.getAttribute("href") ===
        `#${sectionId}`;

      link.classList.toggle(
        "is-active",
        isActive,
      );

      if (isActive) {
        link.setAttribute(
          "aria-current",
          "location",
        );

        centerActiveLink(link);
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function getSectionReference(section) {
    if (section.id === "inicio") {
      return section;
    }

    return (
      section.querySelector(
        ".case-section-heading, .case-hero-grid",
      ) ?? section
    );
  }

  function scrollToSection(target) {
    const sectionTarget =
      getSectionReference(target);

    const targetPosition =
      sectionTarget.getBoundingClientRect().top +
      window.scrollY -
      getFixedOffset() -
      12;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: prefersReducedMotion()
        ? "auto"
        : "smooth",
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

      activateLink(target.id);
      scrollToSection(target);

      history.replaceState(
        null,
        "",
        targetId,
      );
    });
  });

  let updateScheduled = false;

  function updateActiveSection() {
    const triggerPosition =
      getFixedOffset() + 40;

    let currentSectionId =
      sections[0]?.id ?? "inicio";

    sections.forEach((section) => {
      const reference =
        getSectionReference(section);

      const sectionTop =
        reference.getBoundingClientRect().top;

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

  function requestActiveSectionUpdate() {
    if (updateScheduled) {
      return;
    }

    updateScheduled = true;

    window.requestAnimationFrame(() => {
      updateActiveSection();
      updateScheduled = false;
    });
  }

  window.addEventListener(
    "scroll",
    requestActiveSectionUpdate,
    { passive: true },
  );

  window.addEventListener(
    "resize",
    requestActiveSectionUpdate,
  );

  window.addEventListener("pageshow", () => {
    const hash = window.location.hash;

    if (hash) {
      const target =
        document.querySelector(hash);

      if (target) {
        window.requestAnimationFrame(() => {
          activateLink(target.id);
          scrollToSection(target);
        });

        return;
      }
    }

    updateActiveSection();
  });

  updateActiveSection();
});
