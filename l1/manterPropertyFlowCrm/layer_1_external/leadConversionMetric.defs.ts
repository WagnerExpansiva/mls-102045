/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/leadConversionMetric.defs.ts" enhancement="_blank"/>

export const leadConversionMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "leadConversionMetric",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 48,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "leadConversionMetric",
      "tableName": "lead_conversion_metric",
      "title": "Taxa de Conversão de Leads",
      "moduleId": "propertyFlowCrm",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "purpose": "Medir a eficiência da conversão de leads entre as etapas do funil, permitindo análise de performance por corretor, par de etapas e janela temporal.",
      "timeColumn": "recorded_at",
      "columns": [
        {
          "name": "recorded_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do registro da métrica. Coluna de tempo do hypertable TimescaleDB."
        },
        {
          "name": "lead_id",
          "type": "uuid",
          "nullable": false,
          "description": "Identificador do lead relacionado à transição de etapa."
        },
        {
          "name": "corretor_id",
          "type": "uuid",
          "nullable": false,
          "description": "Corretor responsável pelo lead no momento da transição."
        },
        {
          "name": "from_stage",
          "type": "text",
          "nullable": false,
          "description": "Etapa de origem da transição (ex: novo, contato, visita, proposta)."
        },
        {
          "name": "to_stage",
          "type": "text",
          "nullable": false,
          "description": "Etapa de destino da transição (ex: contato, visita, proposta, fechado, perdido)."
        },
        {
          "name": "transition_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Total de transições de etapa registradas no período."
        },
        {
          "name": "converted_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de leads convertidos (to_stage = fechado) no período."
        },
        {
          "name": "lost_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de leads perdidos (to_stage = perdido) no período."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "leadId",
          "column": "lead_id",
          "type": "uuid",
          "description": "Identificador do lead. FK derivada da relação ontológica Lead → LeadStageTransitionEvent."
        },
        {
          "dimensionId": "corretorId",
          "column": "corretor_id",
          "type": "uuid",
          "description": "Corretor responsável pelo lead. FK derivada da relação ontológica Lead → Corretor (rel-lead-corretor)."
        },
        {
          "dimensionId": "fromStage",
          "column": "from_stage",
          "type": "text",
          "description": "Etapa de origem da transição no funil de leads."
        },
        {
          "dimensionId": "toStage",
          "column": "to_stage",
          "type": "text",
          "description": "Etapa de destino da transição no funil de leads."
        }
      ],
      "measures": [
        {
          "measureId": "transitionCount",
          "column": "transition_count",
          "aggregation": "sum",
          "unit": "transições",
          "description": "Total de transições de etapa registradas no período."
        },
        {
          "measureId": "convertedCount",
          "column": "converted_count",
          "aggregation": "sum",
          "unit": "leads",
          "description": "Leads convertidos (fechados) no período."
        },
        {
          "measureId": "lostCount",
          "column": "lost_count",
          "aggregation": "sum",
          "unit": "leads",
          "description": "Leads perdidos no período."
        }
      ],
      "sourceWriteEvents": [
        "leadStageTransitionEvent.created"
      ],
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "leadStageTransitionWorkflow"
        ]
      },
      "accessPolicy": {
        "directAccessAllowedFor": [
          "layer_3_usecases"
        ],
        "forbiddenFor": [
          "pages",
          "layer_2_controllers",
          "agents"
        ]
      },
      "hypertable": {
        "timeColumn": "recorded_at",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "2 years",
        "compressionPolicy": "compress chunks older than 30 days",
        "indexes": [
          {
            "indexName": "idx_lead_conversion_metric_recorded_at",
            "columns": [
              "recorded_at"
            ],
            "purpose": "Índice primário de tempo exigido pelo hypertable TimescaleDB para particionamento e queries de range temporal.",
            "unique": false
          },
          {
            "indexName": "idx_lead_conversion_metric_corretor_id_recorded_at",
            "columns": [
              "corretor_id",
              "recorded_at"
            ],
            "purpose": "Suporta filtros por corretor com range temporal para isolamento RBAC (rule-rbac-data-isolation) e análise de performance individual.",
            "unique": false
          },
          {
            "indexName": "idx_lead_conversion_metric_lead_id_recorded_at",
            "columns": [
              "lead_id",
              "recorded_at"
            ],
            "purpose": "Suporta lookup de histórico de transições de um lead específico ao longo do tempo.",
            "unique": false
          },
          {
            "indexName": "idx_lead_conversion_metric_from_to_stage_recorded_at",
            "columns": [
              "from_stage",
              "to_stage",
              "recorded_at"
            ],
            "purpose": "Suporta análise de funil por par de etapas (ex: proposta → fechado) em janelas temporais para o Dashboard Operacional.",
            "unique": false
          }
        ]
      },
      "rulesApplied": [
        "rule-lead-stage-transition",
        "rule-rbac-data-isolation"
      ]
    },
    "defsPlan": {
      "fileName": "tables/leadConversionMetric.defs.ts",
      "exportName": "leadConversionMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default leadConversionMetricTableDefinition;
