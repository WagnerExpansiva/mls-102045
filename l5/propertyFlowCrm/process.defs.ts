/// <mls fileReference="_102045_/l5/propertyFlowCrm/process.defs.ts" enhancement="_blank"/>

export const propertyFlowCrmProcess = {
  "schemaVersion": "2026-06-08",
  "moduleName": "propertyFlowCrm",
  "runs": [
    {
      "runId": "newSolution",
      "kind": "newSolution",
      "startedAt": "2026-06-10T01:35:37.149Z",
      "finishedAt": "2026-06-10T01:38:18.425Z",
      "initialPrompt": "um app profissional chamado PropertyFlowCRM para imobiliárias e corretores.\nEntidades principais: Imóvel (endereço, tipo, preço, status, características, fotos mock), Lead/Cliente, Visita/Agendamento, Negócio/Proposta (status, valor, imóvel), Corretor.\nTelas chave: Dashboard (imóveis ativos, leads do mês, pipeline de fechamentos), CRUD de imóveis com busca, Pipeline de leads (kanban ou lista), Agendador de visitas, Rastreador de negócios por etapas.\nFuncionalidade LLM: IA que gera descrição do imóvel a partir de bullets ou classifica lead como \"quente/morno/frio\" a partir de anotações e sugere próxima mensagem de follow-up.\nFoco: Gestão de imóveis + leads + coordenação de visitas — específico para corretagem imobiliária.\nlinguagens: 'en' e 'pt-br'",
      "userLanguage": "pt-BR",
      "decisions": [
        {
          "decisionId": "mdmCoreImoveisLeadsVisitasNegociosCorretores",
          "title": "MDM central de Imóvel, Lead/Cliente, Visita, Negócio e Corretor",
          "decision": "accepted",
          "reason": "As entidades principais exigem consistência e chaves comuns para CRUD, pipeline e agendamentos.",
          "affectedArtifacts": [
            "realEstateMdm"
          ]
        },
        {
          "decisionId": "usecaseEntityCoreOperacoesCrm",
          "title": "Casos de uso operacionais do CRM",
          "decision": "accepted",
          "reason": "O escopo possui operações de escrita, atualização de status e sinais de backend que precisam de fluxo de caso de uso.",
          "affectedArtifacts": [
            "createPropertyUsecase",
            "updateLeadStageUsecase",
            "scheduleVisitUsecase",
            "updateDealStageUsecase"
          ]
        },
        {
          "decisionId": "workflowLeadStage",
          "title": "Workflow de estágios de lead (kanban)",
          "decision": "accepted",
          "reason": "O pipeline de leads exige controle de etapas e movimentação no kanban.",
          "affectedArtifacts": [
            "leadStageWorkflow"
          ]
        },
        {
          "decisionId": "workflowDealStage",
          "title": "Workflow de etapas do negócio",
          "decision": "accepted",
          "reason": "O rastreador de negócios depende de etapas bem definidas.",
          "affectedArtifacts": [
            "dealStageWorkflow"
          ]
        },
        {
          "decisionId": "workflowVisitScheduling",
          "title": "Workflow de agendamento de visitas",
          "decision": "accepted",
          "reason": "O agendador de visitas exige fluxo operacional e status.",
          "affectedArtifacts": [
            "visitSchedulingWorkflow"
          ]
        },
        {
          "decisionId": "pageDashboardGestor",
          "title": "Dashboard do gestor",
          "decision": "accepted",
          "reason": "Tela chave solicitada para acompanhamento executivo.",
          "affectedArtifacts": [
            "dashboardPage",
            "adminMetricsPage"
          ]
        },
        {
          "decisionId": "pageImoveisListaBusca",
          "title": "Imóveis - lista e busca",
          "decision": "accepted",
          "reason": "Fluxo principal de navegação de imóveis.",
          "affectedArtifacts": [
            "propertiesListPage"
          ]
        },
        {
          "decisionId": "pageImovelForm",
          "title": "Imóvel - cadastro/edição",
          "decision": "accepted",
          "reason": "CRUD de imóveis é requisito central do MVP.",
          "affectedArtifacts": [
            "propertyFormPage"
          ]
        },
        {
          "decisionId": "pageLeadsPipelineKanban",
          "title": "Pipeline de leads (kanban)",
          "decision": "accepted",
          "reason": "O pipeline foi definido como kanban no esclarecimento.",
          "affectedArtifacts": [
            "leadsPipelinePage"
          ]
        },
        {
          "decisionId": "pageVisitsScheduler",
          "title": "Agendador de visitas",
          "decision": "accepted",
          "reason": "Gestão de visitas é um pilar do escopo.",
          "affectedArtifacts": [
            "visitsSchedulerPage"
          ]
        },
        {
          "decisionId": "pageDealsTracker",
          "title": "Rastreador de negócios por etapas",
          "decision": "accepted",
          "reason": "Acompanhar propostas até fechamento é tela chave.",
          "affectedArtifacts": [
            "dealsTrackerPage"
          ]
        },
        {
          "decisionId": "horizontalI18n",
          "title": "Internacionalização (pt-BR/en)",
          "decision": "accepted",
          "reason": "O produto precisa suportar dois idiomas desde o início.",
          "affectedArtifacts": [
            "i18nModule"
          ]
        },
        {
          "decisionId": "horizontalAuthRoles",
          "title": "Perfis e permissões",
          "decision": "accepted",
          "reason": "Há dois perfis distintos com necessidades diferentes.",
          "affectedArtifacts": [
            "authRolesModule"
          ]
        },
        {
          "decisionId": "metricTableCrmBasico",
          "title": "Tabela de métricas básicas do CRM",
          "decision": "accepted",
          "reason": "O dashboard inicial foi aceito e requer fonte de métricas.",
          "affectedArtifacts": [
            "metricTableCrmBasico"
          ]
        },
        {
          "decisionId": "gestorMetricDashboardCrmBasico",
          "title": "Dashboard de métricas do gestor",
          "decision": "accepted",
          "reason": "O escopo inclui dashboard inicial de métricas básicas.",
          "affectedArtifacts": [
            "metricDashboardCrmBasico"
          ]
        },
        {
          "decisionId": "agentAiDescricaoImovel",
          "title": "Agente IA de descrição de imóvel",
          "decision": "accepted",
          "reason": "A funcionalidade de IA foi solicitada como evolução do MVP.",
          "affectedArtifacts": [
            "aiPropertyDescriptionAgent"
          ]
        },
        {
          "decisionId": "agentAiQualificacaoLead",
          "title": "Agente IA de qualificação e follow-up",
          "decision": "accepted",
          "reason": "Recurso de IA depende de definição de provedor e políticas.",
          "affectedArtifacts": [
            "aiLeadQualificationAgent"
          ]
        }
      ],
      "deferredItems": [],
      "openDetails": [
        {
          "title": "Provedor e modelo de LLM",
          "description": "Qual provedor de LLM e modelo específico serão utilizados para as funcionalidades de IA no cliente?"
        },
        {
          "title": "Visualização do pipeline de leads",
          "description": "O pipeline de leads deve ser implementado como kanban, lista ou ambos os modos?"
        },
        {
          "title": "Integrações de calendário",
          "description": "O agendador de visitas precisa de integração com calendários externos (Google, Outlook) ou funciona apenas internamente?"
        },
        {
          "title": "Armazenamento de fotos mock",
          "description": "As fotos mock dos imóveis serão armazenadas como assets locais, base64 ou via serviço externo de imagens?"
        }
      ],
      "healthReport": {
        "summary": {
          "passed": false,
          "errorCount": 8,
          "warningCount": 4
        },
        "issues": [
          {
            "severity": "error",
            "code": "mdm.incomplete",
            "message": "MDM deve estar presente e completo; apenas mdmDomains foram fornecidos sem entidades/tabelas MDM.",
            "path": "mdmDomains",
            "evidence": [
              "mdmDomains: property, lead, broker",
              "tables: []"
            ]
          },
          {
            "severity": "error",
            "code": "metric.table.incomplete",
            "message": "Tabelas métricas precisam declarar timeColumn/hypertable/dimensions/measures/updatePolicy (updatedByLayer=layer_3_usecases).",
            "path": "metricTables.*",
            "evidence": [
              "metricTables apenas com metricTableId e storageEngine"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.persistenceRefs.invalid",
            "message": "workflow.persistenceRefs deve referenciar ids de tabelas existentes; encontrados ids inconsistentes com metricTableIds.",
            "path": "workflows[leadPipelineWorkflow|propertyLifecycleWorkflow|visitLifecycleWorkflow].persistenceRefs",
            "evidence": [
              "lead_metrics, property_metrics, visit_metrics não correspondem a leadMetrics/propertyMetrics/visitMetrics"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.taskConfig.missing",
            "message": "Workflows com createsTask=true devem ter taskConfig preenchido.",
            "path": "workflows.aiLeadQualificationWorkflow",
            "evidence": [
              "createsTask: true",
              "taskConfig ausente"
            ]
          },
          {
            "severity": "error",
            "code": "page.navigationRefs.missing",
            "message": "Toda página deve declarar navigationRefs (array, possivelmente vazio).",
            "path": "pages[*].navigationRefs",
            "evidence": [
              "navigationRefs ausente em todas as definições de página fornecidas"
            ]
          },
          {
            "severity": "error",
            "code": "pageInput.source.missing",
            "message": "Páginas de detalhe devem declarar o identificador externo com source apropriado (routeParam/previousStepResult/etc).",
            "path": "pages[propertyDetail|leadDetail|visitDetail].pageInputs",
            "evidence": [
              "pageInputs sem campo source"
            ]
          },
          {
            "severity": "error",
            "code": "metric.dashboard.bff.missing",
            "message": "Página de dashboard de métricas deve ler dados por BFF com usecaseRefs.",
            "path": "pages.managerDashboard.bffCommands",
            "evidence": [
              "bffCommands vazio",
              "usecase viewDashboard disponível"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.definition.index.mismatch",
            "message": "workflow.persistenceRefs deve refletir persistências de módulo usadas; alguns workflows usam métricas mas persistenceRefs estão vazios.",
            "path": "workflows[dealPipelineWorkflow].persistenceRefs",
            "evidence": [
              "metricRefs: dealMetrics",
              "persistenceRefs: []"
            ]
          },
          {
            "severity": "warning",
            "code": "page.def.missing",
            "message": "page propertyForm is in the index but has no definition",
            "path": "pageIndex.propertyForm",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "page.def.missing",
            "message": "page leadForm is in the index but has no definition",
            "path": "pageIndex.leadForm",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "page.def.missing",
            "message": "page visitForm is in the index but has no definition",
            "path": "pageIndex.visitForm",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "page.def.missing",
            "message": "page dealDetail is in the index but has no definition",
            "path": "pageIndex.dealDetail",
            "evidence": []
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
