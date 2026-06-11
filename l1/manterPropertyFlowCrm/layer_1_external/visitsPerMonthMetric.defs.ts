/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/visitsPerMonthMetric.defs.ts" enhancement="_blank"/>

export const visitsPerMonthMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "visitsPerMonthMetric",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 49,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "visitsPerMonthMetric",
      "tableName": "visits_per_month_metric",
      "title": "Visitas Realizadas no Mês",
      "moduleId": "propertyFlowCrm",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "purpose": "Acompanhar o agendamento, conclusão e cancelamento de visitas ao longo do tempo, permitindo avaliar a produtividade dos corretores e o engajamento dos leads por imóvel.",
      "timeColumn": "recorded_at",
      "columns": [
        {
          "name": "recorded_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do registro da métrica. Coluna de tempo do hypertable TimescaleDB."
        },
        {
          "name": "visit_id",
          "type": "uuid",
          "nullable": false,
          "description": "Identificador da visita. Dimensão FK derivada da entidade Visit."
        },
        {
          "name": "property_id",
          "type": "uuid",
          "nullable": false,
          "description": "Imóvel visitado. Dimensão FK derivada do relacionamento rel-visit-property (Visit → Property)."
        },
        {
          "name": "lead_id",
          "type": "uuid",
          "nullable": false,
          "description": "Lead que agendou a visita. Dimensão FK derivada do relacionamento rel-visit-lead (Visit → Lead)."
        },
        {
          "name": "corretor_id",
          "type": "uuid",
          "nullable": false,
          "description": "Corretor responsável pela visita. Dimensão FK derivada do relacionamento rel-visit-corretor (Visit → Corretor)."
        },
        {
          "name": "status",
          "type": "text",
          "nullable": false,
          "description": "Status atual da visita no momento do registro (agendada, confirmada, realizada, cancelada, reagendada)."
        },
        {
          "name": "visit_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Total de visitas contabilizadas neste registro. Medida agregável via SUM."
        },
        {
          "name": "completed_visit_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Visitas realizadas com sucesso (status = realizada). Medida agregável via SUM."
        },
        {
          "name": "cancelled_visit_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Visitas canceladas (status = cancelada). Medida agregável via SUM."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "visitId",
          "column": "visit_id",
          "type": "uuid",
          "description": "Identificador da visita"
        },
        {
          "dimensionId": "propertyId",
          "column": "property_id",
          "type": "uuid",
          "description": "Imóvel visitado. FK do relacionamento rel-visit-property (Visit → Property)."
        },
        {
          "dimensionId": "leadId",
          "column": "lead_id",
          "type": "uuid",
          "description": "Lead que agendou a visita. FK do relacionamento rel-visit-lead (Visit → Lead)."
        },
        {
          "dimensionId": "corretorId",
          "column": "corretor_id",
          "type": "uuid",
          "description": "Corretor responsável pela visita. FK do relacionamento rel-visit-corretor (Visit → Corretor)."
        },
        {
          "dimensionId": "status",
          "column": "status",
          "type": "text",
          "description": "Status atual da visita"
        }
      ],
      "measures": [
        {
          "measureId": "visitCount",
          "column": "visit_count",
          "aggregation": "sum",
          "unit": "visitas",
          "description": "Total de visitas"
        },
        {
          "measureId": "completedVisitCount",
          "column": "completed_visit_count",
          "aggregation": "sum",
          "unit": "visitas",
          "description": "Visitas realizadas com sucesso"
        },
        {
          "measureId": "cancelledVisitCount",
          "column": "cancelled_visit_count",
          "aggregation": "sum",
          "unit": "visitas",
          "description": "Visitas canceladas"
        }
      ],
      "sourceWriteEvents": [
        "visit.created",
        "visit.status.updated",
        "visitStatusTransitionEvent.created"
      ],
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "visitLifecycleWorkflow",
          "action-schedule-visit",
          "action-update-visit-status"
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
            "indexName": "idx_visits_per_month_metric_recorded_at",
            "columns": [
              "recorded_at"
            ],
            "purpose": "Índice primário de tempo exigido pelo hypertable TimescaleDB. Suporta filtros por período (dia, semana, mês) no Dashboard Operacional.",
            "unique": false
          },
          {
            "indexName": "idx_visits_per_month_metric_corretor_id_recorded_at",
            "columns": [
              "corretor_id",
              "recorded_at"
            ],
            "purpose": "Filtro por corretor + período para isolamento RBAC (rule-rbac-data-isolation) e análise de produtividade individual.",
            "unique": false
          },
          {
            "indexName": "idx_visits_per_month_metric_property_id_recorded_at",
            "columns": [
              "property_id",
              "recorded_at"
            ],
            "purpose": "Filtro por imóvel + período para análise de demanda por propriedade.",
            "unique": false
          },
          {
            "indexName": "idx_visits_per_month_metric_lead_id_recorded_at",
            "columns": [
              "lead_id",
              "recorded_at"
            ],
            "purpose": "Filtro por lead + período para análise de engajamento do lead ao longo do tempo.",
            "unique": false
          },
          {
            "indexName": "idx_visits_per_month_metric_visit_id",
            "columns": [
              "visit_id"
            ],
            "purpose": "Lookup direto por visita para upserts e deduplicação de registros de métrica.",
            "unique": false
          },
          {
            "indexName": "idx_visits_per_month_metric_status_recorded_at",
            "columns": [
              "status",
              "recorded_at"
            ],
            "purpose": "Filtro por status + período para agregações de visitas realizadas vs. canceladas no Dashboard Operacional.",
            "unique": false
          }
        ]
      },
      "rulesApplied": [
        "rule-visit-no-conflict",
        "rule-visit-requires-property-lead-corretor",
        "rule-rbac-data-isolation"
      ]
    },
    "defsPlan": {
      "fileName": "tables/visitsPerMonthMetric.defs.ts",
      "exportName": "visitsPerMonthMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default visitsPerMonthMetricTableDefinition;
