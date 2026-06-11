/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/queryDashboardMetricsUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "queryDashboardMetricsUsecase",
  "title": "Consultar Métricas do Dashboard Operacional",
  "purpose": "Agrega e retorna as métricas operacionais (imóveis ativos, leads do mês, pipeline de fechamentos, taxa de conversão, visitas realizadas) para o Dashboard do Admin.",
  "actor": "adminActor",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [],
  "readsTables": [
    {
      "tableName": "active_properties_metric",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "monthly_leads_metric",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "deal_pipeline_metric",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "lead_conversion_metric",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "visits_per_month_metric",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "lead_stage_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "deal_stage_transition_event_log",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "getDashboardMetrics",
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
          "name": "activeProperties",
          "type": "number"
        },
        {
          "name": "monthlyLeads",
          "type": "number"
        },
        {
          "name": "dealPipelineValue",
          "type": "number"
        },
        {
          "name": "leadConversionRate",
          "type": "number"
        },
        {
          "name": "visitsPerMonth",
          "type": "number"
        },
        {
          "name": "generatedAt",
          "type": "date"
        }
      ]
    }
  ],
  "entityRefs": [
    "transitionEventLogEntity"
  ]
} as const;

export default useCase;
