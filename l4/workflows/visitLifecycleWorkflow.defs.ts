/// <mls fileReference="_102045_/l4/workflows/visitLifecycleWorkflow.defs.ts" enhancement="_blank"/>

export const visitLifecycleWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "visitLifecycleWorkflow",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "visitLifecycleWorkflow",
      "title": "Ciclo de Vida da Visita",
      "purpose": "Gerenciar o agendamento, confirmação, reagendamento, cancelamento e conclusão de visitas a imóveis, vinculando lead, imóvel e corretor.",
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
          "stateId": "idle",
          "description": "Nenhuma visita agendada para o lead e imóvel selecionados."
        },
        {
          "stateId": "scheduled",
          "description": "Visita agendada para data e hora futuras."
        },
        {
          "stateId": "rescheduled",
          "description": "Visita reagendada para nova data e hora."
        },
        {
          "stateId": "cancelled",
          "description": "Visita cancelada pelo corretor."
        }
      ],
      "transitions": [
        {
          "from": "idle",
          "to": "scheduled",
          "trigger": "scheduleVisit",
          "actor": "corretor",
          "conditions": [
            "ruleVisitRequiresLinks",
            "ruleBrokerPermissions"
          ],
          "actions": [],
          "rulesApplied": [
            "ruleVisitRequiresLinks",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "scheduled",
          "to": "rescheduled",
          "trigger": "rescheduleVisit",
          "actor": "corretor",
          "conditions": [
            "ruleVisitRequiresLinks",
            "ruleBrokerPermissions"
          ],
          "actions": [],
          "rulesApplied": [
            "ruleVisitRequiresLinks",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "scheduled",
          "to": "cancelled",
          "trigger": "cancelVisit",
          "actor": "corretor",
          "conditions": [
            "ruleVisitRequiresLinks",
            "ruleBrokerPermissions"
          ],
          "actions": [],
          "rulesApplied": [
            "ruleVisitRequiresLinks",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "rescheduled",
          "to": "cancelled",
          "trigger": "cancelVisit",
          "actor": "corretor",
          "conditions": [
            "ruleVisitRequiresLinks",
            "ruleBrokerPermissions"
          ],
          "actions": [],
          "rulesApplied": [
            "ruleVisitRequiresLinks",
            "ruleBrokerPermissions"
          ]
        }
      ],
      "requiredEntities": [
        "Visit",
        "Lead",
        "Property"
      ],
      "persistenceRefs": [
        "visit_metrics"
      ],
      "usecaseRefs": [
        "scheduleVisit",
        "rescheduleVisit",
        "cancelVisit"
      ],
      "metricRefs": [
        "visitMetrics"
      ],
      "userActions": [
        "Agendar visita",
        "Reagendar visita",
        "Cancelar visita"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "ruleVisitRequiresLinks",
        "ruleBrokerPermissions"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "visitCalendarIntegration",
          "title": "Integração com visual de calendário",
          "priority": "now",
          "description": "Adicionar visão de calendário para evitar conflitos na agenda do corretor ao agendar ou reagendar visitas.",
          "tradeoff": "Requer sincronização e UX adicional para navegação temporal."
        },
        {
          "suggestionId": "visitStatusTracking",
          "title": "Rastreamento de status da visita",
          "priority": "now",
          "description": "Exibir linha do tempo do status da visita para o corretor confirmar o histórico de agendamentos, reagendamentos e cancelamentos.",
          "tradeoff": "Demanda persistir histórico de status e expor em UI."
        },
        {
          "suggestionId": "noTaskCreationForVisits",
          "title": "Sem criação de tarefas para visitas",
          "priority": "soon",
          "description": "Manter o fluxo sem tarefas automáticas; o acompanhamento ocorre via status da visita e métricas.",
          "tradeoff": "Pode reduzir visibilidade para equipes com alto volume; considerar tarefas se houver necessidade de follow-up obrigatório."
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
          "entity": "Visit"
        },
        {
          "moduleId": "propertyFlowCrm",
          "entity": "Lead"
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
          "artifactId": "visitLifecycleWorkflow"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "usecase",
          "artifactId": "scheduleVisit"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "usecase",
          "artifactId": "rescheduleVisit"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "usecase",
          "artifactId": "cancelVisit"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "metricTable",
          "artifactId": "visitMetrics"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/visitLifecycleWorkflow.defs.ts",
      "exportName": "visitLifecycleWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default visitLifecycleWorkflowDef;
