"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const flow =
    document.querySelector("#traceability-flow");

  const steps =
    document.querySelectorAll(".traceability-step");

  const panelTitle =
    document.querySelector("#traceability-panel-title");

  const panelStatus =
    document.querySelector("#traceability-panel-status");

  const objective =
    document.querySelector("#traceability-objective");

  const records =
    document.querySelector("#traceability-records");

  const evidence =
    document.querySelector("#traceability-evidence");

  const link =
    document.querySelector("#traceability-link");

  const risk =
    document.querySelector("#traceability-risk");

  const value =
    document.querySelector("#traceability-value");

  if (!flow || steps.length === 0) {
    return;
  }

  const stepData = {
    backlog: {
      title: "Backlog principal",
      status: "Item de origem",
      objective:
        "Centralizar o contexto funcional da demanda e manter o relacionamento com todas as atividades de validação.",
      records:
        "Descrição da necessidade, critérios de aceite, prioridade, histórico e relacionamento com as atividades filhas.",
      evidence:
        "O item principal referencia os resultados e evidências registrados nas atividades de validação.",
      link:
        "As atividades permanecem vinculadas à demanda por relacionamento pai-filho.",
      risk:
        "Reduz a perda de contexto entre demanda, execução dos testes e resultado final.",
      value:
        "Facilita a consulta do histórico completo da entrega em um único fluxo."
    },

    "pair-testing": {
      title: "Pair Testing com Desenvolvimento",
      status: "Validação antecipada",
      objective:
        "Antecipar dúvidas, inconsistências e riscos antes da validação formal de QA.",
      records:
        "Contexto discutido, comportamento esperado, pontos de atenção e possíveis impactos técnicos ou funcionais.",
      evidence:
        "Registro da atividade colaborativa e das decisões tomadas durante a validação antecipada.",
      link:
        "A atividade permanece vinculada ao backlog principal como parte da preparação da entrega.",
      risk:
        "Reduz o risco de requisitos mal compreendidos, retrabalho e defeitos encontrados apenas em etapas posteriores.",
      value:
        "Aproxima QA e Desenvolvimento e fortalece a qualidade desde o início da implementação."
    },

    "qa-desenvolvimento": {
      title: "QA em desenvolvimento",
      status: "Validação formal",
      objective:
        "Executar os testes no ambiente de desenvolvimento e registrar o resultado da validação.",
      records:
        "Estratégia de teste, escopo, pré-requisitos, resultado esperado, resultado obtido, observações, esforço e status.",
      evidence:
        "Capturas, vídeos, documentos ou outros registros que comprovem a execução dos testes.",
      link:
        "A task de QA permanece vinculada ao backlog principal e registra a validação realizada no ambiente de desenvolvimento.",
      risk:
        "Reduz a possibilidade de liberar alterações sem documentação, evidências ou avaliação adequada dos riscos.",
      value:
        "Centraliza a execução, os resultados e as evidências da validação técnica e funcional."
    },

    "qa-homologacao": {
      title: "QA em homologação",
      status: "Confirmação final",
      objective:
        "Confirmar o comportamento da entrega no ambiente de homologação antes da liberação.",
      records:
        "Resultado dos testes, observações, esforço, responsável, status e confirmação da validação final.",
      evidence:
        "Vídeos, capturas ou outros registros associados à execução no ambiente de homologação.",
      link:
        "A atividade permanece relacionada ao mesmo backlog principal, preservando a sequência da validação.",
      risk:
        "Reduz o risco de diferenças entre ambientes passarem despercebidas antes da liberação.",
      value:
        "Mantém o aceite final rastreável e conectado ao histórico completo da demanda."
    },

    historico: {
      title: "Histórico rastreável",
      status: "Cadeia consolidada",
      objective:
        "Permitir a consulta do caminho completo da demanda, desde o contexto inicial até a confirmação em homologação.",
      records:
        "Relacionamentos entre itens, responsáveis, esforço, status, resultados, observações e histórico de atualizações.",
      evidence:
        "Conjunto de registros produzidos ao longo das validações colaborativa, formal e final.",
      link:
        "A cadeia pai-filho conecta o backlog principal às atividades de Pair Testing, QA em desenvolvimento e QA em homologação.",
      risk:
        "Reduz a dependência de controles paralelos e a possibilidade de perda de informações entre etapas.",
      value:
        "Oferece visibilidade, governança e facilidade de auditoria sobre o processo de validação."
    }
  };

  function prefersReducedMotion() {
    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }

  function updatePanel(stepKey) {
    const data = stepData[stepKey];

    if (!data) {
      return;
    }

    if (panelTitle) {
      panelTitle.textContent = data.title;
    }

    if (panelStatus) {
      panelStatus.textContent = data.status;
    }

    if (objective) {
      objective.textContent = data.objective;
    }

    if (records) {
      records.textContent = data.records;
    }

    if (evidence) {
      evidence.textContent = data.evidence;
    }

    if (link) {
      link.textContent = data.link;
    }

    if (risk) {
      risk.textContent = data.risk;
    }

    if (value) {
      value.textContent = data.value;
    }
  }

  function centerStep(step) {
    const targetPosition =
      step.offsetLeft -
      flow.clientWidth / 2 +
      step.offsetWidth / 2;

    const maximumScroll =
      flow.scrollWidth - flow.clientWidth;

    const safePosition = Math.max(
      0,
      Math.min(targetPosition, maximumScroll)
    );

    flow.scrollTo({
      left: safePosition,
      behavior: prefersReducedMotion()
        ? "auto"
        : "smooth"
    });
  }

  function selectStep(step, shouldScroll = true) {
    if (!step) {
      return;
    }

    steps.forEach((item) => {
      const selected = item === step;

      item.classList.toggle(
        "is-active",
        selected
      );

      item.setAttribute(
        "aria-pressed",
        String(selected)
      );
    });

    const stepKey = step.dataset.step;

    updatePanel(stepKey);

    if (shouldScroll) {
      centerStep(step);
    }
  }

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      selectStep(step);
    });

    step.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        selectStep(step);
      }

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();

        const stepList = Array.from(steps);
        const currentIndex =
          stepList.indexOf(step);

        const direction =
          event.key === "ArrowRight" ? 1 : -1;

        const nextIndex = Math.max(
          0,
          Math.min(
            currentIndex + direction,
            stepList.length - 1
          )
        );

        const nextStep = stepList[nextIndex];

        nextStep.focus();
        selectStep(nextStep);
      }
    });
  });

  window.requestAnimationFrame(() => {
    flow.scrollLeft = 0;

    const firstStep = steps[0];

    selectStep(firstStep, false);
  });

  window.addEventListener("pageshow", () => {
    flow.scrollLeft = 0;
  });
});
