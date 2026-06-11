/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/dealPipelineMetric.defs.ts" enhancement="_blank"/>

export const dealPipelineMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "dealPipelineMetric",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 47,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "dealPipelineMetric",
      "tableName": "deal_pipeline_metric",
      "title": "Pipeline de Fechamentos",
      "moduleId": "propertyFlowCrm",
      "purpose": "Rastrear o volume e progresso de negócios no pipeline de vendas ao longo do tempo, permitindo previsão de receita, identificação de negócios parados e otimização do funil de fechamento.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "recorded_at",
      "columns": [
        {
          "name": "recorded_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do registro da métrica. Coluna de tempo principal do hypertable TimescaleDB."
        },
        {
          "name": "deal_id",
          "type": "uuid",
          "nullable": false,
          "description": "Identificador do negócio (Deal). Dimensão FK derivada da relação ontológica Deal → Deal."
        },
        {
          "name": "lead_id",
          "type": "uuid",
          "nullable": false,
          "description": "Lead vinculado ao negócio. Dimensão FK derivada da relação ontológica Deal → Lead (rel-deal-lead)."
        },
        {
          "name": "property_id",
          "type": "uuid",
          "nullable": false,
          "description": "Imóvel vinculado ao negócio. Dimensão FK derivada da relação ontológica Deal → Property (rel-deal-property)."
        },
        {
          "name": "corretor_id",
          "type": "uuid",
          "nullable": false,
          "description": "Corretor responsável pelo negócio. Dimensão FK derivada da relação ontológica Deal → Corretor (rel-deal-corretor)."
        },
        {
          "name": "stage",
          "type": "text",
          "nullable": false,
          "description": "Etapa atual do negócio no funil de fechamento (proposta, negociacao, contrato, fechado, perdido)."
        },
        {
          "name": "deal_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de negócios registrados neste ponto temporal. Medida principal agregada por sum."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "dealId",
          "column": "deal_id",
          "type": "uuid",
          "description": "Identificador do negócio"
        },
        {
          "dimensionId": "leadId",
          "column": "lead_id",
          "type": "uuid",
          "description": "Lead vinculado ao negócio — FK da relação ontológica Deal → Lead (rel-deal-lead)"
        },
        {
          "dimensionId": "propertyId",
          "column": "property_id",
          "type": "uuid",
          "description": "Imóvel vinculado ao negócio — FK da relação ontológica Deal → Property (rel-deal-property)"
        },
        {
          "dimensionId": "corretorId",
          "column": "corretor_id",
          "type": "uuid",
          "description": "Corretor responsável pelo negócio — FK da relação ontológica Deal → Corretor (rel-deal-corretor)"
        },
        {
          "dimensionId": "stage",
          "column": "stage",
          "type": "text",
          "description": "Etapa atual do negócio no funil de fechamento"
        }
      ],
      "measures": [
        {
          "measureId": "dealCount",
          "column": "deal_count",
          "aggregation": "sum",
          "unit": "negócios",
          "description": "Quantidade de negócios registrados no ponto temporal"
        }
      ],
      "sourceWriteEvents": [
        "deal.created",
        "deal.stage.updated",
        "dealStageTransitionEvent.created"
      ],
      "rulesApplied": [
        "rule-deal-stage-transition",
        "rule-deal-requires-property-and-lead",
        "rule-rbac-data-isolation"
      ],
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "dealStageWorkflow",
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
            "indexName": "idx_deal_pipeline_metric_recorded_at",
            "columns": [
              "recorded_at"
            ],
            "purpose": "Índice primário de tempo exigido pelo hypertable TimescaleDB para particionamento e queries de range temporal.",
            "unique": false
          },
          {
            "indexName": "idx_deal_pipeline_metric_deal_id_recorded_at",
            "columns": [
              "deal_id",
              "recorded_at"
            ],
            "purpose": "Lookup de série temporal por negócio específico. Usado pelo Rastreador de Negócios e pelo dealStageWorkflow.",
            "unique": false
          },
          {
            "indexName": "idx_deal_pipeline_metric_corretor_id_recorded_at",
            "columns": [
              "corretor_id",
              "recorded_at"
            ],
            "purpose": "Filtro por corretor com range temporal para isolamento RBAC (rule-rbac-data-isolation) e Dashboard Operacional filtrado por corretorId.",
            "unique": false
          },
          {
            "indexName": "idx_deal_pipeline_metric_stage_recorded_at",
            "columns": [
              "stage",
              "recorded_at"
            ],
            "purpose": "Filtro por etapa do funil com range temporal para o widget de funil de negócios no Dashboard Operacional.",
            "unique": false
          },
          {
            "indexName": "idx_deal_pipeline_metric_lead_id_recorded_at",
            "columns": [
              "lead_id",
              "recorded_at"
            ],
            "purpose": "Lookup de métricas de pipeline associadas a um lead específico. Suporta LeadConversionMetric e tela Detalhe do Lead.",
            "unique": false
          },
          {
            "indexName": "idx_deal_pipeline_metric_property_id_recorded_at",
            "columns": [
              "property_id",
              "recorded_at"
            ],
            "purpose": "Lookup de negócios associados a um imóvel específico ao longo do tempo. Suporta tela Detalhe do Imóvel e análise de giro de imóveis.",
            "unique": false
          }
        ]
      }
    },
    "defsPlan": {
      "fileName": "tables/dealPipelineMetric.defs.ts",
      "exportName": "dealPipelineMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default dealPipelineMetricTableDefinition;
