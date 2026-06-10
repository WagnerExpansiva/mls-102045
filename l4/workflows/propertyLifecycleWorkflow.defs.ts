/// <mls fileReference="_102045_/l4/workflows/propertyLifecycleWorkflow.defs.ts" enhancement="_blank"/>

export const propertyLifecycleWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "propertyLifecycleWorkflow",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "propertyLifecycleWorkflow",
      "title": "Ciclo de Vida do Imóvel",
      "purpose": "Controlar o status do imóvel desde o cadastro até a inativação, garantindo consistência nas informações e disponibilidade para negócios.",
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
          "stateId": "novo",
          "description": "Imóvel ainda não cadastrado no CRM."
        },
        {
          "stateId": "disponivel",
          "description": "Imóvel disponível para divulgação e negócios."
        },
        {
          "stateId": "reservado",
          "description": "Imóvel reservado aguardando conclusão da negociação."
        },
        {
          "stateId": "vendido",
          "description": "Imóvel vendido e fora de novas negociações."
        },
        {
          "stateId": "inativo",
          "description": "Imóvel inativado e não disponível para buscas."
        }
      ],
      "transitions": [
        {
          "from": "novo",
          "to": "disponivel",
          "trigger": "createProperty",
          "actor": "corretor",
          "conditions": [],
          "actions": [
            "Property.status=disponivel"
          ],
          "rulesApplied": [
            "rulePropertyStatus",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "disponivel",
          "to": "reservado",
          "trigger": "updateProperty",
          "actor": "corretor",
          "conditions": [],
          "actions": [
            "Property.status=reservado"
          ],
          "rulesApplied": [
            "rulePropertyStatus",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "reservado",
          "to": "disponivel",
          "trigger": "updateProperty",
          "actor": "corretor",
          "conditions": [],
          "actions": [
            "Property.status=disponivel"
          ],
          "rulesApplied": [
            "rulePropertyStatus",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "reservado",
          "to": "vendido",
          "trigger": "updateProperty",
          "actor": "corretor",
          "conditions": [],
          "actions": [
            "Property.status=vendido"
          ],
          "rulesApplied": [
            "rulePropertyStatus",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "disponivel",
          "to": "inativo",
          "trigger": "archiveProperty",
          "actor": "corretor",
          "conditions": [],
          "actions": [
            "Property.status=inativo"
          ],
          "rulesApplied": [
            "rulePropertyStatus",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "reservado",
          "to": "inativo",
          "trigger": "archiveProperty",
          "actor": "corretor",
          "conditions": [],
          "actions": [
            "Property.status=inativo"
          ],
          "rulesApplied": [
            "rulePropertyStatus",
            "ruleBrokerPermissions"
          ]
        },
        {
          "from": "vendido",
          "to": "inativo",
          "trigger": "archiveProperty",
          "actor": "corretor",
          "conditions": [],
          "actions": [
            "Property.status=inativo"
          ],
          "rulesApplied": [
            "rulePropertyStatus",
            "ruleBrokerPermissions"
          ]
        }
      ],
      "requiredEntities": [
        "Property"
      ],
      "persistenceRefs": [
        "property_metrics"
      ],
      "usecaseRefs": [
        "createProperty",
        "updateProperty",
        "archiveProperty"
      ],
      "metricRefs": [
        "propertyMetrics"
      ],
      "userActions": [
        "Cadastrar imóvel",
        "Atualizar status do imóvel",
        "Inativar imóvel"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "rulePropertyStatus",
        "ruleBrokerPermissions"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "propertyStatusControl",
          "title": "Controle de status ativo/inativo",
          "priority": "now",
          "description": "Imóveis inativos não devem aparecer em buscas nem receber visitas ou propostas.",
          "tradeoff": "Requer filtros adicionais nas buscas e validações de fluxo."
        },
        {
          "suggestionId": "propertyDataValidation",
          "title": "Validação de campos obrigatórios no cadastro",
          "priority": "now",
          "description": "Garantir qualidade mínima dos dados do imóvel para busca e apresentação.",
          "tradeoff": "Pode aumentar o atrito no cadastro inicial."
        },
        {
          "suggestionId": "noTaskNeeded",
          "title": "Sem tarefas explícitas para ciclo de vida",
          "priority": "soon",
          "description": "O fluxo de status é tratado por casos de uso e não exige criação de tarefas; considere tarefas apenas se houver revisão humana obrigatória antes de publicar.",
          "tradeoff": "Sem tarefas, não há fila de pendências para validação manual."
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
          "artifactId": "propertyLifecycleWorkflow"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/propertyLifecycleWorkflow.defs.ts",
      "exportName": "propertyLifecycleWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default propertyLifecycleWorkflowDef;
