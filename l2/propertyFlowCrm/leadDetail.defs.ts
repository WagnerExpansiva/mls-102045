/// <mls fileReference="_102045_/l2/propertyFlowCrm/leadDetail.defs.ts" enhancement="_blank"/>

export const leadDetailPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "leadDetail",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 67,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "leadDetail",
      "pageName": "Detalhe do lead",
      "actor": "corretor",
      "purpose": "Visualizar e atualizar informações do lead.",
      "capabilities": [
        "manageLeads"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "leadPipelineWorkflow"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "lead"
      ],
      "pageInputs": [
        {
          "name": "leadId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam"
          ],
          "description": "Identificador do lead para carregar os detalhes.",
          "entityRef": "Lead",
          "fieldRef": "leadId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "leadsKanban",
          "trigger": "Abrir lead"
        },
        {
          "direction": "outbound",
          "pageId": "leadForm",
          "trigger": "Editar lead"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do lead",
          "mode": "view",
          "organisms": [
            {
              "organismName": "leadSummaryCard",
              "purpose": "Exibir dados principais do lead.",
              "userActions": [],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId",
                "name",
                "phone",
                "email",
                "stage",
                "temperature"
              ],
              "writesFields": [],
              "rulesApplied": [
                "ruleLeadTemperature",
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Estágio do lead",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "leadStageUpdater",
              "purpose": "Atualizar o estágio do lead no pipeline.",
              "userActions": [
                "updateLeadStage"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId",
                "stage"
              ],
              "writesFields": [
                "stage"
              ],
              "rulesApplied": [
                "ruleLeadStageTransition",
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Anotações",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "leadNotesEditor",
              "purpose": "Registrar e atualizar anotações do lead.",
              "userActions": [
                "updateLeadNotes"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId",
                "notes"
              ],
              "writesFields": [
                "notes"
              ],
              "rulesApplied": [
                "ruleBrokerPermissions"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getLead",
        "purpose": "Carregar dados do lead.",
        "kind": "query",
        "input": [
          {
            "name": "leadId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "lead",
            "type": "Lead"
          }
        ],
        "readsEntities": [
          "leadAggregate"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "getLead"
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
        "commandName": "updateLeadStage",
        "purpose": "Atualizar o estágio do lead.",
        "kind": "command",
        "input": [
          {
            "name": "leadId",
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
            "name": "leadId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "leadAggregate"
        ],
        "writesEntities": [
          "leadAggregate"
        ],
        "readsTables": [],
        "writesTables": [
          "lead_metrics"
        ],
        "usecaseRefs": [
          "updateLeadStage"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleLeadStageTransition",
          "ruleBrokerPermissions"
        ]
      },
      {
        "commandName": "updateLeadNotes",
        "purpose": "Atualizar anotações do lead.",
        "kind": "command",
        "input": [
          {
            "name": "leadId",
            "type": "string",
            "required": true
          },
          {
            "name": "notes",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "leadId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "leadAggregate"
        ],
        "writesEntities": [
          "leadAggregate"
        ],
        "readsTables": [],
        "writesTables": [
          "lead_metrics"
        ],
        "usecaseRefs": [
          "updateLeadNotes"
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

export default leadDetailPagePlan;
