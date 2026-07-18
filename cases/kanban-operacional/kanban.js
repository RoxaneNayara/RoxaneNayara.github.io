"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector("#kanban-board");
  const columnsContainer =
    document.querySelector(".kanban-columns");

  const columns =
    document.querySelectorAll(".kanban-column");

  const viewButtons =
    document.querySelectorAll(".kanban-view-button");

  const taskCards =
    document.querySelectorAll(".kanban-task-card");

  const status = document.querySelector("#kanban-status");

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

  if (!board || !columnsContainer) {
    return;
  }

  const policies = {
    triagem: {
      title: "Intake / Triagem",
      wip: "WIP atual: 2 de 4",
      objective:
        "Capturar, registrar e qualificar novas demandas antes que sejam comprometidas pelo time.",
      entry:
        "A demanda deve possuir descrição mínima, solicitante, impacto e prazo desejado.",
      exit:
        "A demanda segue para refinamento quando possui contexto suficiente para análise de regra, risco e dependências.",
      risk:
        "Permitir a entrada de demandas incompletas ou priorizadas sem avaliação de impacto."
    },

    refinamento: {
      title: "Discovery / Refinamento",
      wip: "WIP atual: 2 de 3",
      objective:
        "Compreender a necessidade, validar regras, riscos, dependências e critérios de aceite.",
      entry:
        "A demanda deve ter sido registrada e qualificada durante a triagem.",
      exit:
        "A demanda sai quando possui critérios de aceite claros, prioridade validada e tamanho compreendido.",
      risk:
        "Enviar trabalho incompleto para execução, gerando dúvidas, retrabalho ou bloqueios."
    },

    ready: {
      title: "Ready",
      wip: "WIP atual: 2 de 2",
      objective:
        "Manter uma fila limitada de trabalho realmente pronto e comprometido.",
      entry:
        "A demanda deve possuir critérios de aceite, prioridade, dependências e riscos avaliados.",
      exit:
        "O item é puxado somente quando existe capacidade disponível na etapa seguinte.",
      risk:
        "Transformar a fila em um depósito de demandas sem compromisso real de execução."
    },

    desenvolvimento: {
      title: "Em Desenvolvimento",
      wip: "WIP atual: 4 de 3 · limite excedido",
      objective:
        "Construir a solução priorizando a conclusão do trabalho já iniciado.",
      entry:
        "O item deve ser puxado da fila Ready e respeitar a capacidade disponível.",
      exit:
        "A implementação deve estar concluída, revisada e disponível para validação.",
      risk:
        "Iniciar mais trabalho do que o time consegue concluir, elevando filas e tempo de atravessamento."
    },

    validacao: {
      title: "Validação",
      wip: "WIP atual: 1 de 3",
      objective:
        "Validar critérios de aceite, riscos, comportamento e evidências da entrega.",
      entry:
        "A implementação precisa estar disponível em ambiente adequado e com escopo compreendido.",
      exit:
        "Todos os critérios aplicáveis devem estar validados e as evidências registradas.",
      risk:
        "Acumular entregas aguardando validação ou liberar itens sem evidências suficientes."
    },

    concluido: {
      title: "Concluído",
      wip: "Etapa de saída",
      objective:
        "Registrar entregas finalizadas, validadas e rastreáveis.",
      entry:
        "O item deve atender aos critérios de qualidade e conclusão definidos.",
      exit:
        "Não se aplica. A demanda encerra seu fluxo operacional nesta etapa.",
      risk:
        "Considerar concluído um item que ainda possua pendências, defeitos conhecidos ou ausência de evidências."
    }
  };

  function prefersReducedMotion() {
    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }

  function updatePolicyPanel(columnKey) {
    const policy = policies[columnKey];

    if (!policy) {
      return;
    }

    if (policyTitle) {
      policyTitle.textContent = policy.title;
    }

    if (policyWip) {
      policyWip.textContent = policy.wip;
    }

    if (policyObjective) {
      policyObjective.textContent = policy.objective;
    }

    if (policyEntry) {
      policyEntry.textContent = policy.entry;
    }

    if (policyExit) {
      policyExit.textContent = policy.exit;
    }

    if (policyRisk) {
      policyRisk.textContent = policy.risk;
    }
  }

  function selectColumn(column, shouldScroll = true) {
    if (!column) {
      return;
    }

    columns.forEach((item) => {
      const isSelected = item === column;

      item.classList.toggle(
        "is-selected",
        isSelected
      );

      item.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });

    const columnKey = column.dataset.column;

    updatePolicyPanel(columnKey);

    if (status && policies[columnKey]) {
      status.textContent =
        `Etapa selecionada: ${policies[columnKey].title}.`;
    }

    if (shouldScroll) {
      column.scrollIntoView({
        behavior: prefersReducedMotion()
          ? "auto"
          : "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }

  columns.forEach((column) => {
    column.addEventListener("click", (event) => {
      if (event.target.closest(".kanban-task-card")) {
        return;
      }

      selectColumn(column);
    });

    column.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        selectColumn(column);
      }

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();

        const columnList = Array.from(columns);
        const currentIndex =
          columnList.indexOf(column);

        const direction =
          event.key === "ArrowRight" ? 1 : -1;

        const nextIndex =
          Math.min(
            Math.max(
              currentIndex + direction,
              0
            ),
            columnList.length - 1
          );

        const nextColumn =
          columnList[nextIndex];

        nextColumn.focus();
        selectColumn(nextColumn);
      }
    });
  });

  function changeView(selectedView) {
    board.dataset.currentView = selectedView;

    viewButtons.forEach((button) => {
      const isActive =
        button.dataset.view === selectedView;

      button.classList.toggle(
        "is-active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });

    if (status) {
      status.textContent =
        selectedView === "proposto"
          ? "Visualização atual: fluxo proposto, com políticas explícitas, limites de WIP e classe de serviço urgente."
          : "Visualização atual: fluxo anterior, com maior complexidade operacional e menor clareza de governança.";
    }

    columnsContainer.scrollTo({
      left: 0,
      behavior: prefersReducedMotion()
        ? "auto"
        : "smooth"
    });

    const firstColumn = columns[0];

    selectColumn(firstColumn, false);
  }

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      changeView(button.dataset.view);
    });
  });

  taskCards.forEach((taskCard) => {
    taskCard.addEventListener("click", (event) => {
      event.stopPropagation();

      const taskTitle =
        taskCard.querySelector("strong")
          ?.textContent
          ?.trim();

      const parentColumn =
        taskCard.closest(".kanban-column");

      if (parentColumn) {
        selectColumn(parentColumn);
      }

      if (status && taskTitle) {
        status.textContent =
          `Card selecionado: ${taskTitle}. Consulte abaixo as políticas da etapa correspondente.`;
      }
    });
  });

  /*
   * Garante que o board sempre seja aberto
   * na primeira coluna, mesmo quando a prévia
   * tiver preservado uma posição de rolagem anterior.
   */

  window.requestAnimationFrame(() => {
    columnsContainer.scrollLeft = 0;

    const firstColumn = columns[0];

    if (firstColumn) {
      selectColumn(firstColumn, false);
    }
  });
});
