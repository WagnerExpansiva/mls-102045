/// <mls fileReference="_102045_/l2/propertyFlowCrm/visitsCalendar.defs.ts" enhancement="_blank"/>

export const visitsCalendarPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "visitsCalendar",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 66,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "visitsCalendar",
      "pageName": "Agenda de visitas",
      "actor": "corretor",
      "purpose": "Visualizar e gerenciar visitas agendadas.",
      "capabilities": [
        "scheduleVisits"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "visitLifecycleWorkflow"
        ],
        "taskWorkflows": [],
        "automations": [
          "visitReminderAutomation"
        ]
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
          "pageId": "visitForm",
          "trigger": "Agendar visita"
        },
        {
          "direction": "outbound",
          "pageId": "visitDetail",
          "trigger": "Selecionar visita"
        }
      ],
      "sections": [
        {
          "sectionName": "Calendário de visitas",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Filtro de período e status",
              "purpose": "Definir intervalo e filtros para listar visitas.",
              "userActions": [
                "Filtrar por período",
                "Filtrar por status",
                "Filtrar por imóvel",
                "Filtrar por lead"
              ],
              "requiredEntities": [
                "Visit"
              ],
              "readsFields": [
                "Visit.scheduledAt",
                "Visit.status",
                "Visit.propertyId",
                "Visit.leadId"
              ],
              "writesFields": [],
              "rulesApplied": [
                "ruleBrokerPermissions"
              ]
            },
            {
              "organismName": "Grade de calendário",
              "purpose": "Exibir visitas no calendário e permitir seleção para ações.",
              "userActions": [
                "Selecionar visita",
                "Abrir detalhe da visita"
              ],
              "requiredEntities": [
                "Visit",
                "Property",
                "Lead"
              ],
              "readsFields": [
                "Visit.visitId",
                "Visit.scheduledAt",
                "Visit.status",
                "Visit.propertyId",
                "Visit.leadId"
              ],
              "writesFields": [],
              "rulesApplied": [
                "ruleBrokerPermissions"
              ]
            },
            {
              "organismName": "Ações rápidas da visita",
              "purpose": "Reagendar ou cancelar visitas diretamente no calendário.",
              "userActions": [
                "Reagendar visita",
                "Cancelar visita"
              ],
              "requiredEntities": [
                "Visit"
              ],
              "readsFields": [
                "Visit.visitId",
                "Visit.scheduledAt",
                "Visit.status"
              ],
              "writesFields": [
                "Visit.scheduledAt",
                "Visit.status"
              ],
              "rulesApplied": [
                "ruleVisitRequiresLinks",
                "ruleBrokerPermissions"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listVisits",
        "purpose": "Listar visitas para o período e filtros do calendário.",
        "kind": "query",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": false
          },
          {
            "name": "leadId",
            "type": "string",
            "required": false
          },
          {
            "name": "fromDate",
            "type": "date",
            "required": false
          },
          {
            "name": "toDate",
            "type": "date",
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
            "name": "visits",
            "type": "Visit[]"
          }
        ],
        "readsEntities": [
          "visitAggregate"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "listVisits"
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
        "commandName": "rescheduleVisit",
        "purpose": "Reagendar uma visita selecionada no calendário.",
        "kind": "command",
        "input": [
          {
            "name": "visitId",
            "type": "string",
            "required": true
          },
          {
            "name": "scheduledAt",
            "type": "date",
            "required": true
          }
        ],
        "output": [
          {
            "name": "visitId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "visitAggregate"
        ],
        "writesEntities": [
          "visitAggregate"
        ],
        "readsTables": [],
        "writesTables": [
          "visit_metrics"
        ],
        "usecaseRefs": [
          "rescheduleVisit"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleVisitRequiresLinks",
          "ruleBrokerPermissions"
        ]
      },
      {
        "commandName": "cancelVisit",
        "purpose": "Cancelar uma visita selecionada no calendário.",
        "kind": "command",
        "input": [
          {
            "name": "visitId",
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
            "name": "visitId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "visitAggregate"
        ],
        "writesEntities": [
          "visitAggregate"
        ],
        "readsTables": [],
        "writesTables": [
          "visit_metrics"
        ],
        "usecaseRefs": [
          "cancelVisit"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleVisitRequiresLinks",
          "ruleBrokerPermissions"
        ]
      }
    ]
  }
} as const;

export default visitsCalendarPagePlan;
