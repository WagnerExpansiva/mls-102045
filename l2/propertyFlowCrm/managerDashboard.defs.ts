/// <mls fileReference="_102045_/l2/propertyFlowCrm/managerDashboard.defs.ts" enhancement="_blank"/>

export const managerDashboardPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "managerDashboard",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 65,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "managerDashboard",
      "pageName": "Dashboard de métricas",
      "actor": "gestor",
      "purpose": "Visualizar métricas básicas de imóveis, leads, visitas e negócios.",
      "capabilities": [
        "viewDashboard"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "periodStart",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data inicial opcional para filtrar métricas."
        },
        {
          "name": "periodEnd",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data final opcional para filtrar métricas."
        }
      ],
      "navigationRefs": [],
      "sections": [
        {
          "sectionName": "Filtros de período",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Seletor de intervalo",
              "purpose": "Definir o período para atualização das métricas.",
              "userActions": [
                "filtrarPeriodo"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Resumo de métricas",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Cards de KPIs",
              "purpose": "Exibir totais e variações das métricas principais.",
              "userActions": [
                "visualizarMetricas"
              ],
              "requiredEntities": [
                "dashboardMetrics"
              ],
              "readsFields": [
                "dashboardMetrics.propertyTotals",
                "dashboardMetrics.leadTotals",
                "dashboardMetrics.visitTotals",
                "dashboardMetrics.dealTotals"
              ],
              "writesFields": [],
              "rulesApplied": [
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Tendências por período",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Gráficos de séries temporais",
              "purpose": "Mostrar séries e tendências de imóveis, leads, visitas e negócios.",
              "userActions": [
                "visualizarSeries"
              ],
              "requiredEntities": [
                "dashboardMetrics"
              ],
              "readsFields": [
                "dashboardMetrics.propertySeries",
                "dashboardMetrics.leadSeries",
                "dashboardMetrics.visitSeries",
                "dashboardMetrics.dealSeries"
              ],
              "writesFields": [],
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
        "commandName": "getDashboardMetrics",
        "purpose": "Carregar métricas consolidadas para o gestor.",
        "kind": "query",
        "input": [
          {
            "name": "periodStart",
            "type": "date",
            "required": false
          },
          {
            "name": "periodEnd",
            "type": "date",
            "required": false
          }
        ],
        "output": [
          {
            "name": "metrics",
            "type": "DashboardMetrics"
          }
        ],
        "readsEntities": [
          "dashboardMetrics"
        ],
        "writesEntities": [],
        "readsTables": [
          "property_metrics",
          "lead_metrics",
          "visit_metrics",
          "deal_metrics"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "viewDashboard"
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

export default managerDashboardPagePlan;
