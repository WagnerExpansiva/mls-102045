/// <mls fileReference="_102045_/l5/propertyFlowCrm/process.defs.ts" enhancement="_blank"/>

export const propertyFlowCrmProcess = {
  "schemaVersion": "2026-06-08",
  "moduleName": "propertyFlowCrm",
  "runs": [
    {
      "runId": "newSolution",
      "kind": "newSolution",
      "startedAt": "2026-06-10T15:15:24.368Z",
      "finishedAt": "2026-06-10T15:15:24.368Z",
      "initialPrompt": "um app profissional chamado PropertyFlowCRM para imobiliárias e corretores.\nEntidades principais: Imóvel (endereço, tipo, preço, status, características, fotos mock), Lead/Cliente, Visita/Agendamento, Negócio/Proposta (status, valor, imóvel), Corretor.\nTelas chave: Dashboard (imóveis ativos, leads do mês, pipeline de fechamentos), CRUD de imóveis com busca, Pipeline de leads (kanban ou lista), Agendador de visitas, Rastreador de negócios por etapas.\nFuncionalidade LLM: IA que gera descrição do imóvel a partir de bullets ou classifica lead como \"quente/morno/frio\" a partir de anotações e sugere próxima mensagem de follow-up.\nFoco: Gestão de imóveis + leads + coordenação de visitas — específico para corretagem imobiliária.\nlinguagens: 'en' e 'pt-br'",
      "userLanguage": "pt-BR",
      "decisions": [
        {
          "decisionId": "decisionAddLeadInteractionMdm",
          "title": "Adicionar MDM de Interação com Lead",
          "decision": "Incluir leadInteractionMdm no plano de artefatos MDM.",
          "reason": "Correção do erro MISSING_LEADINTERACTION_MDM: a entidade LeadInteraction é do tipo transaction com ownership moduleOwned e é referenciada por registerInteractionUsecase e agentes de classificação, necessitando de MDM correspondente para persistência adequada.",
          "affectedArtifacts": [
            "leadInteractionMdm",
            "LeadInteraction"
          ],
          "revisedBy": "agentPlanMDM",
          "revisedAt": "2026-06-10T15:15:24.368Z",
          "revisedScope": {
            "mdmDomains": [
              {
                "domainId": "property",
                "masterEntities": [
                  "Property"
                ]
              },
              {
                "domainId": "lead",
                "masterEntities": [
                  "Lead"
                ]
              },
              {
                "domainId": "broker",
                "masterEntities": [
                  "Broker"
                ]
              }
            ]
          }
        },
        {
          "decisionId": "decisionAddMetricDefinitions",
          "title": "Adicionar Definições de Métricas Individuais",
          "decision": "Incluir definições explícitas das métricas activePropertiesMetric, monthlyLeadsMetric, dealsPipelineMetric e scheduledVisitsMetric como entradas em metricTables.",
          "reason": "Correção do erro MISSING_METRIC_DEFINITIONS: a tabela crmMetricsTable referenciava métricas não definidas no blueprint. Cada métrica agora possui definição com fórmula de cálculo e entidade fonte.",
          "affectedArtifacts": [
            "activePropertiesMetric",
            "monthlyLeadsMetric",
            "dealsPipelineMetric",
            "scheduledVisitsMetric",
            "crmMetricsTable",
            "agencyManagerMetricDashboard"
          ]
        },
        {
          "decisionId": "decisionDeferDetailPages",
          "title": "Adiar Páginas de Detalhe para Versão Futura",
          "decision": "Manter páginas de detalhe de Lead, Deal e Visit como itens diferidos para versão futura.",
          "reason": "Os avisos MISSING_LEAD_DETAIL_PAGE, MISSING_DEAL_DETAIL_PAGE e MISSING_VISIT_DETAIL_PAGE são melhorias recomendadas, não erros bloqueantes. As páginas de pipeline/kanban e agendador atendem ao MVP. Detalhes podem ser acessados via modais ou expansão inline.",
          "affectedArtifacts": [
            "leadsPipelinePage",
            "dealsTrackerPage",
            "visitSchedulerPage"
          ]
        },
        {
          "decisionId": "decisionDeferBrokerPerformanceMetrics",
          "title": "Adiar Métricas de Desempenho por Corretor",
          "decision": "Manter métricas específicas por corretor como item diferido para a capacidade monitorTeamPerformance (priority: soon).",
          "reason": "O aviso MISSING_BROKER_PERFORMANCE_METRICS refere-se a uma capacidade já marcada como 'soon'. As métricas por corretor serão expandidas quando a capacidade for implementada.",
          "affectedArtifacts": [
            "crmMetricsTable",
            "agencyManagerMetricDashboard"
          ]
        }
      ],
      "deferredItems": [
        {
          "id": "deferredLeadDetailPage",
          "title": "Página de Detalhe do Lead",
          "description": "Página para visualização completa do lead com histórico de interações, visitas e negócios associados. Recomendada para melhorar a experiência do corretor ao gerenciar leads complexos."
        },
        {
          "id": "deferredDealDetailPage",
          "title": "Página de Detalhe do Negócio",
          "description": "Página para visualização completa do negócio com histórico de negociação, valores propostos/aceitos e documentação. Recomendada para acompanhamento detalhado de propostas."
        },
        {
          "id": "deferredVisitDetailPage",
          "title": "Página de Detalhe da Visita",
          "description": "Página ou modal para registro detalhado de feedback e avaliação após a visita. Recomendada para captura estruturada de impressões do lead sobre o imóvel."
        },
        {
          "id": "deferredBrokerPerformanceMetrics",
          "title": "Métricas de Desempenho por Corretor",
          "description": "Métricas específicas por corretor incluindo taxa de conversão, visitas realizadas, negócios fechados e tempo médio de fechamento. Planejadas para a capacidade monitorTeamPerformance (priority: soon)."
        },
        {
          "id": "deferredConversionRateMetric",
          "title": "Métrica de Taxa de Conversão",
          "description": "Indicador de proporção de leads convertidos em negócios fechados. Aceita com prioridade 'soon' nas decisões de implementação."
        }
      ],
      "openDetails": [
        {
          "title": "Provedor e modelo de LLM",
          "description": "Qual provedor de LLM e modelo específico serão utilizados para geração de descrições de imóveis, classificação de leads e sugestões de follow-up?"
        },
        {
          "title": "Visualização do pipeline de leads",
          "description": "O pipeline de leads deve ser implementado como Kanban, lista, ou ambos os modos devem ser suportados?"
        },
        {
          "title": "Armazenamento de fotos mock",
          "description": "Qual a estratégia para as fotos mock dos imóveis: URLs externas, placeholders gerados, ou upload para storage interno?"
        }
      ],
      "healthReport": {
        "summary": {
          "passed": false,
          "errorCount": 13,
          "warningCount": 0
        },
        "issues": [
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow dealProgression references unknown table dealPipelineMetrics",
            "path": "workflow.dealProgression",
            "evidence": [
              "persistenceRefs inclui 'dealPipelineMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow dealProgression references unknown table crmActivityMetrics",
            "path": "workflow.dealProgression",
            "evidence": [
              "persistenceRefs inclui 'crmActivityMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow leadFollowUp references unknown table leadMetrics",
            "path": "workflow.leadFollowUp",
            "evidence": [
              "persistenceRefs inclui 'leadMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow leadFollowUp references unknown table crmActivityMetrics",
            "path": "workflow.leadFollowUp",
            "evidence": [
              "persistenceRefs inclui 'crmActivityMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow leadQualification references unknown table leadMetrics",
            "path": "workflow.leadQualification",
            "evidence": [
              "persistenceRefs inclui 'leadMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow leadQualification references unknown table crmActivityMetrics",
            "path": "workflow.leadQualification",
            "evidence": [
              "persistenceRefs inclui 'crmActivityMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow visitLifecycle references unknown table visitMetrics",
            "path": "workflow.visitLifecycle",
            "evidence": [
              "persistenceRefs inclui 'visitMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow visitLifecycle references unknown table crmActivityMetrics",
            "path": "workflow.visitLifecycle",
            "evidence": [
              "persistenceRefs inclui 'crmActivityMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow visitReminder references unknown table visitMetrics",
            "path": "workflow.visitReminder",
            "evidence": [
              "persistenceRefs inclui 'visitMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRef.unknown",
            "message": "workflow visitReminder references unknown table crmActivityMetrics",
            "path": "workflow.visitReminder",
            "evidence": [
              "persistenceRefs inclui 'crmActivityMetrics' mas este é um metricTable, não uma tabela transacional em tables[]"
            ]
          },
          {
            "severity": "error",
            "code": "horizontal.artifact.missing",
            "message": "approved horizontal module i18nModule produced no plan item/artifact",
            "path": "approvedArtifacts.horizontalModules[0]",
            "evidence": [
              "horizontalModules count=3 mas nenhum artefato de i18nModule foi encontrado no plano"
            ]
          },
          {
            "severity": "error",
            "code": "horizontal.artifact.missing",
            "message": "approved horizontal module authorizationModule produced no plan item/artifact",
            "path": "approvedArtifacts.horizontalModules[1]",
            "evidence": [
              "horizontalModules count=3 mas nenhum artefato de authorizationModule foi encontrado no plano"
            ]
          },
          {
            "severity": "error",
            "code": "horizontal.artifact.missing",
            "message": "approved horizontal module notificationModule produced no plan item/artifact",
            "path": "approvedArtifacts.horizontalModules[2]",
            "evidence": [
              "horizontalModules count=3 mas nenhum artefato de notificationModule foi encontrado no plano"
            ]
          }
        ],
        "checklistResults": null,
        "readyToSaveDefs": false
      },
      "nextSteps": []
    }
  ]
} as const;

export default propertyFlowCrmProcess;
