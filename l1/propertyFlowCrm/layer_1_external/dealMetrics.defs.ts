/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_1_external/dealMetrics.defs.ts" enhancement="_blank"/>

export const dealMetricsDefs = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "dealMetrics",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 46,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "dealMetrics",
      "tableName": "deal_metrics",
      "moduleId": "propertyFlowCrm",
      "title": "Métricas de Negócios",
      "purpose": "Acompanhar a criação e evolução de propostas e negócios",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_time",
      "columns": [
        {
          "name": "event_time",
          "type": "timestamptz",
          "nullable": false,
          "default": "now()",
          "description": "Momento do evento de métrica"
        },
        {
          "name": "broker_id",
          "type": "uuid",
          "nullable": false,
          "description": "Corretor responsável pelo negócio"
        },
        {
          "name": "deal_stage",
          "type": "text",
          "nullable": false,
          "description": "Etapa atual do negócio"
        },
        {
          "name": "property_id",
          "type": "uuid",
          "nullable": false,
          "description": "Imóvel vinculado ao negócio"
        },
        {
          "name": "deals_created",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Negócios criados"
        },
        {
          "name": "deal_stage_transitions",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Transições de etapa do negócio"
        }
      ],
      "dimensions": [
        {
          "dimensionId": "brokerId",
          "column": "broker_id",
          "type": "uuid",
          "description": "Corretor responsável pelo negócio"
        },
        {
          "dimensionId": "dealStage",
          "column": "deal_stage",
          "type": "string",
          "description": "Etapa atual do negócio"
        },
        {
          "dimensionId": "propertyId",
          "column": "property_id",
          "type": "uuid",
          "description": "Imóvel vinculado ao negócio"
        }
      ],
      "measures": [
        {
          "measureId": "dealsCreated",
          "column": "deals_created",
          "aggregation": "sum",
          "unit": "count",
          "description": "Negócios criados"
        },
        {
          "measureId": "dealStageTransitions",
          "column": "deal_stage_transitions",
          "aggregation": "sum",
          "unit": "count",
          "description": "Transições de etapa do negócio"
        }
      ],
      "sourceWriteEvents": [
        "createDeal",
        "updateDealStage"
      ],
      "hypertable": {
        "timeColumn": "event_time",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "1 year",
        "indexes": [
          {
            "indexName": "deal_metrics_event_time_idx",
            "columns": [
              "event_time"
            ],
            "purpose": "Consulta temporal por janela"
          },
          {
            "indexName": "deal_metrics_broker_time_idx",
            "columns": [
              "broker_id",
              "event_time"
            ],
            "purpose": "Filtros por corretor em série temporal"
          },
          {
            "indexName": "deal_metrics_stage_time_idx",
            "columns": [
              "deal_stage",
              "event_time"
            ],
            "purpose": "Filtros por etapa em série temporal"
          },
          {
            "indexName": "deal_metrics_property_time_idx",
            "columns": [
              "property_id",
              "event_time"
            ],
            "purpose": "Filtros por imóvel em série temporal"
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "createDealUsecase",
          "updateDealStageUsecase"
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
      "rulesApplied": [
        "ruleDealRequiresProperty",
        "ruleDealStageTransition"
      ]
    },
    "defsPlan": {
      "fileName": "tables/dealMetrics.defs.ts",
      "exportName": "dealMetricsDefs",
      "saveAsDefs": true
    }
  }
} as const;

export default dealMetricsDefs;
