/// <mls fileReference="_102045_/l4/workflows/aiLeadQualificationWorkflow.defs.ts" enhancement="_blank"/>

export const aiLeadQualificationWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "aiLeadQualificationWorkflow",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "aiLeadQualificationWorkflow",
      "title": "Qualificação de Lead com IA",
      "purpose": "Executar a classificação automática de leads e sugerir ações de follow-up, criando tarefas para o corretor quando apropriado.",
      "executionMode": "automation",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Follow-up recomendado para lead {{leadId}}",
        "assigneeRules": [
          "atribuir ao corretor responsável pelo lead"
        ],
        "slaRules": [
          "concluir em até 24 horas após a qualificação"
        ],
        "taskRoomRequired": false
      },
      "actors": [
        "corretor",
        "system"
      ],
      "states": [
        {
          "stateId": "pendingQualification",
          "description": "Lead aguardando fila de qualificação por IA."
        },
        {
          "stateId": "aiQualifying",
          "description": "IA processando a classificação do lead."
        },
        {
          "stateId": "qualified",
          "description": "Lead qualificado com temperatura e sugestão registrada."
        },
        {
          "stateId": "followUpTaskCreated",
          "description": "Tarefa de follow-up criada para o corretor."
        },
        {
          "stateId": "failed",
          "description": "Falha na qualificação por IA."
        }
      ],
      "transitions": [
        {
          "from": "pendingQualification",
          "to": "aiQualifying",
          "trigger": "leadQualificationQueued",
          "actor": "system",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "aiQualifying",
          "to": "qualified",
          "trigger": "aiQualificationCompleted",
          "actor": "system",
          "conditions": [
            "aiResult.temperature in ['quente','morno','frio']"
          ],
          "actions": [
            "set Lead.temperature = aiResult.temperature",
            "set Lead.notes = append(Lead.notes, aiResult.nextAction)"
          ],
          "rulesApplied": [
            "ruleLeadTemperature"
          ]
        },
        {
          "from": "qualified",
          "to": "followUpTaskCreated",
          "trigger": "followUpTaskCreated",
          "actor": "system",
          "conditions": [
            "aiResult.nextAction != null"
          ],
          "actions": [
            "set Lead.notes = append(Lead.notes, 'Tarefa de follow-up criada')"
          ],
          "rulesApplied": []
        },
        {
          "from": "qualified",
          "to": "qualified",
          "trigger": "noFollowUpNeeded",
          "actor": "system",
          "conditions": [
            "aiResult.nextAction == null"
          ],
          "actions": [],
          "rulesApplied": []
        },
        {
          "from": "aiQualifying",
          "to": "failed",
          "trigger": "aiQualificationFailed",
          "actor": "system",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "Lead"
      ],
      "persistenceRefs": [
        "leadMetrics"
      ],
      "usecaseRefs": [
        "qualifyLeadWithAi"
      ],
      "metricRefs": [
        "leadMetrics"
      ],
      "userActions": [
        "solicitarQualificacaoAi",
        "revisarSugestaoFollowUp"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "ruleLeadTemperature",
        "ruleBrokerPermissions"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "aiLeadScoreDisplay",
          "title": "Exibir score e temperatura na ficha do lead",
          "priority": "soon",
          "description": "Adicionar indicadores visuais da qualificação no resumo do lead para priorização rápida.",
          "tradeoff": "Requer ajustes de UI e pode aumentar a densidade de informações na ficha."
        },
        {
          "suggestionId": "aiFollowUpTaskCreation",
          "title": "Criar tarefa de follow-up sugerida automaticamente",
          "priority": "soon",
          "description": "Gerar tarefa com a próxima ação sugerida pela IA para garantir acompanhamento pelo corretor.",
          "tradeoff": "Pode criar volume excessivo de tarefas se a IA sugerir ações para muitos leads."
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
          "entity": "Lead"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "workflow",
          "artifactId": "aiLeadQualificationWorkflow"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/aiLeadQualificationWorkflow.defs.ts",
      "exportName": "aiLeadQualificationWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default aiLeadQualificationWorkflowDef;
