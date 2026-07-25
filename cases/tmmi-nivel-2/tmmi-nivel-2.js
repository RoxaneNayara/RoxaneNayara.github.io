(() => {
  const tmmiData = [
    {
      code: "PA 2.1",
      label: "Política e Estratégia",
      title: "Política e Estratégia de Teste",
      description:
        "Estruturação das diretrizes, objetivos e indicadores que orientam o processo de testes.",
      evolution:
        "A Política de Testes foi criada após o diagnóstico inicial. A Estratégia de Teste permaneceu em estruturação, enquanto os indicadores de desempenho já existentes foram mantidos.",
      goals: [
        {
          code: "SG1",
          title: "Estabelecer uma Política de Teste",
          initial: "Lacuna identificada",
          current: "Realizado"
        },
        {
          code: "SG2",
          title: "Estabelecer uma Estratégia de Teste",
          initial: "Lacuna identificada",
          current: "Em andamento"
        },
        {
          code: "SG3",
          title: "Estabelecer indicadores de desempenho de teste",
          initial: "Atendido",
          current: "Realizado"
        }
      ]
    },
    {
      code: "PA 2.2",
      label: "Planejamento de Testes",
      title: "Planejamento de Testes",
      description:
        "Definição da abordagem, estimativas, riscos, plano de teste e compromisso dos participantes.",
      evolution:
        "O plano de teste foi formalizado após o levantamento inicial. A abordagem, as estimativas e o compromisso com o plano foram mantidos. A avaliação de risco do produto permaneceu em estruturação.",
      goals: [
        {
          code: "SG1",
          title: "Executar avaliação de risco do produto",
          initial: "Lacuna identificada",
          current: "Em andamento"
        },
        {
          code: "SG2",
          title: "Estabelecer uma abordagem de teste",
          initial: "Atendido",
          current: "Realizado"
        },
        {
          code: "SG3",
          title: "Estabelecer estimativas de teste",
          initial: "Atendido",
          current: "Realizado"
        },
        {
          code: "SG4",
          title: "Desenvolver um plano de teste",
          initial: "Lacuna identificada",
          current: "Realizado"
        },
        {
          code: "SG5",
          title: "Obter compromisso com o plano de teste",
          initial: "Atendido",
          current: "Realizado"
        }
      ]
    },
    {
      code: "PA 2.3",
      label: "Monitoramento e Controle",
      title: "Monitoramento e Controle de Teste",
      description:
        "Acompanhamento do progresso, da qualidade do produto e das ações corretivas relacionadas ao processo de testes.",
      evolution:
        "O monitoramento do progresso dos testes em relação ao plano passou a ser realizado. O acompanhamento da qualidade do produto e o gerenciamento das ações corretivas permaneceram em evolução.",
      goals: [
        {
          code: "SG1",
          title: "Monitorar o progresso do teste em relação ao plano",
          initial: "Lacuna identificada",
          current: "Realizado"
        },
        {
          code: "SG2",
          title:
            "Monitorar a qualidade do produto em relação ao plano e às expectativas",
          initial: "Lacuna identificada",
          current: "Em andamento"
        },
        {
          code: "SG3",
          title: "Gerenciar as ações corretivas para encerramento",
          initial: "Atendido",
          current: "Em andamento"
        }
      ]
    },
    {
      code: "PA 2.4",
      label: "Projeto e Execução",
      title: "Projeto e Execução de Testes",
      description:
        "Análise, modelagem, implementação, execução e tratamento dos incidentes de teste.",
      evolution:
        "A área passou a apresentar todos os objetivos específicos como realizados, incluindo análise e modelagem, implementação, execução e tratamento dos incidentes até o encerramento.",
      goals: [
        {
          code: "SG1",
          title:
            "Realizar análise e modelagem do teste usando técnicas de projeto de teste",
          initial: "Lacuna identificada",
          current: "Realizado"
        },
        {
          code: "SG2",
          title: "Implementar o teste",
          initial: "Atendido",
          current: "Realizado"
        },
        {
          code: "SG3",
          title: "Executar os testes",
          initial: "Atendido",
          current: "Realizado"
        },
        {
          code: "SG4",
          title: "Gerenciar os incidentes de teste para o encerramento",
          initial: "Atendido",
          current: "Realizado"
        }
      ]
    },
    {
      code: "PA 2.5",
      label: "Ambiente de Teste",
      title: "Ambiente de Teste",
      description:
        "Definição, implementação, disponibilidade e controle dos ambientes e insumos necessários para os testes.",
      evolution:
        "Os requisitos, a implementação e o controle dos ambientes de teste permaneceram em andamento, com evolução ainda não concluída no período analisado.",
      goals: [
        {
          code: "SG1",
          title: "Desenvolver requisitos do ambiente de teste",
          initial: "Atendido",
          current: "Em andamento"
        },
        {
          code: "SG2",
          title: "Executar a implementação do ambiente de teste",
          initial: "Atendido",
          current: "Em andamento"
        },
        {
          code: "SG3",
          title: "Gerenciar e controlar ambientes de teste",
          initial: "Lacuna identificada",
          current: "Em andamento"
        }
      ]
    }
  ];

  const areasElement = document.querySelector("#tmmi-areas");
  const codeElement = document.querySelector("#tmmi-pa-code");
  const titleElement = document.querySelector("#tmmi-pa-title");
  const descriptionElement = document.querySelector("#tmmi-pa-description");
  const goalsElement = document.querySelector("#tmmi-goals");
  const goalsCountElement = document.querySelector("#tmmi-goals-count");
  const completedCountElement = document.querySelector("#tmmi-completed-count");
  const progressCountElement = document.querySelector("#tmmi-progress-count");
  const evolutionElement = document.querySelector("#tmmi-evolution-text");

  if (
    !areasElement ||
    !codeElement ||
    !titleElement ||
    !descriptionElement ||
    !goalsElement ||
    !goalsCountElement ||
    !completedCountElement ||
    !progressCountElement ||
    !evolutionElement
  ) {
    return;
  }

  let selectedAreaIndex = 0;

  function statusClass(status) {
    return status
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  }

  function renderAreas() {
    areasElement.innerHTML = tmmiData
      .map(
        (area, index) => `
          <button
            class="tmmi-area-button${index === selectedAreaIndex ? " is-selected" : ""}"
            type="button"
            role="tab"
            aria-selected="${index === selectedAreaIndex}"
            data-area-index="${index}"
          >
            <span>${area.code}</span>
            ${area.label}
          </button>
        `
      )
      .join("");
  }

  function renderArea() {
    const area = tmmiData[selectedAreaIndex];
    const completed = area.goals.filter(
      (goal) => goal.current === "Realizado"
    ).length;
    const inProgress = area.goals.filter(
      (goal) => goal.current === "Em andamento"
    ).length;

    codeElement.textContent = area.code;
    titleElement.textContent = area.title;
    descriptionElement.textContent = area.description;
    goalsCountElement.textContent = `${area.goals.length} objetivos específicos`;
    completedCountElement.textContent = `${completed} realizados`;
    progressCountElement.textContent = `${inProgress} em andamento`;
    evolutionElement.textContent = area.evolution;

    goalsElement.innerHTML = area.goals
      .map(
        (goal) => `
          <article class="tmmi-goal-card">
            <header class="tmmi-goal-heading">
              <span>${goal.code}</span>
              <h4>${goal.title}</h4>
            </header>

            <div class="tmmi-status-grid">
              <section class="tmmi-status-panel">
                <p>Diagnóstico inicial</p>
                <strong class="tmmi-status tmmi-status-${statusClass(goal.initial)}">
                  ${goal.initial}
                </strong>
              </section>

              <section class="tmmi-status-panel">
                <p>Estado atual</p>
                <strong class="tmmi-status tmmi-status-${statusClass(goal.current)}">
                  ${goal.current}
                </strong>
              </section>
            </div>
          </article>
        `
      )
      .join("");
  }

  function render() {
    renderAreas();
    renderArea();
  }

  areasElement.addEventListener("click", (event) => {
    const button = event.target.closest("[data-area-index]");

    if (!button) {
      return;
    }

    selectedAreaIndex = Number(button.dataset.areaIndex);
    render();
  });

  render();
})();
