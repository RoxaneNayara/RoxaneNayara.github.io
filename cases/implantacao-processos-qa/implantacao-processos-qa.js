(() => {
  const evolutionData = [
    {
      year: "2023",
      title: "Implantação e alinhamento",
      description:
        "A área ainda estava em estruturação e exigia encontros frequentes para compreender fluxos, definir práticas e integrar QA aos times.",
      items: [
        {
          label: "Realizado",
          text: "Compartilhamento da cultura de Qualidade."
        },
        {
          label: "Realizado",
          text: "Pair testing em demandas mais complexas."
        },
        {
          label: "Em implantação",
          text: "Participação de QA desde as etapas iniciais."
        },
        {
          label: "Em implantação",
          text: "Documentação de testes e processos."
        },
        {
          label: "Direcionamento",
          text: "Técnicas de teste, automação, TMMi e Definition of Done."
        }
      ]
    },
    {
      year: "2024",
      title: "Formalização e expansão",
      description:
        "As práticas passaram a ser documentadas, atualizadas e incorporadas a diferentes contextos de trabalho.",
      items: [
        {
          label: "Formalizado",
          text: "Planejamento de testes."
        },
        {
          label: "Expandido",
          text: "Atuação em refinamento, Sprint e pair testing."
        },
        {
          label: "Padronizado",
          text: "Registros, evidências e rastreabilidade."
        },
        {
          label: "Colaborativo",
          text: "Revisões e atualizações feitas por diferentes integrantes."
        }
      ]
    },
    {
      year: "2025",
      title: "Padronização e estabilização",
      description:
        "Os processos já faziam parte da rotina e as reuniões específicas de implantação começaram a se tornar menos frequentes.",
      items: [
        {
          label: "Consolidado",
          text: "QA presente nos principais pontos do ciclo."
        },
        {
          label: "Padronizado",
          text: "Procedimentos e responsabilidades."
        },
        {
          label: "Sustentado",
          text: "Atualização colaborativa da documentação."
        },
        {
          label: "Evolução",
          text: "Acompanhamento por resultados e novas prioridades."
        }
      ]
    },
    {
      year: "2026",
      title: "Operação mensurada e autônoma",
      description:
        "A maturidade passou a ser acompanhada por indicadores e o time já conseguia sustentar e ampliar o trabalho implantado.",
      items: [
        {
          label: "Indicadores",
          text: "Cobertura, capacidade, execução e impedimentos."
        },
        {
          label: "Qualidade",
          text: "Severidade, reincidência, tempo de correção e causas."
        },
        {
          label: "Autonomia",
          text: "Time conduzindo práticas e atualizando processos."
        },
        {
          label: "Melhoria contínua",
          text: "Dados utilizados para identificar fragilidades e orientar ações."
        }
      ]
    }
  ];

  const tabsElement =
    document.querySelector("#evolution-tabs");

  const titleElement =
    document.querySelector("#evolution-title");

  const descriptionElement =
    document.querySelector("#evolution-description");

  const itemsElement =
    document.querySelector("#evolution-items");

  if (
    !tabsElement ||
    !titleElement ||
    !descriptionElement ||
    !itemsElement
  ) {
    return;
  }

  let selectedIndex = 0;

  const controlsElement =
    document.createElement("div");

  controlsElement.className =
    "evolution-controls";

  controlsElement.setAttribute(
    "aria-label",
    "Navegação entre períodos"
  );

  itemsElement.insertAdjacentElement(
    "afterend",
    controlsElement
  );

  function renderTabs() {
    tabsElement.innerHTML = evolutionData
      .map(
        (item, index) => `
          <button
            class="evolution-tab${
              index === selectedIndex
                ? " is-selected"
                : ""
            }"
            type="button"
            role="tab"
            aria-selected="${
              index === selectedIndex
            }"
            data-evolution-index="${index}"
          >
            ${item.year}
          </button>
        `
      )
      .join("");
  }

  function renderPanel() {
    const item = evolutionData[selectedIndex];

    titleElement.textContent = item.title;
    descriptionElement.textContent =
      item.description;

    itemsElement.innerHTML = item.items
      .map(
        (entry) => `
          <article class="evolution-item">
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
      selectedIndex === evolutionData.length - 1;

    controlsElement.innerHTML = `
      <button
        class="evolution-control-button"
        type="button"
        data-evolution-direction="previous"
        ${isFirst ? "disabled" : ""}
      >
        ← Anterior
      </button>

      <span class="evolution-control-status">
        ${evolutionData[selectedIndex].year}
        ·
        ${selectedIndex + 1} de
        ${evolutionData.length}
      </span>

      <button
        class="evolution-control-button"
        type="button"
        data-evolution-direction="next"
        ${isLast ? "disabled" : ""}
      >
        Próximo →
      </button>
    `;
  }

  function renderEvolution() {
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
        .closest(".evolution-panel")
        ?.querySelector(".evolution-label");

    if (!panelElement) {
      return;
    }

    const header =
      document.querySelector(".header");

    const caseNavigation =
      document.querySelector(
        ".case-navigation"
      );

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

  function changePeriod(
    newIndex,
    shouldScroll
  ) {
    if (
      newIndex < 0 ||
      newIndex >= evolutionData.length
    ) {
      return;
    }

    selectedIndex = newIndex;
    renderEvolution();

    if (shouldScroll) {
      scrollToPanel();
    }
  }

  tabsElement.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-evolution-index]"
      );

      if (!button) {
        return;
      }

      changePeriod(
        Number(button.dataset.evolutionIndex),
        false
      );
    }
  );

  controlsElement.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-evolution-direction]"
      );

      if (!button || button.disabled) {
        return;
      }

      const direction =
        button.dataset.evolutionDirection;

      const newIndex =
        direction === "next"
          ? selectedIndex + 1
          : selectedIndex - 1;

      changePeriod(newIndex, true);
    }
  );

  renderEvolution();
})();
