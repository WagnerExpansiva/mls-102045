/// <mls fileReference="_102045_/l4/workflows/dealPipelineWorkflow.defs.ts" enhancement="_blank"/>

export const dealPipelineWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "dealPipelineWorkflow",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "dealPipelineWorkflow",
      "title": "Pipeline de Negócios",
      "purpose": "Controlar as etapas de um negócio desde a proposta até o fechamento ou perda, garantindo vinculação obrigatória com imóvel e corretor.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "corretor"
      ],
      "states": [
        {
          "stateId": "propostaCriada",
          "description": "Negócio criado com proposta inicial vinculada a imóvel."
        },
        {
          "stateId": "emNegociacao",
          "description": "Negócio em negociação ativa com o lead."
        },
        {
          "stateId": "fechadoGanho",
          "description": "Negócio encerrado com sucesso."
        },
        {
          "stateId": "fechadoPerdido",
          "description": "Negócio encerrado como perdido."
        }
      ],
      "transitions": [
        {
          "from": "propostaCriada",
          "to": "emNegociacao",
          "trigger": "avancarParaNegociacao",
          "actor": "corretor",
          "conditions": [
            "ruleDealRequiresProperty",
            "ruleBrokerPermissions"
          ],
          "actions": [
            "Deal.stage=emNegociacao"
          ],
          "rulesApplied": [
            "ruleDealStageTransition",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "emNegociacao",
          "to": "fechadoGanho",
          "trigger": "fecharGanho",
          "actor": "corretor",
          "conditions": [
            "ruleDealRequiresProperty",
            "ruleBrokerPermissions"
          ],
          "actions": [
            "Deal.stage=fechadoGanho"
          ],
          "rulesApplied": [
            "ruleDealStageTransition",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "emNegociacao",
          "to": "fechadoPerdido",
          "trigger": "fecharPerdido",
          "actor": "corretor",
          "conditions": [
            "ruleDealRequiresProperty",
            "ruleBrokerPermissions"
          ],
          "actions": [
            "Deal.stage=fechadoPerdido"
          ],
          "rulesApplied": [
            "ruleDealStageTransition",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "propostaCriada",
          "to": "fechadoPerdido",
          "trigger": "cancelarProposta",
          "actor": "corretor",
          "conditions": [
            "ruleDealRequiresProperty",
            "ruleBrokerPermissions"
          ],
          "actions": [
            "Deal.stage=fechadoPerdido"
          ],
          "rulesApplied": [
            "ruleDealStageTransition",
            "ruleBrokerPermissions"
          ]
        }
      ],
      "requiredEntities": [
        "Deal",
        "Property"
      ],
      "persistenceRefs": [],
      "usecaseRefs": [
        "createDeal",
        "updateDealStage"
      ],
      "metricRefs": [
        "dealMetrics"
      ],
      "userActions": [
        "criarNegocio",
        "moverEtapa",
        "fecharNegocio"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "ruleDealStageTransition",
        "ruleDealRequiresProperty",
        "ruleBrokerPermissions"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "dealStageView",
          "title": "Visualização por etapas do negócio",
          "priority": "now",
          "description": "Criar visão Kanban/etapas para arrastar e soltar negócios, disparando updateDealStage.",
          "tradeoff": "Aumenta esforço de UI e estados de loading."
        },
        {
          "suggestionId": "dealPropertyLinkValidation",
          "title": "Validar vinculação obrigatória com imóvel",
          "priority": "now",
          "description": "Validar no frontend e backend a seleção de imóvel antes de criar o negócio (createDeal).",
          "tradeoff": "Exige mensagens de erro claras e bloqueio de avanço."
        },
        {
          "suggestionId": "noTasksNeeded",
          "title": "Sem tarefas automáticas",
          "priority": "now",
          "description": "O fluxo é simples e dirigido pelo corretor; não há necessidade de tarefas automáticas neste workflow.",
          "tradeoff": "Sem follow-ups automáticos pode exigir disciplina manual."
        }
      ],
      "workflowScope": "singleModule",
      "moduleRefs": [
        "propertyFlowCrm"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "propertyFlowCrm",
          "entity": "Deal"
        },
        {
          "moduleId": "propertyFlowCrm",
          "entity": "Property"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "workflow",
          "artifactId": "dealPipelineWorkflow"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "usecase",
          "artifactId": "createDeal"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "usecase",
          "artifactId": "updateDealStage"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "metricTable",
          "artifactId": "dealMetrics"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/dealPipelineWorkflow.defs.ts",
      "exportName": "dealPipelineWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default dealPipelineWorkflowDef;
