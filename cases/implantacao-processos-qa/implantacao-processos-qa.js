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

  const tabsElement = document.querySelector("#evolution-tabs");
  const titleElement = document.querySelector("#evolution-title");
  const descriptionElement =
    document.querySelector("#evolution-description");
  const itemsElement = document.querySelector("#evolution-items");

  if (
    !tabsElement ||
    !titleElement ||
    !descriptionElement ||
    !itemsElement
  ) {
    return;
  }

  let selectedIndex = 0;

  function renderTabs() {
    tabsElement.innerHTML = evolutionData
      .map(
        (item, index) => `
          <button
            class="evolution-tab${index === selectedIndex ? " is-selected" : ""}"
            type="button"
            role="tab"
            aria-selected="${index === selectedIndex}"
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
    descriptionElement.textContent = item.description;

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

  tabsElement.addEventListener("click", (event) => {
    const button = event.target.closest("[data-evolution-index]");

    if (!button) {
      return;
    }

    selectedIndex = Number(button.dataset.evolutionIndex);
    renderTabs();
    renderPanel();
  });

  renderTabs();
  renderPanel();
})();
