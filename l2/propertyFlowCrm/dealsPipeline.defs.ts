/// <mls fileReference="_102045_/l2/propertyFlowCrm/dealsPipeline.defs.ts" enhancement="_blank"/>

export const dealsPipelinePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "dealsPipeline",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 65,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "dealsPipeline",
      "pageName": "Pipeline de negócios",
      "actor": "corretor",
      "purpose": "Gerenciar propostas e negócios por etapas.",
      "capabilities": [
        "trackDeals"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "dealPipelineWorkflow"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "property",
        "lead"
      ],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "dealDetail",
          "trigger": "Abrir negócio"
        },
        {
          "direction": "outbound",
          "pageId": "dealForm",
          "trigger": "Criar proposta/negócio"
        }
      ],
      "sections": [
        {
          "sectionName": "Pipeline por etapas",
          "mode": "kanban",
          "organisms": [
            {
              "organismName": "dealPipelineBoard",
              "purpose": "Visualizar negócios agrupados por etapa e permitir movimentação entre etapas.",
              "userActions": [
                "visualizarNegocio",
                "moverNegocioDeEtapa",
                "abrirNegocio"
              ],
              "requiredEntities": [
                "Deal",
                "Property",
                "Lead"
              ],
              "readsFields": [
                "Deal.id",
                "Deal.stage",
                "Deal.value",
                "Deal.propertyId",
                "Deal.leadId",
                "Property.id",
                "Property.title",
                "Lead.id",
                "Lead.name"
              ],
              "writesFields": [
                "Deal.stage"
              ],
              "rulesApplied": [
                "ruleDealStageTransition",
                "ruleDealRequiresProperty",
                "ruleBrokerPermissions"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listDeals",
        "purpose": "Listar negócios por etapa para o pipeline.",
        "kind": "query",
        "input": [
          {
            "name": "stage",
            "type": "string",
            "required": false
          },
          {
            "name": "propertyId",
            "type": "string",
            "required": false
          },
          {
            "name": "leadId",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "deals",
            "type": "Deal[]"
          }
        ],
        "readsEntities": [
          "dealAggregate",
          "propertyAggregate",
          "leadAggregate"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "listDeals"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleBrokerPermissions"
        ]
      },
      {
        "commandName": "updateDealStage",
        "purpose": "Atualizar etapa do negócio ao mover no pipeline.",
        "kind": "mutation",
        "input": [
          {
            "name": "dealId",
            "type": "string",
            "required": true
          },
          {
            "name": "stage",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "dealId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "dealAggregate"
        ],
        "writesEntities": [
          "dealAggregate"
        ],
        "readsTables": [],
        "writesTables": [
          "deal_metrics"
        ],
        "usecaseRefs": [
          "updateDealStage"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleDealStageTransition",
          "ruleBrokerPermissions"
        ]
      }
    ]
  }
} as const;

export default dealsPipelinePagePlan;
