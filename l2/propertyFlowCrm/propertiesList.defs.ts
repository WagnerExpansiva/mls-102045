/// <mls fileReference="_102045_/l2/propertyFlowCrm/propertiesList.defs.ts" enhancement="_blank"/>

export const propertiesListPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "propertiesList",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 63,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "propertiesList",
      "pageName": "Imóveis",
      "actor": "corretor",
      "purpose": "Listar e buscar imóveis cadastrados.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "propertyDetail",
          "trigger": "Selecionar imóvel"
        },
        {
          "direction": "outbound",
          "pageId": "propertyForm",
          "trigger": "Cadastrar imóvel"
        }
      ],
      "sections": [
        {
          "sectionName": "Busca e filtros",
          "mode": "interactive",
          "organisms": [
            {
              "organismName": "propertySearchFilters",
              "purpose": "Filtrar imóveis por texto, faixa de preço e status.",
              "userActions": [
                "searchProperties"
              ],
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
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Lista de imóveis",
          "mode": "interactive",
          "organisms": [
            {
              "organismName": "propertiesListResults",
              "purpose": "Exibir imóveis encontrados e permitir seleção para ver detalhes.",
              "userActions": [
                "Selecionar imóvel"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.propertyId",
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
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listProperties",
        "purpose": "Listar imóveis com filtros e paginação para o corretor.",
        "kind": "query",
        "input": [
          {
            "name": "query",
            "type": "string",
            "required": false
          },
          {
            "name": "minPrice",
            "type": "number",
            "required": false
          },
          {
            "name": "maxPrice",
            "type": "number",
            "required": false
          },
          {
            "name": "status",
            "type": "string",
            "required": false
          },
          {
            "name": "page",
            "type": "number",
            "required": false
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false
          }
        ],
        "output": [
          {
            "name": "properties",
            "type": "Property[]"
          },
          {
            "name": "total",
            "type": "number"
          }
        ],
        "readsEntities": [
          "Property"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "searchProperties"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleBrokerPermissions"
        ]
      }
    ]
  }
} as const;

export default propertiesListPagePlan;
