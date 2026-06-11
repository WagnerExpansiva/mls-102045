/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/operationalDashboardPage.defs.ts" enhancement="_blank"/>

export const operationalDashboardPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "operationalDashboardPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 56,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "operationalDashboardPage",
      "pageName": "Dashboard Operacional",
      "actor": "adminActor",
      "purpose": "Visão consolidada das métricas operacionais da imobiliária: imóveis ativos, leads do mês, pipeline de fechamentos, taxa de conversão e visitas realizadas. Ponto de entrada principal do Admin.",
      "capabilities": [
        "dashboardOverview",
        "roleBasedAccess"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [
        "i18n"
      ],
      "mdmRefs": [
        "property",
        "lead",
        "broker"
      ],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "propertyListPage",
          "trigger": "Clique em card de imóveis",
          "description": "Navega para a lista completa de imóveis"
        },
        {
          "direction": "outbound",
          "pageId": "leadPipelinePage",
          "trigger": "Clique em card de leads",
          "description": "Navega para o pipeline Kanban de leads"
        },
        {
          "direction": "outbound",
          "pageId": "dealTrackerPage",
          "trigger": "Clique em card de negócios",
          "description": "Navega para o rastreador de negócios"
        },
        {
          "direction": "outbound",
          "pageId": "visitListPage",
          "trigger": "Clique em card de visitas",
          "description": "Navega para a lista de visitas"
        }
      ],
      "sections": [
        {
          "sectionName": "Filtro de Período",
          "mode": "view",
          "organisms": [
            {
              "organismName": "PeriodFilterBar",
              "purpose": "Permite ao Admin selecionar o intervalo de datas para filtrar todas as métricas do dashboard",
              "userActions": [
                "Selecionar data de início",
                "Selecionar data de fim",
                "Aplicar filtro de período"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [
                "periodStart",
                "periodEnd"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Cards de Métricas Operacionais",
          "mode": "view",
          "organisms": [
            {
              "organismName": "ActivePropertiesMetricCard",
              "purpose": "Exibe o total de imóveis ativos no período selecionado com link de navegação para a lista de imóveis",
              "userActions": [
                "Visualizar contagem de imóveis ativos",
                "Clicar para navegar para Lista de Imóveis"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "activePropertiesCount"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            },
            {
              "organismName": "MonthlyLeadsMetricCard",
              "purpose": "Exibe o total de leads captados no mês/período selecionado com link de navegação para o pipeline",
              "userActions": [
                "Visualizar contagem de leads do mês",
                "Clicar para navegar para Pipeline de Leads"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "monthlyLeadsCount"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            },
            {
              "organismName": "DealPipelineMetricCard",
              "purpose": "Exibe o resumo do pipeline de fechamentos (quantidade de negócios por etapa) com link para o rastreador",
              "userActions": [
                "Visualizar resumo do pipeline de negócios",
                "Clicar para navegar para Rastreador de Negócios"
              ],
              "requiredEntities": [
                "Deal"
              ],
              "readsFields": [
                "dealPipelineSummary"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            },
            {
              "organismName": "LeadConversionRateMetricCard",
              "purpose": "Exibe a taxa de conversão de leads (leads fechados / total de leads) no período selecionado",
              "userActions": [
                "Visualizar taxa de conversão de leads"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadConversionRate"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            },
            {
              "organismName": "VisitsPerMonthMetricCard",
              "purpose": "Exibe o total de visitas realizadas no mês/período selecionado com link para a lista de visitas",
              "userActions": [
                "Visualizar contagem de visitas realizadas",
                "Clicar para navegar para Lista de Visitas"
              ],
              "requiredEntities": [
                "Visit"
              ],
              "readsFields": [
                "visitsPerMonthCount"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Painel de Indicadores Detalhados",
          "mode": "view",
          "organisms": [
            {
              "organismName": "DashboardMetricsSummaryPanel",
              "purpose": "Painel consolidado que agrega e exibe todos os indicadores operacionais retornados pelo BFF em uma única chamada, incluindo timestamp de geração",
              "userActions": [
                "Visualizar métricas consolidadas",
                "Atualizar dados do dashboard"
              ],
              "requiredEntities": [
                "Property",
                "Lead",
                "Corretor"
              ],
              "readsFields": [
                "activePropertiesCount",
                "monthlyLeadsCount",
                "dealPipelineSummary",
                "leadConversionRate",
                "visitsPerMonthCount",
                "generatedAt"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "queryDashboardMetrics",
        "purpose": "Buscar todos os indicadores do dashboard operacional em uma única chamada agregada: imóveis ativos, leads do mês, pipeline de fechamentos, taxa de conversão e visitas realizadas no período informado.",
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
            "name": "activePropertiesCount",
            "type": "number"
          },
          {
            "name": "monthlyLeadsCount",
            "type": "number"
          },
          {
            "name": "dealPipelineSummary",
            "type": "DealPipelineSummary"
          },
          {
            "name": "leadConversionRate",
            "type": "number"
          },
          {
            "name": "visitsPerMonthCount",
            "type": "number"
          },
          {
            "name": "generatedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Property",
          "Lead",
          "Corretor"
        ],
        "writesEntities": [],
        "readsTables": [
          "lead_stage_transition_event_log",
          "deal_stage_transition_event_log"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "queryDashboardMetricsUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-rbac-data-isolation"
        ]
      }
    ]
  }
} as const;

export default operationalDashboardPagePagePlan;
