"use strict";

const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector("span");

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const shouldUseDarkTheme =
  savedTheme === "dark" ||
  (savedTheme === null && prefersDarkTheme);

if (shouldUseDarkTheme) {
  document.body.classList.add("dark-theme");
}

function updateThemeButton() {
  const darkThemeIsActive =
    document.body.classList.contains("dark-theme");

  themeIcon.textContent = darkThemeIsActive ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    darkThemeIsActive
      ? "Ativar tema claro"
      : "Ativar tema escuro"
  );

  themeToggle.setAttribute(
    "aria-pressed",
    String(darkThemeIsActive)
  );
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const selectedTheme =
    document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";

  localStorage.setItem("portfolio-theme", selectedTheme);

  updateThemeButton();
});

updateThemeButton();
