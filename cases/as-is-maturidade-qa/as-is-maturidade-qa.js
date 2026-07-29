(() => {
  const timelineData = [
    {
      year: "2023",
      title: "Diagnóstico inicial e estruturação",
      description:
        "O AS-IS foi atualizado em diferentes momentos do ano para acompanhar a implantação das primeiras práticas.",
      items: [
        {
          label: "Realizado",
          text: "Extração de informações pelo Azure."
        },
        {
          label: "Realizado",
          text: "Definição de reunião de planejamento de testes."
        },
        {
          label: "Realizado",
          text: "Pair testing nos backlogs."
        },
        {
          label: "Realizado",
          text: "Ampliação das técnicas de teste."
        },
        {
          label: "Realizado",
          text: "Definição de ambientes para diferentes validações."
        },
        {
          label: "Em evolução",
          text: "Automação de API e gestão de riscos."
        }
      ]
    },
    {
      year: "2024",
      title: "Continuidade e novas frentes",
      description:
        "O diagnóstico permaneceu ativo e passou a registrar novas prioridades técnicas e de gestão.",
      items: [
        {
          label: "Em andamento",
          text: "Estruturação da gestão de riscos."
        },
        {
          label: "Em andamento",
          text: "Automação funcional de API."
        },
        {
          label: "Acompanhamento",
          text: "Atualização do cenário entre períodos do ano."
        }
      ]
    },
    {
      year: "2025",
      title: "Ampliação da maturidade técnica",
      description:
        "O acompanhamento registrou iniciativas relacionadas a riscos, automação e revisão técnica.",
      items: [
        {
          label: "Em andamento",
          text: "Gestão de riscos aplicada aos testes."
        },
        {
          label: "Em andamento",
          text: "Automação funcional de API."
        },
        {
          label: "Em andamento",
          text: "Revisão de código de testes automatizados."
        }
      ]
    },
    {
      year: "2026",
      title: "Continuidade da melhoria",
      description:
        "O diagnóstico continuou sendo utilizado para diferenciar o cenário atual do estado futuro desejado.",
      items: [
        {
          label: "Em andamento",
          text: "Gestão de riscos."
        },
        {
          label: "Em andamento",
          text: "Automação funcional Web."
        },
        {
          label: "Direcionamento",
          text: "TO-BE mantido como referência de evolução."
        }
      ]
    }
  ];

  const tabsElement = document.querySelector("#timeline-tabs");
  const titleElement = document.querySelector("#timeline-title");
  const descriptionElement =
    document.querySelector("#timeline-description");
  const itemsElement = document.querySelector("#timeline-items");

  if (
    !tabsElement ||
    !titleElement ||
    !descriptionElement ||
    !itemsElement
  ) {
    return;
  }

  let selectedIndex = 0;

  const controlsElement = document.createElement("div");
  controlsElement.className = "timeline-controls";
  controlsElement.setAttribute(
    "aria-label",
    "Navegação entre períodos"
  );

  itemsElement.insertAdjacentElement(
    "afterend",
    controlsElement
  );

  function renderTabs() {
    tabsElement.innerHTML = timelineData
      .map(
        (item, index) => `
          <button
            class="timeline-tab${
              index === selectedIndex
                ? " is-selected"
                : ""
            }"
            type="button"
            role="tab"
            aria-selected="${
              index === selectedIndex
            }"
            data-timeline-index="${index}"
          >
            ${item.year}
          </button>
        `
      )
      .join("");
  }

  function renderPanel() {
    const item = timelineData[selectedIndex];

    titleElement.textContent = item.title;
    descriptionElement.textContent =
      item.description;

    itemsElement.innerHTML = item.items
      .map(
        (entry) => `
          <article class="timeline-item">
            <strong>${entry.label}</strong>
            <span>${entry.text}</span>
          </article>
        `
      )
      .join("");
  }

  function renderControls() {
    const isFirst = selectedIndex === 0;
    const isLast =
      selectedIndex === timelineData.length - 1;

    controlsElement.innerHTML = `
      <button
        class="timeline-control-button"
        type="button"
        data-timeline-direction="previous"
        ${isFirst ? "disabled" : ""}
      >
        ← Anterior
      </button>

      <span class="timeline-control-status">
        ${timelineData[selectedIndex].year}
        ·
        ${selectedIndex + 1} de
        ${timelineData.length}
      </span>

      <button
        class="timeline-control-button"
        type="button"
        data-timeline-direction="next"
        ${isLast ? "disabled" : ""}
      >
        Próximo →
      </button>
    `;
  }

  function renderTimeline() {
    renderTabs();
    renderPanel();
    renderControls();
  }

function scrollToPanel() {
  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

const panelElement =
  titleElement
    .closest(".timeline-panel")
    ?.querySelector(".timeline-label");

  if (!panelElement) {
    return;
  }

  const header =
    document.querySelector(".header");

  const caseNavigation =
    document.querySelector(".case-navigation");

  const offset =
    (header?.offsetHeight ?? 76) +
    (caseNavigation?.offsetHeight ?? 0) +
    24;

  const top =
    panelElement.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion
      ? "auto"
      : "smooth"
  });
}

  function changePeriod(newIndex, shouldScroll) {
    if (
      newIndex < 0 ||
      newIndex >= timelineData.length
    ) {
      return;
    }

    selectedIndex = newIndex;
    renderTimeline();

    if (shouldScroll) {
      scrollToPanel();
    }
  }

  tabsElement.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-timeline-index]"
      );

      if (!button) {
        return;
      }

      changePeriod(
        Number(button.dataset.timelineIndex),
        false
      );
    }
  );

  controlsElement.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-timeline-direction]"
      );

      if (!button || button.disabled) {
        return;
      }

      const direction =
        button.dataset.timelineDirection;

      const newIndex =
        direction === "next"
          ? selectedIndex + 1
          : selectedIndex - 1;

      changePeriod(newIndex, true);
    }
  );

  renderTimeline();
})();
