"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector("#kanban-board");

  const previousBoard =
    document.querySelector("#board-anterior");

  const proposedBoard =
    document.querySelector("#board-proposto");

  const viewButtons =
    document.querySelectorAll(".kanban-view-button");

  const status =
    document.querySelector("#kanban-status");

  const policyTitle =
    document.querySelector("#policy-panel-title");

  const policyWip =
    document.querySelector("#policy-wip");

  const policyObjective =
    document.querySelector("#policy-objective");

  const policyEntry =
    document.querySelector("#policy-entry");

  const policyExit =
    document.querySelector("#policy-exit");

  const policyRisk =
    document.querySelector("#policy-risk");

  if (
    !board ||
    !previousBoard ||
    !proposedBoard
  ) {
    return;
  }

  const previousFlow = [
    {
      key: "entrada",
      step: "01",
      title: "Entrada",
      current: 5,
      limit: 30,
      purpose: "Receber novas solicitações.",
      cards: [
        {
          type: "Solicitação",
          title: "Revisar cadastro de dados",
          description: "Demanda registrada."
        },
        {
          type: "Melhoria",
          title: "Ajustar consulta operacional",
          description: "Aguardando triagem."
        }
      ],
      queue: "+3 itens aguardando",
      policy: {
        objective:
          "Receber novas solicitações sem uma qualificação obrigatória padronizada.",
        entry:
          "A solicitação podia ser registrada diretamente no board.",
        exit:
          "O item avançava após uma análise inicial.",
        risk:
          "Acúmulo de demandas incompletas e dificuldade de priorização."
      }
    },
    {
      key: "aprovado",
      step: "02",
      title: "Aprovado",
      current: 7,
      limit: 30,
      purpose: "Manter itens autorizados.",
      cards: [
        {
          type: "Aprovado",
          title: "Atualizar regra de cálculo",
          description: "Aguardando alinhamento."
        }
      ],
      queue: "+6 itens na fila",
      policy: {
        objective:
          "Separar demandas aprovadas das solicitações ainda não avaliadas.",
        entry:
          "A demanda precisava de uma aprovação inicial.",
        exit:
          "O item seguia para alinhamento funcional.",
        risk:
          "A aprovação não garantia que o item estivesse suficientemente refinado."
      }
    },
    {
      key: "alinhamento",
      step: "03",
      title: "Alinhamento Inicial",
      current: 8,
      limit: 30,
      purpose: "Discutir contexto entre áreas.",
      cards: [
        {
          type: "Alinhamento",
          title: "Validar necessidade do processo",
          description: "Discussão entre áreas."
        }
      ],
      queue: "+7 itens em espera",
      policy: {
        objective:
          "Promover alinhamento inicial entre áreas envolvidas.",
        entry:
          "A demanda precisava estar aprovada.",
        exit:
          "O item avançava após o entendimento inicial.",
        risk:
          "Discussões importantes ficavam representadas como uma fila no board."
      }
    },
    {
      key: "detalhamento",
      step: "04",
      title: "Detalhamento Funcional",
      current: 12,
      limit: 30,
      purpose: "Detalhar comportamento esperado.",
      cards: [
        {
          type: "Funcional",
          title: "Detalhar fluxo de permissões",
          description: "Regras em elaboração."
        }
      ],
      queue: "+11 itens acumulados",
      policy: {
        objective:
          "Detalhar regras e comportamento funcional esperado.",
        entry:
          "O contexto inicial precisava estar compreendido.",
        exit:
          "A demanda avançava com descrição funcional elaborada.",
        risk:
          "O refinamento fragmentado criava mais filas e transferências."
      }
    },
    {
      key: "refinamento-tecnico",
      step: "05",
      title: "Refinamento Técnico",
      current: 4,
      limit: 30,
      purpose: "Avaliar solução e dependências.",
      cards: [
        {
          type: "Técnico",
          title: "Mapear dependências da integração",
          description: "Análise técnica em andamento."
        }
      ],
      queue: "+3 itens na fila",
      policy: {
        objective:
          "Avaliar dependências, viabilidade e abordagem técnica.",
        entry:
          "O detalhamento funcional precisava estar disponível.",
        exit:
          "O item seguia após avaliação técnica.",
        risk:
          "A separação do refinamento aumentava o tempo de atravessamento."
      }
    },
    {
      key: "priorizacao",
      step: "06",
      title: "Priorização",
      current: 14,
      limit: 99,
      purpose: "Organizar ordem de execução.",
      cards: [
        {
          type: "Prioridade",
          title: "Classificar melhoria de relatório",
          description: "Aguardando ordenação."
        }
      ],
      queue: "+13 itens aguardando",
      policy: {
        objective:
          "Ordenar demandas para execução.",
        entry:
          "O item precisava ter passado pelos refinamentos.",
        exit:
          "A demanda seguia quando priorizada.",
        risk:
          "O limite elevado permitia grande estoque antes do compromisso."
      }
    },
    {
      key: "bloqueios",
      step: "07",
      title: "Bloqueios",
      current: 3,
      limit: 30,
      purpose: "Separar itens impedidos.",
      cards: [
        {
          type: "Bloqueado",
          title: "Aguardar retorno de dependência",
          description: "Item parado."
        }
      ],
      queue: "+2 itens bloqueados",
      policy: {
        objective:
          "Dar visibilidade aos itens impedidos.",
        entry:
          "O item era movido quando encontrava um impedimento.",
        exit:
          "A demanda retornava ao fluxo após a resolução.",
        risk:
          "Bloqueios tratados como coluna escondiam a etapa real em que surgiram."
      }
    },
    {
      key: "comprometido",
      step: "08",
      title: "Comprometido",
      current: 18,
      limit: 60,
      purpose: "Representar trabalho assumido.",
      cards: [
        {
          type: "Comprometido",
          title: "Implementar validação adicional",
          description: "Trabalho assumido."
        }
      ],
      queue: "+17 itens comprometidos",
      policy: {
        objective:
          "Identificar demandas assumidas pelo time.",
        entry:
          "A demanda precisava estar priorizada.",
        exit:
          "O item avançava após execução e revisão.",
        risk:
          "O volume comprometido podia superar a capacidade real."
      }
    },
    {
      key: "revisado",
      step: "09",
      title: "Revisado",
      current: 6,
      limit: 60,
      purpose: "Registrar revisão técnica.",
      cards: [
        {
          type: "Revisão",
          title: "Revisar alteração de busca",
          description: "Revisão concluída."
        }
      ],
      queue: "+5 itens revisados",
      policy: {
        objective:
          "Registrar que a solução passou por revisão.",
        entry:
          "A implementação precisava estar concluída.",
        exit:
          "O item seguia para preparação de validação.",
        risk:
          "A revisão virava outra fila intermediária."
      }
    },
    {
      key: "pronto-validacao",
      step: "10",
      title: "Pronto para Validação",
      current: 16,
      limit: 60,
      purpose: "Aguardar disponibilidade para validar.",
      cards: [
        {
          type: "Pronto",
          title: "Liberar ajuste para teste",
          description: "Aguardando validação."
        }
      ],
      queue: "+15 itens na fila",
      policy: {
        objective:
          "Separar itens tecnicamente prontos para validação.",
        entry:
          "A solução precisava estar revisada e disponível.",
        exit:
          "O item avançava quando a validação era iniciada.",
        risk:
          "A fila crescia sem evidenciar a capacidade de QA."
      }
    },
    {
      key: "aguardando-validacao",
      step: "11",
      title: "Aguardando Validação",
      current: 24,
      limit: 99,
      purpose: "Concentrar itens pendentes de validação.",
      cards: [
        {
          type: "Validação",
          title: "Validar regra de cadastro",
          description: "Pendente de execução."
        }
      ],
      queue: "+23 itens acumulados",
      policy: {
        objective:
          "Manter itens aguardando validação do negócio ou de QA.",
        entry:
          "O item precisava estar disponível para teste.",
        exit:
          "A demanda avançava após aceite.",
        risk:
          "A fila elevada indicava gargalo e baixa previsibilidade."
      }
    },
    {
      key: "preparado-liberacao",
      step: "12",
      title: "Preparado para Liberação",
      current: 13,
      limit: 99,
      purpose: "Organizar itens prontos para release.",
      cards: [
        {
          type: "Release",
          title: "Preparar pacote de entrega",
          description: "Pronto para janela."
        }
      ],
      queue: "+12 itens preparados",
      policy: {
        objective:
          "Separar itens aprovados e preparados para liberação.",
        entry:
          "A demanda precisava estar validada.",
        exit:
          "O item seguia quando havia janela de release.",
        risk:
          "Itens prontos continuavam acumulados em mais uma fila."
      }
    },
    {
      key: "aguardando-liberacao",
      step: "13",
      title: "Aguardando Liberação",
      current: 15,
      limit: 99,
      purpose: "Aguardar janela de implantação.",
      cards: [
        {
          type: "Deploy",
          title: "Aguardar liberação programada",
          description: "Janela pendente."
        }
      ],
      queue: "+14 itens aguardando",
      policy: {
        objective:
          "Manter itens prontos aguardando implantação.",
        entry:
          "A entrega precisava estar preparada.",
        exit:
          "O item avançava após a liberação.",
        risk:
          "Novo estoque entre validação e conclusão."
      }
    },
    {
      key: "concluido-anterior",
      step: "14",
      title: "Concluído",
      current: null,
      limit: null,
      purpose: "Registrar itens finalizados.",
      cards: [
        {
          type: "Concluído",
          title: "Finalizar melhoria operacional",
          description: "Entrega concluída."
        }
      ],
      queue: "",
      policy: {
        objective:
          "Registrar as entregas concluídas.",
        entry:
          "A implantação precisava ter sido realizada.",
        exit:
          "Não se aplica.",
        risk:
          "O tempo total até a conclusão podia ser elevado pelas filas anteriores."
      }
    }
  ];

  const proposedFlow = [
    {
      key: "triagem",
      step: "01",
      title: "Intake / Triagem",
      current: 2,
      limit: 5,
      purpose: "Capturar e qualificar novas demandas.",
      cards: [
        {
          type: "Melhoria",
          title: "Revisar fluxo de cadastro",
          description: "Impacto e solicitante registrados."
        },
        {
          type: "Solicitação",
          title: "Ajustar relatório operacional",
          description: "Aguardando análise inicial."
        }
      ],
      policy: {
        objective:
          "Capturar, registrar e qualificar novas demandas antes que sejam comprometidas pelo time.",
        entry:
          "A demanda deve possuir descrição mínima, solicitante, impacto e prazo desejado.",
        exit:
          "A demanda segue para refinamento quando possui contexto suficiente.",
        risk:
          "Permitir entrada de demandas incompletas ou sem avaliação de impacto."
      }
    },
    {
      key: "refinamento",
      step: "02",
      title: "Discovery / Refinamento",
      current: 2,
      limit: 5,
      purpose: "Definir regra, risco, dependências e aceite.",
      cards: [
        {
          type: "Integração",
          title: "Mapear dependências da API",
          description: "Critérios de aceite em revisão."
        },
        {
          type: "Risco",
          title: "Revisar regras de permissão",
          description: "Dependência identificada."
        }
      ],
      policy: {
        objective:
          "Compreender a necessidade e validar regras, riscos, dependências e critérios de aceite.",
        entry:
          "A demanda precisa ter sido qualificada na triagem.",
        exit:
          "O item sai com prioridade, critérios e dependências compreendidos.",
        risk:
          "Enviar trabalho incompleto para execução."
      }
    },
    {
      key: "ready",
      step: "03",
      title: "Ready",
      current: 3,
      limit: 6,
      purpose: "Manter uma fila comprometida para puxar trabalho.",
      cards: [
        {
          type: "Evolução",
          title: "Ajustar validação do checkout",
          description: "Pronto para desenvolvimento."
        }
      ],
      policy: {
        objective:
          "Manter uma fila limitada de trabalho realmente pronto.",
        entry:
          "A demanda deve possuir critérios, prioridade e riscos avaliados.",
        exit:
          "O item é puxado quando existe capacidade disponível.",
        risk:
          "Transformar Ready em depósito de demandas."
      }
    },
    {
      key: "desenvolvimento",
      step: "04",
      title: "Em Desenvolvimento",
      current: 3,
      limitLabel: "nº de devs ou devs - 1",
      purpose: "Construir a solução.",
      cards: [
        {
          type: "Desenvolvimento",
          title: "Implementar novo filtro",
          description: "Em construção."
        },
        {
          type: "Correção",
          title: "Corrigir validação duplicada",
          description: "Em construção."
        }
      ],
      policy: {
        objective:
          "Construir a solução priorizando a conclusão do trabalho iniciado.",
        entry:
          "O item deve ser puxado da fila Ready.",
        exit:
          "A implementação precisa estar concluída e disponível para revisão.",
        risk:
          "Iniciar mais trabalho do que o time consegue concluir."
      }
    },
    {
      key: "code-review",
      step: "05",
      title: "Code Review / Build OK",
      current: 2,
      limit: 3,
      purpose: "Revisar tecnicamente e validar o build.",
      cards: [
        {
          type: "Revisão",
          title: "Revisar alteração técnica",
          description: "Build disponível."
        }
      ],
      policy: {
        objective:
          "Realizar revisão técnica e confirmar estabilidade inicial da entrega.",
        entry:
          "A implementação precisa estar concluída.",
        exit:
          "O código deve estar revisado e o build aprovado.",
        risk:
          "Acumular itens aguardando revisão."
      }
    },
    {
      key: "teste",
      step: "06",
      title: "Teste / QA",
      current: 2,
      limitLabel: "nº de QAs ou QAs + 1",
      purpose: "Validar funcionalidade, regressão e evidências.",
      cards: [
        {
          type: "Teste",
          title: "Validar evidências da entrega",
          description: "Execução em andamento."
        }
      ],
      policy: {
        objective:
          "Validar critérios de aceite, riscos, regressão e evidências.",
        entry:
          "O build precisa estar aprovado e disponível.",
        exit:
          "Os critérios aplicáveis devem estar validados.",
        risk:
          "Elevar a fila de testes acima da capacidade de QA."
      }
    },
    {
      key: "ready-homologacao",
      step: "07",
      title: "Ready Homologação",
      current: 2,
      limit: 5,
      purpose: "Preparar o item para aceite do negócio.",
      cards: [
        {
          type: "Pronto",
          title: "Disponibilizar versão para aceite",
          description: "Pronto para homologação."
        }
      ],
      policy: {
        objective:
          "Manter somente itens validados e prontos para aceite do negócio.",
        entry:
          "A validação de QA precisa estar concluída.",
        exit:
          "O negócio inicia a homologação.",
        risk:
          "Acumular entregas aguardando disponibilidade do negócio."
      }
    },
    {
      key: "homologacao",
      step: "08",
      title: "Homologação",
      current: 2,
      limit: 5,
      purpose: "Obter aceite do negócio.",
      cards: [
        {
          type: "Aceite",
          title: "Validar cenário de negócio",
          description: "Homologação em andamento."
        }
      ],
      policy: {
        objective:
          "Obter o aceite do negócio sobre a entrega.",
        entry:
          "A solução precisa estar pronta para homologação.",
        exit:
          "O negócio aprova a entrega ou registra ajustes.",
        risk:
          "Demora no aceite aumentar o tempo de atravessamento."
      }
    },
    {
      key: "ready-deploy",
      step: "09",
      title: "Ready Deploy",
      current: 2,
      limit: 5,
      purpose: "Aguardar janela ou release.",
      cards: [
        {
          type: "Release",
          title: "Preparar liberação da entrega",
          description: "Aguardando janela."
        }
      ],
      policy: {
        objective:
          "Manter itens aprovados e preparados para liberação.",
        entry:
          "A homologação precisa estar concluída.",
        exit:
          "A entrega é liberada na janela definida.",
        risk:
          "Acúmulo de itens prontos aguardando release."
      }
    },
    {
      key: "done",
      step: "10",
      title: "Done",
      current: null,
      limit: null,
      purpose: "Registrar entrega concluída e aceita.",
      cards: [
        {
          type: "Concluído",
          title: "Finalizar melhoria de busca",
          description: "Entregue e aceita."
        }
      ],
      policy: {
        objective:
          "Registrar entregas finalizadas, aceitas e rastreáveis.",
        entry:
          "A implantação e o aceite precisam estar concluídos.",
        exit:
          "Não se aplica.",
        risk:
          "Considerar concluído um item com pendências conhecidas."
      }
    }
  ];

  const urgentLane = `
    <section
      class="kanban-urgent-lane"
      aria-labelledby="urgent-lane-title"
    >
      <div class="kanban-lane-heading">
        <div>
          <span class="kanban-lane-label">
            Classe de serviço
          </span>

          <h4 id="urgent-lane-title">
            Expedite / Urgente
          </h4>
        </div>

        <span class="kanban-wip-badge">
          WIP 1
        </span>
      </div>

      <button
        class="kanban-task-card kanban-task-urgent"
        type="button"
      >
        <span class="kanban-task-type">
          Urgente
        </span>

        <strong>
          Incidente crítico em produção
        </strong>

        <small>
          Entrada condicionada à aprovação e à indicação
          do item que será pausado.
        </small>
      </button>
    </section>
  `;

  function createCard(card) {
    return `
      <button
        class="kanban-task-card"
        type="button"
      >
        <span class="kanban-task-type">
          ${card.type}
        </span>

        <strong>
          ${card.title}
        </strong>

        <small>
          ${card.description}
        </small>
      </button>
    `;
  }

  function createColumn(item, flowType) {
    const wipText = item.limitLabel
      ? item.limitLabel
      : item.current !== null &&
        item.limit !== null
        ? `${item.current} / ${item.limit}`
        : "Saída";

    const warningClass =
      item.current !== null &&
      item.limit !== null &&
      item.current > item.limit
        ? " is-warning"
        : "";

    const queueNote = item.queue
      ? `
        <div class="kanban-queue-note">
          ${item.queue}
        </div>
      `
      : "";

    return `
      <section
        class="kanban-column"
        data-column="${item.key}"
        data-flow="${flowType}"
        tabindex="0"
        role="button"
        aria-pressed="false"
      >
        <div class="kanban-column-heading">
          <div>
            <span class="kanban-column-step">
              ${item.step}
            </span>

            <h4>
              ${item.title}
            </h4>
          </div>

          <span class="kanban-wip-badge${warningClass}">
            ${wipText}
          </span>
        </div>

        <p class="kanban-column-purpose">
          ${item.purpose}
        </p>

        <div class="kanban-card-list">
          ${item.cards.map(createCard).join("")}
          ${queueNote}
        </div>
      </section>
    `;
  }

  function renderFlow(
    container,
    flow,
    flowType,
    summary
  ) {
    container.innerHTML = `
      <div class="kanban-flow-summary">
        ${summary}
      </div>

      ${
        flowType === "proposto"
          ? urgentLane
          : ""
      }

      <div class="kanban-columns">
        ${flow
          .map((item) =>
            createColumn(item, flowType)
          )
          .join("")}
      </div>
    `;

    if (flowType === "anterior") {
      container.classList.add("is-legacy");
    }
  }

  renderFlow(
    previousBoard,
    previousFlow,
    "anterior",
    `
      <strong>Fluxo anterior:</strong>
      14 colunas, refinamentos fragmentados,
      filas intermediárias e limites de WIP
      elevados, com baixa restrição real.
    `
  );

  renderFlow(
    proposedBoard,
    proposedFlow,
    "proposto",
    `
      <strong>Fluxo proposto:</strong>
      10 etapas com propósito claro, limites
      ajustáveis, políticas explícitas e raia
      independente para demandas urgentes.
    `
  );

    const controlsElement =
    document.createElement("div");

  controlsElement.className =
    "kanban-stage-controls";

  controlsElement.setAttribute(
    "aria-label",
    "Navegação entre etapas do fluxo Kanban"
  );

  board.insertAdjacentElement(
    "afterend",
    controlsElement
  );

  function getCurrentFlow() {
    return board.dataset.currentView === "anterior"
      ? previousFlow
      : proposedFlow;
  }

  function getActiveBoard() {
    return board.dataset.currentView === "anterior"
      ? previousBoard
      : proposedBoard;
  }

  function getActiveColumns() {
    return Array.from(
      getActiveBoard().querySelectorAll(
        ".kanban-column"
      )
    );
  }

  function getSelectedColumn() {
    return getActiveBoard().querySelector(
      ".kanban-column.is-selected"
    );
  }

  function getSelectedIndex() {
    const columns = getActiveColumns();
    const selectedColumn = getSelectedColumn();

    const index =
      columns.indexOf(selectedColumn);

    return index >= 0 ? index : 0;
  }

  function updatePolicy(item) {
    if (!item) {
      return;
    }

    policyTitle.textContent = item.title;

    if (item.limitLabel) {
      policyWip.textContent =
        `Limite sugerido: ${item.limitLabel}`;
    } else if (
      item.current !== null &&
      item.limit !== null
    ) {
      policyWip.textContent =
        `WIP ilustrativo: ${item.current} de ${item.limit}`;
    } else {
      policyWip.textContent =
        "Etapa de saída";
    }

    policyObjective.textContent =
      item.policy.objective;

    policyEntry.textContent =
      item.policy.entry;

    policyExit.textContent =
      item.policy.exit;

    policyRisk.textContent =
      item.policy.risk;
  }

  function renderStageControls() {
    const flow = getCurrentFlow();
    const selectedIndex = getSelectedIndex();

    controlsElement.innerHTML = `
      <button
        class="kanban-stage-control-button"
        type="button"
        data-kanban-direction="previous"
        ${selectedIndex === 0 ? "disabled" : ""}
      >
        ← Anterior
      </button>

      <span class="kanban-stage-control-status">
        Etapa ${selectedIndex + 1}
        de ${flow.length}
      </span>

      <button
        class="kanban-stage-control-button"
        type="button"
        data-kanban-direction="next"
        ${
          selectedIndex === flow.length - 1
            ? "disabled"
            : ""
        }
      >
        Próxima →
      </button>
    `;
  }

  function centerSelectedColumn(
    column,
    behavior = "smooth"
  ) {
    const container =
      column?.closest(".kanban-columns");

    if (!container || !column) {
      return;
    }

    const targetPosition =
      column.offsetLeft -
      container.offsetLeft -
      container.clientWidth / 2 +
      column.offsetWidth / 2;

    const maximumScroll =
      Math.max(
        0,
        container.scrollWidth -
          container.clientWidth
      );

    const safePosition =
      Math.max(
        0,
        Math.min(
          targetPosition,
          maximumScroll
        )
      );

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    container.scrollTo({
      left: safePosition,
      behavior: prefersReducedMotion
        ? "auto"
        : behavior
    });
  }

  function scrollPageToColumn(column) {
    if (
      !column ||
      !window.matchMedia(
        "(max-width: 1024px)"
      ).matches
    ) {
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
      18;

    const top =
      column.getBoundingClientRect().top +
      window.scrollY -
      offset;

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion
        ? "auto"
        : "smooth"
    });
  }

  function selectColumn(
    column,
    options = {}
  ) {
    const {
      center = true,
      scrollPage = false
    } = options;

    if (!column) {
      return;
    }

    document
      .querySelectorAll(".kanban-column")
      .forEach((item) => {
        const selected =
          item === column;

        item.classList.toggle(
          "is-selected",
          selected
        );

        item.setAttribute(
          "aria-pressed",
          String(selected)
        );
      });

    const currentFlow =
      getCurrentFlow();

    const selectedItem =
      currentFlow.find(
        (item) =>
          item.key ===
          column.dataset.column
      );

    updatePolicy(selectedItem);

    if (status && selectedItem) {
      status.textContent =
        `Etapa selecionada: ${selectedItem.title}.`;
    }

    renderStageControls();

    if (center) {
      centerSelectedColumn(column);
    }

    if (scrollPage) {
      window.setTimeout(() => {
        scrollPageToColumn(column);
      }, 180);
    }
  }

  function bindBoardInteractions(
    container
  ) {
    const columns =
      container.querySelectorAll(
        ".kanban-column"
      );

    columns.forEach((column) => {
      column.addEventListener(
        "click",
        () => {
          selectColumn(column);
        }
      );

      column.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            selectColumn(column);
            return;
          }

          if (
            event.key !== "ArrowRight" &&
            event.key !== "ArrowLeft"
          ) {
            return;
          }

          event.preventDefault();

          const list =
            Array.from(columns);

          const currentIndex =
            list.indexOf(column);

          const direction =
            event.key === "ArrowRight"
              ? 1
              : -1;

          const nextIndex =
            Math.max(
              0,
              Math.min(
                currentIndex + direction,
                list.length - 1
              )
            );

          const nextColumn =
            list[nextIndex];

          nextColumn.focus();

          selectColumn(nextColumn);
        }
      );
    });
  }

  bindBoardInteractions(previousBoard);
  bindBoardInteractions(proposedBoard);

  function resetBoardPosition(
    activeBoard
  ) {
    const columnsContainer =
      activeBoard.querySelector(
        ".kanban-columns"
      );

    if (!columnsContainer) {
      return;
    }

    columnsContainer.scrollTo({
      left: 0,
      behavior: "auto"
    });
  }

  function changeView(view) {
    board.dataset.currentView = view;

    const previousIsActive =
      view === "anterior";

    previousBoard.hidden =
      !previousIsActive;

    proposedBoard.hidden =
      previousIsActive;

    previousBoard.classList.toggle(
      "is-active",
      previousIsActive
    );

    proposedBoard.classList.toggle(
      "is-active",
      !previousIsActive
    );

    viewButtons.forEach((button) => {
      const active =
        button.dataset.view === view;

      button.classList.toggle(
        "is-active",
        active
      );

      button.setAttribute(
        "aria-pressed",
        String(active)
      );
    });

    if (status) {
      status.textContent =
        previousIsActive
          ? "Visualização atual: fluxo anterior, com excesso de etapas, filas e limites elevados."
          : "Visualização atual: fluxo proposto, com políticas explícitas, limites de WIP e raia urgente.";
    }

    const activeBoard =
      getActiveBoard();

    const firstColumn =
      activeBoard.querySelector(
        ".kanban-column"
      );

    resetBoardPosition(activeBoard);

    selectColumn(firstColumn, {
      center: false,
      scrollPage: false
    });

    window.requestAnimationFrame(
      () => {
        resetBoardPosition(activeBoard);
      }
    );

    window.setTimeout(() => {
      resetBoardPosition(activeBoard);
    }, 120);
  }

  controlsElement.addEventListener(
    "click",
    (event) => {
      const button =
        event.target.closest(
          "[data-kanban-direction]"
        );

      if (
        !button ||
        button.disabled
      ) {
        return;
      }

      const columns =
        getActiveColumns();

      const selectedIndex =
        getSelectedIndex();

      const nextIndex =
        button.dataset.kanbanDirection ===
        "next"
          ? selectedIndex + 1
          : selectedIndex - 1;

      if (
        nextIndex < 0 ||
        nextIndex >= columns.length
      ) {
        return;
      }

      const nextColumn =
        columns[nextIndex];

      selectColumn(nextColumn, {
        center: true,
        scrollPage: true
      });
    }
  );

  viewButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        changeView(
          button.dataset.view
        );
      }
    );
  });

  window.addEventListener(
    "pageshow",
    () => {
      const activeBoard =
        getActiveBoard();

      window.requestAnimationFrame(
        () => {
          resetBoardPosition(
            activeBoard
          );
        }
      );
    }
  );

  window.addEventListener(
    "resize",
    () => {
      const selectedColumn =
        getSelectedColumn();

      if (
        selectedColumn &&
        window.matchMedia(
          "(max-width: 1024px)"
        ).matches
      ) {
        centerSelectedColumn(
          selectedColumn,
          "auto"
        );
      }
    }
  );

  changeView("proposto");
});

