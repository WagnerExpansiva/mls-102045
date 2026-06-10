/// <mls fileReference="_102045_/l4/workflows/visitReminderAutomation.defs.ts" enhancement="_blank"/>

export const visitReminderAutomationDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "visitReminderAutomation",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "visitReminderAutomation",
      "title": "Automação de Lembretes de Visita",
      "purpose": "Enviar notificações automáticas antes das visitas agendadas para reduzir faltas e manter a organização da agenda do corretor.",
      "executionMode": "automation",
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
          "description": "Nenhum lembrete pendente para a visita."
        },
        {
          "stateId": "reminderScheduled",
          "description": "Lembrete configurado para a visita futura."
        },
        {
          "stateId": "reminderSent",
          "description": "Lembrete enviado ao corretor para a visita."
        }
      ],
      "transitions": [
        {
          "from": "idle",
          "to": "reminderScheduled",
          "trigger": "visitScheduled",
          "actor": "corretor",
          "conditions": [
            "ruleVisitRequiresLinks"
          ],
          "actions": [
            "set Visit.reminderStatus=scheduled",
            "set Visit.reminderSchedule=default"
          ],
          "rulesApplied": [
            "ruleVisitRequiresLinks"
          ]
        },
        {
          "from": "reminderScheduled",
          "to": "reminderScheduled",
          "trigger": "visitRescheduled",
          "actor": "corretor",
          "conditions": [
            "ruleVisitRequiresLinks"
          ],
          "actions": [
            "set Visit.reminderSchedule=default"
          ],
          "rulesApplied": [
            "ruleVisitRequiresLinks"
          ]
        },
        {
          "from": "reminderScheduled",
          "to": "reminderSent",
          "trigger": "reminderTimeReached",
          "actor": "corretor",
          "conditions": [],
          "actions": [
            "set Visit.reminderStatus=sent"
          ],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "Visit",
        "Lead"
      ],
      "persistenceRefs": [],
      "usecaseRefs": [
        "scheduleVisit",
        "rescheduleVisit"
      ],
      "metricRefs": [
        "visitMetrics"
      ],
      "userActions": [],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "ruleVisitRequiresLinks"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "visitReminderSchedule",
          "title": "Configurar horários de lembrete",
          "priority": "soon",
          "description": "Definir momentos ideais para alertas (ex: 24h e 1h antes) maximizando comparecimento.",
          "tradeoff": "Pode exigir ajustes de preferência por corretor e aumentar complexidade de configuração."
        },
        {
          "suggestionId": "visitReminderChannels",
          "title": "Suporte a múltiplos canais de notificação",
          "priority": "later",
          "description": "Iniciar com notificações in-app; evoluir para e-mail e WhatsApp conforme demanda.",
          "tradeoff": "Canais externos aumentam custos e exigem integrações e consentimentos."
        },
        {
          "suggestionId": "visitReminderNoTask",
          "title": "Sem tarefas manuais",
          "priority": "now",
          "description": "Esta automação não cria tarefas; o lembrete é enviado automaticamente ao corretor.",
          "tradeoff": "Sem tarefas, há menos rastreabilidade manual de confirmação do lembrete."
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
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "workflow",
          "artifactId": "visitReminderAutomation"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/visitReminderAutomation.defs.ts",
      "exportName": "visitReminderAutomationDef",
      "saveAsDefs": true
    }
  }
} as const;

export default visitReminderAutomationDef;
