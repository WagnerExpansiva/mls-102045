/// <mls fileReference="_102045_/l5/propertyFlowCrm/process.defs.ts" enhancement="_blank"/>

export const propertyFlowCrmProcess = {
  "schemaVersion": "2026-06-08",
  "moduleName": "propertyFlowCrm",
  "runs": [
    {
      "runId": "newSolution",
      "kind": "newSolution",
      "startedAt": "2026-06-11T01:36:14.200Z",
      "initialPrompt": "um app profissional chamado PropertyFlowCRM para imobiliárias e corretores.\nEntidades principais: Imóvel (endereço, tipo, preço, status, características, fotos mock), Lead/Cliente, Visita/Agendamento, Negócio/Proposta (status, valor, imóvel), Corretor.\nTelas chave: Dashboard (imóveis ativos, leads do mês, pipeline de fechamentos), CRUD de imóveis com busca, Pipeline de leads (kanban ou lista), Agendador de visitas, Rastreador de negócios por etapas.\nFuncionalidade LLM: IA que gera descrição do imóvel a partir de bullets ou classifica lead como \"quente/morno/frio\" a partir de anotações e sugere próxima mensagem de follow-up.\nFoco: Gestão de imóveis + leads + coordenação de visitas — específico para corretagem imobiliária.\nlinguagens: 'en' e 'pt-br'",
      "userLanguage": "pt-BR",
      "decisions": [
        {
          "decisionId": "dec-visit-status-transition-event",
          "title": "Adição de VisitStatusTransitionEvent para rastreabilidade do ciclo de vida da visita",
          "decision": "Adicionar entidade de caso de uso VisitStatusTransitionEvent (layer_3, moduleOwned) ao ontology.entities e ao usecaseEntities, registrando cada transição de status da visita.",
          "reason": "A Visit possui 5 estados no ciclo de vida (agendada, confirmada, realizada, cancelada, reagendada) e a ação action-update-visit-status produz mudanças de ciclo de vida e atualiza VisitsPerMonthMetric. A ausência de um evento de rastreabilidade era inconsistente com o padrão estabelecido por LeadStageTransitionEvent e DealStageTransitionEvent. Corrige issue MISSING_LAYER3_USECASE_VISIT_STATUS_UPDATE.",
          "affectedArtifacts": [
            "visitLifecycleWorkflow",
            "visitsSchedulerPage",
            "propertyFlowUsecaseEntities",
            "action-schedule-visit",
            "action-update-visit-status"
          ]
        },
        {
          "decisionId": "dec-property-status-transition-event",
          "title": "Adição de PropertyStatusTransitionEvent para rastreabilidade de transições de status do imóvel",
          "decision": "Adicionar entidade de caso de uso PropertyStatusTransitionEvent (layer_3, moduleOwned) ao ontology.entities e ao usecaseEntities, registrando transições de status do imóvel tanto manuais quanto automáticas.",
          "reason": "A rule-property-status-transition está em layer_3 e o propertyStatusWorkflow a implementa, mas não havia entidade de caso de uso registrando o evento — diferente de Deal e Lead que possuem seus TransitionEvents. Corrige issue MISSING_LAYER3_USECASE_PROPERTY_STATUS_TRANSITION.",
          "affectedArtifacts": [
            "propertyStatusWorkflow",
            "dealStageWorkflow",
            "propertyFlowUsecaseEntities",
            "action-update-property-status",
            "action-create-deal",
            "action-advance-deal-stage",
            "action-mark-deal-lost"
          ]
        },
        {
          "decisionId": "dec-followup-dedicated-command",
          "title": "Criação de FollowUpSuggestionCommand como entidade dedicada",
          "decision": "Criar entidade de caso de uso FollowUpSuggestionCommand separada de LeadClassificationCommand, com campos próprios (leadId, inputContext, suggestionResult, status, requestedBy, createdAt). Atualizar action-get-followup-suggestion e followUpSuggestionAgent para referenciar a nova entidade.",
          "reason": "Follow-up e classificação são comandos com ciclos de vida e inputs/outputs distintos. Reutilizar LeadClassificationCommand gerava ambiguidade na persistência do campo followUpSuggestion e impedia o acionamento independente do agente de follow-up. Corrige issue FOLLOWUP_SUGGESTION_MISSING_DEDICATED_COMMAND_ENTITY.",
          "affectedArtifacts": [
            "followUpSuggestionAgent",
            "action-get-followup-suggestion",
            "propertyFlowUsecaseEntities",
            "leadDetailPage"
          ]
        },
        {
          "decisionId": "dec-assistente-actor-coverage",
          "title": "Documentação formal das permissões do assistenteActor via RBAC",
          "decision": "O assistenteActor opera sob as mesmas capabilities do corretorActor com restrições adicionais aplicadas via rule-rbac-data-isolation, conforme configurado pelo Admin. Não são criadas capabilities exclusivas para o Assistente no MVP — o isolamento é garantido pelo módulo authAndRbacModule.",
          "reason": "O assistenteActor não possui capabilities, userActions ou páginas exclusivas. As permissões exatas do Assistente dependem de configuração pelo Admin (questão aberta). Documentar formalmente evita ambiguidade sem bloquear o MVP. Corrige issue CAPABILITY_ASSISTENTE_ACTOR_NO_ARTIFACT_COVERAGE.",
          "affectedArtifacts": [
            "authAndRbacModule",
            "corretorMdm",
            "rule-rbac-data-isolation"
          ],
          "revisedBy": "agentPlanMDM",
          "revisedAt": "2026-06-11T01:36:14.200Z",
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
                  "Corretor"
                ]
              }
            ]
          }
        },
        {
          "decisionId": "dec-dashboard-single-artifact-rbac-filter",
          "title": "Dashboard único com filtragem dinâmica por perfil via RBAC",
          "decision": "O adminActorMetricDashboard serve tanto Admin quanto Corretor com filtragem dinâmica por corretorId na camada de BFF, aplicando rule-rbac-data-isolation. Não é criado um metricDashboard separado para corretorActor no MVP.",
          "reason": "Criar dois dashboards separados duplicaria artefatos sem ganho funcional no MVP. A filtragem dinâmica via RBAC é o padrão estabelecido no sistema e cobre o requisito de 'Admin vê dados globais; Corretor vê apenas seus registros'. Corrige issue DASHBOARD_MISSING_CORRETOR_ACTOR_DASHBOARD_ARTIFACT.",
          "affectedArtifacts": [
            "adminActorMetricDashboard",
            "dashboardPage",
            "authAndRbacModule"
          ]
        },
        {
          "decisionId": "dec-deal-lead-stage-sync",
          "title": "Sincronização automática de Lead.stage ao fechar ou perder negócio",
          "decision": "Atualizar rule-deal-stage-transition para incluir sincronização de Lead.stage para 'fechado' ou 'perdido' quando o Deal vinculado atingir esses estados terminais. Adicionar Lead como affectedEntity em action-advance-deal-stage e action-mark-deal-lost.",
          "reason": "Lead.statusEnum inclui 'fechado' e 'perdido' mas não havia regra ou ação explícita sincronizando o Lead quando o Deal terminal era atingido. Isso criava inconsistência de estado entre as entidades. Corrige issue DEAL_CLOSED_LEAD_STAGE_SYNC_NOT_EXPLICIT.",
          "affectedArtifacts": [
            "rule-deal-stage-transition",
            "action-advance-deal-stage",
            "action-mark-deal-lost",
            "dealStageWorkflow"
          ]
        },
        {
          "decisionId": "dec-metrics-soon-dashboard-future",
          "title": "Métricas 'soon' serão adicionadas ao dashboard quando promovidas",
          "decision": "visitsPerMonthMetricTable e leadConversionMetricTable permanecem com priority 'soon'. Quando promovidas para 'now', o adminActorMetricDashboard será atualizado para incluí-las. Documentado explicitamente no reason do dashboard.",
          "reason": "Evita retrabalho no planejamento de layer_2/layer_3 e deixa claro o caminho de evolução do dashboard. Corrige issue informativo METRIC_VISITSPERMONTH_NOT_IN_DASHBOARD.",
          "affectedArtifacts": [
            "adminActorMetricDashboard",
            "visitsPerMonthMetricTable",
            "leadConversionMetricTable"
          ]
        }
      ],
      "deferredItems": [
        {
          "id": "deferred-calendar-integration",
          "title": "Integração com Calendário Externo (Google Calendar / Outlook)",
          "description": "Plugin para sincronização do agendador de visitas com calendários externos. Identificado como risco de negócio mas fora do MVP. Avaliação para versão futura — requer decisão do cliente sobre provedor preferido."
        },
        {
          "id": "deferred-photo-upload",
          "title": "Upload Real de Fotos de Imóveis",
          "description": "Plugin para upload e armazenamento de fotos reais de imóveis, substituindo as URLs de placeholder do picsum.photos. Explicitamente adiado para versão futura na clarificação."
        },
        {
          "id": "deferred-audit-log",
          "title": "Módulo de Auditoria (Audit Log)",
          "description": "Módulo horizontal para rastreabilidade completa de alterações em imóveis, leads e negócios. Importante para conformidade mas não bloqueante para MVP."
        },
        {
          "id": "deferred-assistente-permissions",
          "title": "Definição Detalhada das Permissões do Assistente",
          "description": "As permissões exatas do perfil Assistente (criar imóveis, criar leads, apenas visualizar etc.) dependem de configuração pelo Admin e não foram definidas nas clarificações. Devem ser especificadas antes da implementação do módulo authAndRbacModule."
        },
        {
          "id": "deferred-llm-provider-selection",
          "title": "Seleção do Provedor e Modelo LLM",
          "description": "O provedor e modelo de LLM (OpenAI GPT-4o, Anthropic Claude 3.5, Google Gemini 1.5 Pro etc.) não foram definidos nas clarificações. Necessário para configurar o llmProviderPlugin corretamente."
        },
        {
          "id": "deferred-notifications-channel",
          "title": "Canal de Notificações (In-App, E-mail ou Push)",
          "description": "O canal preferido para o notificationsModule (in-app, e-mail ou push) não foi definido nas clarificações. Necessário antes da implementação do módulo de notificações (priority: soon)."
        }
      ],
      "openDetails": [
        {
          "title": "Formato do pipeline de leads",
          "description": "O pipeline de leads deve ser implementado como kanban, lista ou ambos? Isso impacta a modelagem do workflow e a definição das páginas."
        },
        {
          "title": "Provedor e modelo de LLM",
          "description": "Qual provedor ou modelo de IA será utilizado para gerar descrições de imóveis, classificar leads e sugerir follow-ups?"
        },
        {
          "title": "Armazenamento de fotos mock",
          "description": "As fotos mock serão URLs fixas, placeholders gerados ou upload de arquivos? Isso afeta a definição da tabela de Imóvel."
        }
      ],
      "healthReport": {
        "summary": {
          "passed": false,
          "errorCount": 12,
          "warningCount": 6
        },
        "issues": [
          {
            "severity": "error",
            "code": "usecase.consumer.missing",
            "message": "O usecase 'manageCorretorUsecase' não possui consumidor (nenhum comando BFF de página, workflow ou agente o referencia). Como ele gerencia dados de corretor, uma página de administração deveria expô-lo como ação.",
            "path": "usecase.manageCorretorUsecase",
            "evidence": [
              "Nenhuma página declara bffCommands com usecaseRefs apontando para manageCorretorUsecase",
              "Nenhum workflow declara usecaseRefs: manageCorretorUsecase",
              "Nenhum agente referencia manageCorretorUsecase"
            ]
          },
          {
            "severity": "error",
            "code": "horizontal.artifact.missing",
            "message": "O módulo horizontal aprovado 'authAndRbacModule' não produziu nenhum item/artefato no plano.",
            "path": "approvedArtifacts.horizontalModules[0]",
            "evidence": [
              "horizontalModules listados no snapshot: 5",
              "authAndRbacModule não aparece em nenhuma referência de artefato concreto no plano"
            ]
          },
          {
            "severity": "error",
            "code": "horizontal.artifact.missing",
            "message": "O módulo horizontal aprovado 'auditLogModule' não produziu nenhum item/artefato no plano.",
            "path": "approvedArtifacts.horizontalModules[2]",
            "evidence": [
              "auditLogModule não aparece em nenhuma referência de artefato concreto no plano"
            ]
          },
          {
            "severity": "error",
            "code": "bff.commands.missing",
            "message": "Todas as 11 páginas declaram 'bffCommands: []' (array vazio). Páginas que realizam leituras ou mutações de dados devem declarar comandos BFF com usecaseRefs correspondentes.",
            "path": "pages[*].bffCommands",
            "evidence": [
              "operationalDashboardPage: bffCommands=[] mas deve consultar métricas via queryDashboardMetricsUsecase",
              "leadPipelinePage: bffCommands=[] mas deve listar/mover leads via moveLeadStageUsecase/manageLeadUsecase",
              "leadDetailPage: bffCommands=[] mas deve acionar AI usecases (classifyLeadAiUsecase, getFollowUpSuggestionUsecase)",
              "propertyFormPage: bffCommands=[] mas deve acionar generatePropertyDescriptionUsecase",
              "dealTrackerPage, dealFormPage, dealDetailPage, visitFormPage, visitListPage, leadFormPage, propertyListPage: todos com bffCommands=[]"
            ]
          },
          {
            "severity": "error",
            "code": "bff.usecaseRefs.missing",
            "message": "Nenhuma página declara usecaseRefs em seus comandos BFF. A regra exige que todo comando BFF que lê/escreve tabelas module-owned declare usecaseRefs correspondentes.",
            "path": "pages[*].bffCommands[*].usecaseRefs",
            "evidence": [
              "Regra: bffMustCallUsecases=true e bffDirectTableAccessForbidden=true estão declarados",
              "Sem bffCommands, não há como garantir que o BFF chama usecases em vez de acessar tabelas diretamente"
            ]
          },
          {
            "severity": "error",
            "code": "metric.ownership.incorrect",
            "message": "As tabelas de métricas são declaradas com ownership='mdmOwned' nos usecases, mas métricas produzidas pelo módulo devem ter ownership='moduleOwned' ou serem tratadas como artefatos do próprio módulo, não do MDM.",
            "path": "usecases[*].writesTables",
            "evidence": [
              "moveLeadStageUsecase.writesTables: monthly_leads_metric ownership=mdmOwned",
              "moveLeadStageUsecase.writesTables: lead_conversion_metric ownership=mdmOwned",
              "advanceDealStageUsecase.writesTables: deal_pipeline_metric ownership=mdmOwned",
              "updateVisitStatusUsecase.writesTables: visits_per_month_metric ownership=mdmOwned",
              "updatePropertyStatusUsecase.writesTables: active_properties_metric ownership=mdmOwned",
              "queryDashboardMetricsUsecase.readsTables: todas as métricas com ownership=mdmOwned",
              "As metricTables estão listadas como artefatos do módulo (ids: activePropertiesMetric, etc.) mas referenciadas como mdmOwned nos usecases"
            ]
          },
          {
            "severity": "error",
            "code": "metric.updatePolicy.missing",
            "message": "As definições de metricTables não declaram timeColumn, hypertable, dimensions, measures nem updatePolicy (updatedByLayer: layer_3_usecases), conforme exigido pelo contrato de métricas TimescaleDB.",
            "path": "metricTables[*]",
            "evidence": [
              "activePropertiesMetric: apenas metricTableId e storageEngine declarados",
              "dealPipelineMetric: apenas metricTableId e storageEngine declarados",
              "leadConversionMetric: apenas metricTableId e storageEngine declarados",
              "monthlyLeadsMetric: apenas metricTableId e storageEngine declarados",
              "visitsPerMonthMetric: apenas metricTableId e storageEngine declarados"
            ]
          },
          {
            "severity": "error",
            "code": "mdm.lead.metric.ownership.conflict",
            "message": "Os usecases 'manageLeadUsecase' e 'moveLeadStageUsecase' escrevem em 'monthly_leads_metric' com ownership=mdmOwned, mas essa tabela é uma metricTable do módulo. Métricas do módulo não devem ser classificadas como mdmOwned.",
            "path": "usecase.manageLeadUsecase.writesTables",
            "evidence": [
              "manageLeadUsecase.writesTables: monthly_leads_metric ownership=mdmOwned",
              "monthlyLeadsMetric está listada em metricTables do módulo propertyFlowCrm"
            ]
          },
          {
            "severity": "error",
            "code": "page.actor.missing.corretorManagement",
            "message": "Não existe página para gerenciamento de corretores (CRUD de corretor) acessível ao adminActor, apesar de 'manageCorretorUsecase' existir com actor=adminActor. O usecase fica sem consumidor de UI.",
            "path": "pages",
            "evidence": [
              "ids.pages não contém corretorListPage, corretorFormPage ou equivalente",
              "manageCorretorUsecase.actor=adminActor sem página correspondente"
            ]
          },
          {
            "severity": "error",
            "code": "workflow.definition.mismatch",
            "message": "Os workflows declaram persistenceRefs incluindo IDs de metricTables (ex: dealPipelineMetric, leadConversionMetric), mas metricTables não são tabelas transacionais e não devem aparecer em persistenceRefs de workflows diretamente — devem ser atualizadas via usecases na layer_3.",
            "path": "workflows[*].persistenceRefs",
            "evidence": [
              "dealStageProgression.persistenceRefs: dealPipelineMetric, leadConversionMetric",
              "leadStageTransition.persistenceRefs: leadConversionMetric, monthlyLeadsMetric",
              "propertyStatusUpdate.persistenceRefs: activePropertiesMetric",
              "visitLifecycle.persistenceRefs: visitsPerMonthMetric"
            ]
          },
          {
            "severity": "error",
            "code": "mdm.ownership.write.violation",
            "message": "Múltiplos usecases escrevem em tabelas MDM (lead, deal, property, visit, corretor) com ownership=mdmOwned. Módulos não devem escrever diretamente em entidades MDM — devem usar eventos ou APIs do MDM. Isso viola o contrato de isolamento MDM/horizontal.",
            "path": "usecases[*].writesTables",
            "evidence": [
              "moveLeadStageUsecase.writesTables: lead ownership=mdmOwned",
              "advanceDealStageUsecase.writesTables: deal ownership=mdmOwned",
              "updateVisitStatusUsecase.writesTables: visit ownership=mdmOwned",
              "updatePropertyStatusUsecase.writesTables: property ownership=mdmOwned",
              "classifyLeadAiUsecase.writesTables: lead ownership=mdmOwned",
              "manageLeadUsecase.writesTables: lead ownership=mdmOwned",
              "manageCorretorUsecase.writesTables: corretor ownership=mdmOwned"
            ]
          },
          {
            "severity": "error",
            "code": "dashboard.bff.metric.commands.missing",
            "message": "A página 'operationalDashboardPage' é um dashboard de métricas para adminActor mas não declara nenhum comando BFF que leia métricas via usecaseRefs (queryDashboardMetricsUsecase). Dashboards de métricas devem ter comandos BFF lendo dados via usecases.",
            "path": "pages.operationalDashboardPage.bffCommands",
            "evidence": [
              "operationalDashboardPage.bffCommands=[]",
              "queryDashboardMetricsUsecase existe e é o usecase correto para este dashboard",
              "Regra: BFF commands em metric dashboard pages devem ler dados via usecaseRefs"
            ]
          },
          {
            "severity": "warning",
            "code": "agent.usecase.ref.missing",
            "message": "O agente 'propertyDescriptionAgent' muta dados do módulo (ai_command_log via generatePropertyDescriptionUsecase) mas não declara explicitamente usecaseRefs. Agentes que mutam dados module-owned devem referenciar usecases quando definições existem.",
            "path": "agents.propertyDescriptionAgent",
            "evidence": [
              "generatePropertyDescriptionUsecase existe e escreve em ai_command_log",
              "propertyDescriptionAgent não declara usecaseRefs"
            ]
          },
          {
            "severity": "warning",
            "code": "agent.usecase.ref.missing",
            "message": "O agente 'leadClassificationAgent' muta dados do módulo (ai_command_log, lead via classifyLeadAiUsecase) mas não declara explicitamente usecaseRefs.",
            "path": "agents.leadClassificationAgent",
            "evidence": [
              "classifyLeadAiUsecase existe e escreve em ai_command_log e lead",
              "leadClassificationAgent não declara usecaseRefs"
            ]
          },
          {
            "severity": "warning",
            "code": "agent.usecase.ref.missing",
            "message": "O agente 'followUpSuggestionAgent' muta dados do módulo (ai_command_log via getFollowUpSuggestionUsecase) mas não declara explicitamente usecaseRefs.",
            "path": "agents.followUpSuggestionAgent",
            "evidence": [
              "getFollowUpSuggestionUsecase existe e escreve em ai_command_log",
              "followUpSuggestionAgent não declara usecaseRefs"
            ]
          },
          {
            "severity": "warning",
            "code": "page.navigationRefs.missing",
            "message": "Nenhuma das 11 páginas declara navigationRefs. Páginas de detalhe, formulário e lista devem declarar navigationRefs para indicar fluxos de navegação entre páginas.",
            "path": "pages[*].navigationRefs",
            "evidence": [
              "dealDetailPage: sem navigationRefs",
              "leadDetailPage: sem navigationRefs",
              "propertyListPage → propertyFormPage: sem navigationRef declarada",
              "leadPipelinePage → leadDetailPage: sem navigationRef declarada"
            ]
          },
          {
            "severity": "warning",
            "code": "page.input.source.missing",
            "message": "Páginas de detalhe/formulário declaram pageInputs obrigatórios (dealId, leadId, propertyId) sem especificar a fonte (source: routeParam, previousStepResult, etc.).",
            "path": "pages[*].pageInputs",
            "evidence": [
              "dealDetailPage.pageInputs[0]: name=dealId, required=true, sem source",
              "leadDetailPage.pageInputs[0]: name=leadId, required=true, sem source",
              "leadFormPage.pageInputs[0]: name=leadId, required=false, sem source",
              "propertyFormPage.pageInputs[0]: name=propertyId, required=false, sem source"
            ]
          },
          {
            "severity": "warning",
            "code": "mdm.domain.mismatch",
            "message": "O domínio MDM está declarado como 'broker' mas o contexto do módulo usa 'corretor' (pt-BR). Verificar consistência de nomenclatura entre mdmDomains e referências nos usecases.",
            "path": "mdmDomains[2]",
            "evidence": [
              "mdmDomains[2].domainId=broker",
              "usecases referenciam tableName=corretor",
              "Possível inconsistência de idioma no identificador do domínio MDM"
            ]
          }
        ],
        "checklistResults": null,
        "readyToSaveDefs": false
      },
      "nextSteps": [
        {
          "id": "plugin:provedor",
          "kind": "plugin",
          "title": "provedor",
          "description": "Plugin de integração com provedor LLM (OpenAI, Anthropic, Google Gemini ou similar) obrigatório para os três agentes de IA do MVP: geração de descrição de imóvel, classificação de lead e sugestão de follow-up.",
          "pluginId": "provedor",
          "status": "dismissed"
        },
        {
          "id": "plugin:i18n",
          "kind": "plugin",
          "title": "i18n",
          "description": "Plugin para gerenciar traduções e alternância de idioma entre pt-BR (padrão) e inglês em toda a interface do PropertyFlowCRM. Requisito explícito definido na clarificação.",
          "pluginId": "i18n",
          "status": "dismissed"
        },
        {
          "id": "plugin:mockImage",
          "kind": "plugin",
          "title": "mockImage",
          "description": "Plugin utilitário para gerar e gerenciar URLs de imagens placeholder (picsum.photos) para fotos de imóveis no MVP. Encapsula a lógica para facilitar migração futura para upload real.",
          "pluginId": "mockImage",
          "status": "dismissed"
        },
        {
          "id": "plugin:calend",
          "kind": "plugin",
          "title": "calend",
          "description": "Plugin para sincronização do agendador de visitas com calendários externos (Google Calendar, Microsoft Outlook). Identificado como risco de negócio mas fora do escopo do MVP — avaliação para versão futura.",
          "pluginId": "calend",
          "status": "dismissed"
        },
        {
          "id": "plugin:photoUpload",
          "kind": "plugin",
          "title": "photoUpload",
          "description": "Plugin para upload e armazenamento de fotos reais de imóveis, substituindo as URLs de placeholder do picsum.photos. Explicitamente adiado para versão futura na clarificação.",
          "pluginId": "photoUpload",
          "status": "dismissed"
        }
      ],
      "finishedAt": "2026-06-11T01:52:58.865Z"
    }
  ]
} as const;

export default propertyFlowCrmProcess;
