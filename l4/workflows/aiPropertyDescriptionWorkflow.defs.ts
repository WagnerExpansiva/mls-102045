/// <mls fileReference="_102045_/l4/workflows/aiPropertyDescriptionWorkflow.defs.ts" enhancement="_blank"/>

export const aiPropertyDescriptionWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "aiPropertyDescriptionWorkflow",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 63,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "aiPropertyDescriptionWorkflow",
      "title": "Geração de Descrição com IA",
      "purpose": "Orquestrar a chamada ao agente de IA para gerar descrições persuasivas do imóvel com base em atributos cadastrados, permitindo revisão pelo corretor antes de salvar.",
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
          "description": "Fluxo pronto para receber solicitação de geração."
        },
        {
          "stateId": "generating",
          "description": "Descrição sendo gerada pela IA."
        },
        {
          "stateId": "reviewReady",
          "description": "Descrição gerada e disponível para revisão do corretor."
        },
        {
          "stateId": "saved",
          "description": "Descrição aprovada e salva no imóvel."
        }
      ],
      "transitions": [
        {
          "from": "idle",
          "to": "generating",
          "trigger": "requestAiDescription",
          "actor": "corretor",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "generating",
          "to": "reviewReady",
          "trigger": "aiDescriptionGenerated",
          "actor": "corretor",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "reviewReady",
          "to": "saved",
          "trigger": "saveDescription",
          "actor": "corretor",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "reviewReady",
          "to": "generating",
          "trigger": "regenerateDescription",
          "actor": "corretor",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleBrokerPermissions"
          ]
        }
      ],
      "requiredEntities": [
        "Property"
      ],
      "persistenceRefs": [],
      "usecaseRefs": [
        "generatePropertyDescription"
      ],
      "metricRefs": [],
      "userActions": [
        "requestAiDescription",
        "editDescription",
        "saveDescription",
        "regenerateDescription"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "ruleBrokerPermissions"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "aiDescriptionAsyncProcessing",
          "title": "Processamento assíncrono da descrição",
          "priority": "soon",
          "description": "Executar a geração de forma assíncrona, exibindo estado de carregamento e liberando a UI para continuar operando.",
          "tradeoff": "Requer controle de estado adicional e callbacks para atualização do resultado."
        },
        {
          "suggestionId": "aiDescriptionReview",
          "title": "Permitir edição antes de salvar a descrição",
          "priority": "soon",
          "description": "Oferecer área de revisão e edição para o corretor ajustar o texto antes de salvar.",
          "tradeoff": "Aumenta o tempo de interação do corretor, mas reduz risco de texto inadequado."
        },
        {
          "suggestionId": "noTaskForAiDescription",
          "title": "Não criar tarefa para geração de descrição",
          "priority": "soon",
          "description": "Manter o fluxo sem tarefas formais, já que a geração é automática e revisada no mesmo contexto de edição do imóvel.",
          "tradeoff": "Menor rastreabilidade de pendências em listas de tarefas."
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
          "entity": "Property"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "workflow",
          "artifactId": "aiPropertyDescriptionWorkflow"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/aiPropertyDescriptionWorkflow.defs.ts",
      "exportName": "aiPropertyDescriptionWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default aiPropertyDescriptionWorkflowDef;
