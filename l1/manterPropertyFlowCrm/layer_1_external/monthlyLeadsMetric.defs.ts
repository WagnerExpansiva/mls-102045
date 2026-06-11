/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/monthlyLeadsMetric.defs.ts" enhancement="_blank"/>

export const monthlyLeadsMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "monthlyLeadsMetric",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 46,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "monthlyLeadsMetric",
      "tableName": "monthly_leads_metric",
      "title": "Leads do Mês",
      "moduleId": "propertyFlowCrm",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "purpose": "Monitorar a captação e distribuição de leads entre corretores ao longo do tempo, permitindo análise de volume por etapa do funil e por corretor responsável.",
      "timeColumn": "recorded_at",
      "columns": [
        {
          "name": "recorded_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do registro da métrica. Coluna de tempo principal do hypertable TimescaleDB."
        },
        {
          "name": "lead_id",
          "type": "uuid",
          "nullable": false,
          "description": "Identificador do lead. Dimensão FK derivada da entidade Lead (MDM)."
        },
        {
          "name": "corretor_id",
          "type": "uuid",
          "nullable": false,
          "description": "Corretor responsável pelo lead. Dimensão FK derivada do relacionamento ontológico rel-lead-corretor (Lead → Corretor)."
        },
        {
          "name": "stage",
          "type": "text",
          "nullable": false,
          "description": "Etapa atual do funil de leads (novo, contato, visita, proposta, fechado, perdido)."
        },
        {
          "name": "lead_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de leads registrados neste ponto temporal para a combinação de dimensões."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "leadId",
          "column": "lead_id",
          "type": "uuid",
          "description": "Identificador do lead"
        },
        {
          "dimensionId": "corretorId",
          "column": "corretor_id",
          "type": "uuid",
          "description": "Corretor responsável pelo lead. FK do relacionamento ontológico rel-lead-corretor (Lead → Corretor)."
        },
        {
          "dimensionId": "stage",
          "column": "stage",
          "type": "text",
          "description": "Etapa atual do funil de leads"
        }
      ],
      "measures": [
        {
          "measureId": "leadCount",
          "column": "lead_count",
          "aggregation": "sum",
          "unit": "leads",
          "description": "Quantidade de leads"
        }
      ],
      "sourceWriteEvents": [
        "lead.created",
        "lead.stage.updated",
        "leadStageTransitionEvent.created"
      ],
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "leadStageTransitionWorkflow",
          "action-create-lead",
          "action-move-lead-stage"
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
            "indexName": "idx_monthly_leads_metric_recorded_at",
            "columns": [
              "recorded_at"
            ],
            "purpose": "Índice primário de tempo exigido pelo hypertable TimescaleDB. Suporta filtros por período (mês, semana, dia) no Dashboard Operacional.",
            "unique": false
          },
          {
            "indexName": "idx_monthly_leads_metric_corretor_id_recorded_at",
            "columns": [
              "corretor_id",
              "recorded_at"
            ],
            "purpose": "Suporta isolamento de dados por corretor (rule-rbac-data-isolation) e consultas de volume de leads por corretor ao longo do tempo.",
            "unique": false
          },
          {
            "indexName": "idx_monthly_leads_metric_lead_id_recorded_at",
            "columns": [
              "lead_id",
              "recorded_at"
            ],
            "purpose": "Suporta lookup de série temporal de um lead específico para rastreamento de histórico no Pipeline Kanban e Detalhe do Lead.",
            "unique": false
          },
          {
            "indexName": "idx_monthly_leads_metric_stage_recorded_at",
            "columns": [
              "stage",
              "recorded_at"
            ],
            "purpose": "Suporta agregações por etapa do funil ao longo do tempo para o widget de Leads do Mês no Dashboard Operacional.",
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
      "fileName": "tables/monthlyLeadsMetric.defs.ts",
      "exportName": "monthlyLeadsMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default monthlyLeadsMetricTableDefinition;
