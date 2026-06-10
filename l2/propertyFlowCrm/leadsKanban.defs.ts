/// <mls fileReference="_102045_/l2/propertyFlowCrm/leadsKanban.defs.ts" enhancement="_blank"/>

export const leadsKanbanPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "leadsKanban",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 66,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "leadsKanban",
      "pageName": "Pipeline de leads",
      "actor": "corretor",
      "purpose": "Gerenciar leads por etapas no kanban.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "leadDetail",
          "trigger": "Abrir lead"
        },
        {
          "direction": "outbound",
          "pageId": "leadForm",
          "trigger": "Cadastrar lead"
        }
      ],
      "sections": [
        {
          "sectionName": "Filtros e busca",
          "mode": "view",
          "organisms": [
            {
              "organismName": "LeadFilters",
              "purpose": "Filtrar leads por estágio, temperatura e texto.",
              "userActions": [
                "filtrarLeads",
                "buscarLeads"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "Lead.stage",
                "Lead.temperature",
                "Lead.name",
                "Lead.email",
                "Lead.phone"
              ],
              "writesFields": [],
              "rulesApplied": [
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Kanban de leads",
          "mode": "view",
          "organisms": [
            {
              "organismName": "LeadsKanbanBoard",
              "purpose": "Visualizar leads por estágio e mover entre colunas.",
              "userActions": [
                "moverLeadNoKanban",
                "abrirLead"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "Lead.id",
                "Lead.name",
                "Lead.stage",
                "Lead.temperature",
                "Lead.lastContactAt"
              ],
              "writesFields": [
                "Lead.stage"
              ],
              "rulesApplied": [
                "ruleLeadStageTransition",
                "ruleLeadTemperature",
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Anotações rápidas",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadNotesInlineEditor",
              "purpose": "Registrar anotações rápidas no lead selecionado.",
              "userActions": [
                "registrarNota"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "Lead.id",
                "Lead.notes"
              ],
              "writesFields": [
                "Lead.notes"
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
        "commandName": "listLeads",
        "purpose": "Listar leads para o kanban.",
        "kind": "query",
        "input": [
          {
            "name": "stage",
            "type": "string",
            "required": false
          },
          {
            "name": "temperature",
            "type": "string",
            "required": false
          },
          {
            "name": "query",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "leads",
            "type": "Lead[]"
          }
        ],
        "readsEntities": [
          "leadAggregate"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "listLeads"
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
        "purpose": "Mover lead no kanban.",
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
        "purpose": "Registrar anotações do lead.",
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

export default leadsKanbanPagePlan;
