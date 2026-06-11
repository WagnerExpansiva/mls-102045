/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/activePropertiesMetric.defs.ts" enhancement="_blank"/>

export const activePropertiesMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "activePropertiesMetric",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 45,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "activePropertiesMetric",
      "tableName": "active_properties_metric",
      "title": "Imóveis Ativos",
      "moduleId": "propertyFlowCrm",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "purpose": "Acompanhar a evolução da quantidade de imóveis por status ao longo do tempo, permitindo ao administrador visualizar o estoque de imóveis disponíveis, reservados, vendidos e alugados, identificando gargalos e oportunidades de reposição.",
      "timeColumn": "recorded_at",
      "columns": [
        {
          "name": "recorded_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Instante em que o snapshot da métrica foi registrado. Coluna de tempo do hypertable TimescaleDB."
        },
        {
          "name": "property_id",
          "type": "uuid",
          "nullable": false,
          "description": "Identificador do imóvel (dimensão). FK derivada da entidade Property (MDM)."
        },
        {
          "name": "status",
          "type": "text",
          "nullable": false,
          "description": "Status atual do imóvel no momento do registro (disponivel, reservado, vendido, alugado, inativo)."
        },
        {
          "name": "corretor_id",
          "type": "uuid",
          "nullable": true,
          "description": "Identificador do corretor responsável pelo imóvel. FK derivada do relacionamento ontológico rel-property-corretor (Property → Corretor). Nullable pois o imóvel pode não ter corretor atribuído."
        },
        {
          "name": "property_count",
          "type": "integer",
          "nullable": false,
          "default": 1,
          "description": "Quantidade de imóveis representada por este registro. Medida principal agregada por SUM."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "propertyId",
          "column": "property_id",
          "type": "uuid",
          "description": "Identificador do imóvel"
        },
        {
          "dimensionId": "status",
          "column": "status",
          "type": "text",
          "description": "Status atual do imóvel"
        },
        {
          "dimensionId": "corretorId",
          "column": "corretor_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship rel-property-corretor (Property -> Corretor)"
        }
      ],
      "measures": [
        {
          "measureId": "propertyCount",
          "column": "property_count",
          "aggregation": "sum",
          "unit": "imóveis",
          "description": "Quantidade de imóveis agregada por SUM para os filtros de dimensão aplicados."
        }
      ],
      "sourceWriteEvents": [
        "property.created",
        "property.status.updated",
        "propertyStatusTransitionEvent.created"
      ],
      "rulesApplied": [
        "rule-property-status-transition",
        "rule-rbac-data-isolation"
      ],
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "propertyStatusWorkflow",
          "action-update-property-status",
          "action-create-deal",
          "action-advance-deal-stage",
          "action-mark-deal-lost"
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
            "indexName": "idx_apm_recorded_at",
            "columns": [
              "recorded_at"
            ],
            "purpose": "Índice primário de tempo exigido pelo hypertable TimescaleDB. Suporta queries de range temporal para todos os widgets do Dashboard Operacional.",
            "unique": false
          },
          {
            "indexName": "idx_apm_property_id_recorded_at",
            "columns": [
              "property_id",
              "recorded_at"
            ],
            "purpose": "Lookup de série temporal por imóvel específico. Usado para detalhar a evolução de status de um imóvel ao longo do tempo.",
            "unique": false
          },
          {
            "indexName": "idx_apm_status_recorded_at",
            "columns": [
              "status",
              "recorded_at"
            ],
            "purpose": "Filtro por status do imóvel com range temporal. Suporta o widget de Imóveis Ativos no Dashboard (ex: contagem de 'disponivel' no último mês).",
            "unique": false
          },
          {
            "indexName": "idx_apm_corretor_id_recorded_at",
            "columns": [
              "corretor_id",
              "recorded_at"
            ],
            "purpose": "Filtro por corretor com range temporal. Suporta isolamento de dados por perfil (rule-rbac-data-isolation): Corretor visualiza apenas imóveis atribuídos a ele.",
            "unique": false
          }
        ]
      }
    },
    "defsPlan": {
      "fileName": "tables/activePropertiesMetric.defs.ts",
      "exportName": "activePropertiesMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default activePropertiesMetricTableDefinition;
