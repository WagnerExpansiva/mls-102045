/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_1_external/propertyMetrics.defs.ts" enhancement="_blank"/>

export const propertyMetricsTable = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "propertyMetrics",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 43,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "propertyMetrics",
      "tableName": "property_metrics",
      "moduleId": "propertyFlowCrm",
      "title": "Métricas de Imóveis",
      "purpose": "Acompanhar o volume e status dos imóveis cadastrados ao longo do tempo",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_time",
      "columns": [
        {
          "name": "event_time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Momento do evento que alimenta a métrica"
        },
        {
          "name": "broker_id",
          "type": "uuid",
          "nullable": true,
          "description": "Corretor responsável pelo imóvel"
        },
        {
          "name": "property_status",
          "type": "text",
          "nullable": true,
          "description": "Status atual do imóvel"
        },
        {
          "name": "properties_created",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de imóveis cadastrados"
        },
        {
          "name": "properties_archived",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de imóveis inativados"
        }
      ],
      "dimensions": [
        {
          "dimensionId": "brokerId",
          "column": "broker_id",
          "type": "uuid",
          "description": "Corretor responsável pelo imóvel"
        },
        {
          "dimensionId": "propertyStatus",
          "column": "property_status",
          "type": "string",
          "description": "Status atual do imóvel"
        }
      ],
      "measures": [
        {
          "measureId": "propertiesCreated",
          "column": "properties_created",
          "aggregation": "sum",
          "unit": "count",
          "description": "Quantidade de imóveis cadastrados"
        },
        {
          "measureId": "propertiesArchived",
          "column": "properties_archived",
          "aggregation": "sum",
          "unit": "count",
          "description": "Quantidade de imóveis inativados"
        }
      ],
      "sourceWriteEvents": [
        "createProperty",
        "updateProperty",
        "archiveProperty"
      ],
      "hypertable": {
        "timeColumn": "event_time",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "1 year",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "property_metrics_event_time_idx",
            "columns": [
              "event_time"
            ],
            "purpose": "Ordenação e filtros por tempo"
          },
          {
            "indexName": "property_metrics_broker_time_idx",
            "columns": [
              "broker_id",
              "event_time"
            ],
            "purpose": "Consulta por corretor e janela temporal"
          },
          {
            "indexName": "property_metrics_status_time_idx",
            "columns": [
              "property_status",
              "event_time"
            ],
            "purpose": "Consulta por status e janela temporal"
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "createPropertyUsecase",
          "updatePropertyUsecase",
          "archivePropertyUsecase"
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
        "rulePropertyStatus"
      ]
    },
    "defsPlan": {
      "fileName": "tables/propertyMetrics.defs.ts",
      "exportName": "propertyMetricsTable",
      "saveAsDefs": true
    }
  }
} as const;

export default propertyMetricsTable;
