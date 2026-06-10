/// <mls fileReference="_102045_/l2/propertyFlowCrm/propertyDetail.defs.ts" enhancement="_blank"/>

export const propertyDetailPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "propertyDetail",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 64,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "propertyDetail",
      "pageName": "Detalhe do imóvel",
      "actor": "corretor",
      "purpose": "Visualizar informações completas do imóvel.",
      "capabilities": [
        "manageProperties"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "propertyLifecycleWorkflow"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "property"
      ],
      "pageInputs": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do imóvel para carregar detalhes.",
          "entityRef": "Property",
          "fieldRef": "Property.id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "propertiesList",
          "trigger": "Selecionar imóvel"
        },
        {
          "direction": "outbound",
          "pageId": "propertyForm",
          "trigger": "Editar imóvel"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do imóvel",
          "mode": "view",
          "organisms": [
            {
              "organismName": "propertySummaryCard",
              "purpose": "Exibir informações principais do imóvel.",
              "userActions": [],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.id",
                "Property.title",
                "Property.address",
                "Property.price",
                "Property.status"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rulePropertyStatus",
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Detalhes completos",
          "mode": "view",
          "organisms": [
            {
              "organismName": "propertyDetailsPanel",
              "purpose": "Exibir dados completos do imóvel para consulta.",
              "userActions": [],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.title",
                "Property.address",
                "Property.price",
                "Property.status"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rulePropertyStatus",
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Ações do imóvel",
          "mode": "interaction",
          "organisms": [
            {
              "organismName": "propertyActionsBar",
              "purpose": "Permitir editar ou inativar o imóvel.",
              "userActions": [
                "updateProperty",
                "archiveProperty"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.id",
                "Property.status"
              ],
              "writesFields": [
                "Property.status"
              ],
              "rulesApplied": [
                "rulePropertyStatus",
                "ruleBrokerPermissions"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getProperty",
        "purpose": "Carregar dados do imóvel para visualização.",
        "kind": "query",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "property",
            "type": "Property"
          }
        ],
        "readsEntities": [
          "propertyAggregate"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "getProperty"
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
        "commandName": "updateProperty",
        "purpose": "Atualizar informações do imóvel a partir do detalhe.",
        "kind": "command",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "type": "string",
            "required": false
          },
          {
            "name": "address",
            "type": "string",
            "required": false
          },
          {
            "name": "price",
            "type": "number",
            "required": false
          },
          {
            "name": "status",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "propertyId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "propertyAggregate"
        ],
        "writesEntities": [
          "propertyAggregate"
        ],
        "readsTables": [],
        "writesTables": [
          "property_metrics"
        ],
        "usecaseRefs": [
          "updateProperty"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rulePropertyStatus",
          "ruleBrokerPermissions"
        ]
      },
      {
        "commandName": "archiveProperty",
        "purpose": "Inativar o imóvel a partir do detalhe.",
        "kind": "command",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "propertyId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "propertyAggregate"
        ],
        "writesEntities": [
          "propertyAggregate"
        ],
        "readsTables": [],
        "writesTables": [
          "property_metrics"
        ],
        "usecaseRefs": [
          "archiveProperty"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rulePropertyStatus",
          "ruleBrokerPermissions"
        ]
      }
    ]
  }
} as const;

export default propertyDetailPagePlan;
