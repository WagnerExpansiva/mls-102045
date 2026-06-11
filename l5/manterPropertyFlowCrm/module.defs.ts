/// <mls fileReference="_102045_/l5/manterPropertyFlowCrm/module.defs.ts" enhancement="_blank"/>

export const modulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "module",
  "artifactId": "manterPropertyFlowCrm",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "module": {
      "moduleName": "propertyFlowCrm",
      "title": "PropertyFlowCRM",
      "purpose": "Centralizar a gestão de imóveis, leads, visitas e negócios para imobiliárias e corretores, aumentando a conversão e reduzindo a perda de oportunidades com suporte a IA.",
      "businessDomain": "Corretagem Imobiliária / CRM",
      "languages": [
        "pt-BR",
        "en"
      ],
      "visualStyle": {
        "tone": "Moderno e profissional, transmitindo confiança e sofisticação",
        "layout": "Dashboard-first com navegação lateral, kanban para pipeline de leads e rastreador de negócios por etapas",
        "palette": [
          "#FFFFFF",
          "#F4F5F7",
          "#1E293B",
          "#2563EB",
          "#10B981"
        ]
      }
    },
    "actors": [
      {
        "actorId": "adminActor",
        "title": "Admin (Imobiliária)",
        "description": "Gestor da imobiliária com acesso total ao sistema: todos os imóveis, leads, visitas, negócios e corretores. Pode configurar o sistema, gerenciar usuários e visualizar métricas globais."
      },
      {
        "actorId": "corretorActor",
        "title": "Corretor",
        "description": "Corretor de imóveis com acesso restrito aos seus próprios registros de leads, visitas e negócios. Pode usar os agentes de IA para classificação de leads e geração de descrições."
      },
      {
        "actorId": "assistenteActor",
        "title": "Assistente",
        "description": "Assistente da equipe com acesso restrito, podendo apoiar no cadastro de imóveis e agendamento de visitas conforme permissões definidas pelo Admin. Opera sob as mesmas capabilities do Corretor com restrições adicionais aplicadas via rule-rbac-data-isolation. Acessa apenas registros atribuídos ao seu perfil."
      }
    ],
    "capabilities": [
      {
        "capabilityId": "manageProperties",
        "title": "Gestão de Imóveis (CRUD + Busca)",
        "description": "Cadastrar, editar, visualizar e remover imóveis com endereço, tipo, preço, status, características e fotos mock via picsum.photos. Inclui busca por texto e filtros por tipo, status, preço e localização.",
        "actor": "adminActor",
        "priority": "now"
      },
      {
        "capabilityId": "manageLeads",
        "title": "Gestão de Leads/Clientes",
        "description": "Cadastrar e gerenciar leads com dados de contato, anotações, histórico de interações e corretor responsável.",
        "actor": "corretorActor",
        "priority": "now"
      },
      {
        "capabilityId": "leadPipelineKanban",
        "title": "Pipeline de Leads (Kanban + Lista)",
        "description": "Visualizar e mover leads entre etapas do funil em formato kanban como visualização principal, com alternância para lista. Exibe classificação de temperatura em cada card.",
        "actor": "corretorActor",
        "priority": "now"
      },
      {
        "capabilityId": "scheduleVisits",
        "title": "Agendamento de Visitas",
        "description": "Criar, editar e cancelar visitas vinculando lead, imóvel, corretor e data/hora. Validação de conflito de horário. Visualização em lista com filtros.",
        "actor": "corretorActor",
        "priority": "now"
      },
      {
        "capabilityId": "trackDeals",
        "title": "Rastreador de Negócios/Propostas por Etapas",
        "description": "Gerenciar negócios/propostas com etapas do funil de fechamento (Proposta → Negociação → Contrato → Fechado/Perdido), valor e imóvel vinculado.",
        "actor": "corretorActor",
        "priority": "now"
      },
      {
        "capabilityId": "dashboardOverview",
        "title": "Dashboard Operacional",
        "description": "Painel com métricas básicas: imóveis ativos, leads do mês, pipeline de fechamentos e indicadores de desempenho. Admin vê dados globais; Corretor vê apenas seus registros.",
        "actor": "adminActor",
        "priority": "now"
      },
      {
        "capabilityId": "aiPropertyDescription",
        "title": "IA: Geração de Descrição de Imóvel",
        "description": "Agente LLM que recebe bullets/características do imóvel e gera uma descrição profissional e atrativa em pt-BR ou en.",
        "actor": "corretorActor",
        "priority": "now"
      },
      {
        "capabilityId": "aiLeadClassification",
        "title": "IA: Classificação de Lead (Quente/Morno/Frio)",
        "description": "Agente LLM que analisa anotações e histórico do lead e classifica o nível de interesse, persistindo o resultado no registro.",
        "actor": "corretorActor",
        "priority": "now"
      },
      {
        "capabilityId": "aiFollowUpSuggestion",
        "title": "IA: Sugestão de Mensagem de Follow-up",
        "description": "Agente LLM que, com base no perfil, classificação e histórico do lead, sugere a próxima mensagem personalizada de follow-up para o corretor.",
        "actor": "corretorActor",
        "priority": "now"
      },
      {
        "capabilityId": "roleBasedAccess",
        "title": "Controle de Acesso por Perfil (RBAC)",
        "description": "Admin tem acesso total; Corretor e Assistente acessam apenas seus próprios registros. Isolamento de dados garantido por perfil.",
        "actor": "adminActor",
        "priority": "now"
      },
      {
        "capabilityId": "manageCorretores",
        "title": "Gestão de Corretores",
        "description": "Cadastrar e gerenciar corretores vinculados à imobiliária, com perfil, dados de contato e atribuições.",
        "actor": "adminActor",
        "priority": "soon"
      },
      {
        "capabilityId": "i18nSupport",
        "title": "Suporte a Múltiplos Idiomas (pt-BR / en)",
        "description": "Interface disponível em pt-BR (padrão) e inglês, com alternância de idioma em toda a aplicação.",
        "actor": "adminActor",
        "priority": "soon"
      }
    ],
    "ontology": {
      "entities": {
        "Property": {
          "title": "Imóvel",
          "description": "Entidade mestre central do domínio imobiliário. Representa um imóvel disponível para venda ou locação, com todos os seus atributos, características e fotos mock.",
          "kind": "masterEntity",
          "ownership": "mdmOwned",
          "statusEnum": [
            "disponivel",
            "reservado",
            "vendido",
            "alugado",
            "inativo"
          ],
          "lifecycleStates": [
            "disponivel",
            "reservado",
            "vendido",
            "alugado",
            "inativo"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ],
          "fields": [
            {
              "fieldId": "propertyId",
              "type": "string",
              "required": true,
              "description": "Identificador único do imóvel (UUID)."
            },
            {
              "fieldId": "title",
              "type": "string",
              "required": true,
              "description": "Título ou nome de referência do imóvel."
            },
            {
              "fieldId": "description",
              "type": "string",
              "required": false,
              "description": "Descrição profissional do imóvel, podendo ser gerada pelo agente de IA."
            },
            {
              "fieldId": "propertyType",
              "type": "enum(apartamento,casa,comercial,terreno,rural,outro)",
              "required": true,
              "description": "Tipo do imóvel."
            },
            {
              "fieldId": "transactionType",
              "type": "enum(venda,locacao,ambos)",
              "required": true,
              "description": "Tipo de transação: venda, locação ou ambos."
            },
            {
              "fieldId": "price",
              "type": "number",
              "required": true,
              "description": "Preço de venda ou valor de locação mensal em reais."
            },
            {
              "fieldId": "status",
              "type": "enum(disponivel,reservado,vendido,alugado,inativo)",
              "required": true,
              "description": "Status atual do imóvel no ciclo de vida."
            },
            {
              "fieldId": "addressStreet",
              "type": "string",
              "required": true,
              "description": "Logradouro do endereço do imóvel."
            },
            {
              "fieldId": "addressNumber",
              "type": "string",
              "required": true,
              "description": "Número do endereço."
            },
            {
              "fieldId": "addressComplement",
              "type": "string",
              "required": false,
              "description": "Complemento do endereço (apto, bloco etc.)."
            },
            {
              "fieldId": "addressNeighborhood",
              "type": "string",
              "required": true,
              "description": "Bairro do imóvel."
            },
            {
              "fieldId": "addressCity",
              "type": "string",
              "required": true,
              "description": "Cidade do imóvel."
            },
            {
              "fieldId": "addressState",
              "type": "string",
              "required": true,
              "description": "Estado (UF) do imóvel."
            },
            {
              "fieldId": "addressZipCode",
              "type": "string",
              "required": false,
              "description": "CEP do imóvel."
            },
            {
              "fieldId": "areaM2",
              "type": "number",
              "required": false,
              "description": "Área total do imóvel em metros quadrados."
            },
            {
              "fieldId": "bedrooms",
              "type": "integer",
              "required": false,
              "description": "Número de quartos/dormitórios."
            },
            {
              "fieldId": "bathrooms",
              "type": "integer",
              "required": false,
              "description": "Número de banheiros."
            },
            {
              "fieldId": "parkingSpots",
              "type": "integer",
              "required": false,
              "description": "Número de vagas de garagem."
            },
            {
              "fieldId": "features",
              "type": "string[]",
              "required": false,
              "description": "Lista de características e diferenciais do imóvel (ex: piscina, churrasqueira, academia)."
            },
            {
              "fieldId": "photoUrls",
              "type": "string[]",
              "required": false,
              "description": "Lista de URLs de fotos mock do imóvel (picsum.photos)."
            },
            {
              "fieldId": "aiBullets",
              "type": "string",
              "required": false,
              "description": "Bullets/características em texto livre usados como input para o agente de geração de descrição IA."
            },
            {
              "fieldId": "assignedCorretorId",
              "type": "string",
              "required": false,
              "description": "ID do corretor responsável pelo imóvel."
            },
            {
              "fieldId": "createdAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora de criação do registro."
            },
            {
              "fieldId": "updatedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da última atualização."
            },
            {
              "fieldId": "createdBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que criou o registro."
            }
          ]
        },
        "Lead": {
          "title": "Lead / Cliente",
          "description": "Entidade mestre de leads e clientes com dados de contato, anotações, classificação de temperatura gerada por IA, histórico de interações e corretor responsável.",
          "kind": "masterEntity",
          "ownership": "mdmOwned",
          "statusEnum": [
            "novo",
            "contato",
            "visita",
            "proposta",
            "fechado",
            "perdido"
          ],
          "lifecycleStates": [
            "novo",
            "contato",
            "visita",
            "proposta",
            "fechado",
            "perdido"
          ],
          "rulesApplied": [
            "rule-lead-stage-transition",
            "rule-rbac-data-isolation"
          ],
          "fields": [
            {
              "fieldId": "leadId",
              "type": "string",
              "required": true,
              "description": "Identificador único do lead (UUID)."
            },
            {
              "fieldId": "fullName",
              "type": "string",
              "required": true,
              "description": "Nome completo do lead/cliente."
            },
            {
              "fieldId": "email",
              "type": "string",
              "required": false,
              "description": "E-mail de contato do lead."
            },
            {
              "fieldId": "phone",
              "type": "string",
              "required": false,
              "description": "Telefone/WhatsApp de contato do lead."
            },
            {
              "fieldId": "stage",
              "type": "enum(novo,contato,visita,proposta,fechado,perdido)",
              "required": true,
              "description": "Etapa atual do lead no funil de vendas."
            },
            {
              "fieldId": "temperature",
              "type": "enum(quente,morno,frio)",
              "required": false,
              "description": "Classificação de temperatura do lead gerada pelo agente de IA."
            },
            {
              "fieldId": "temperatureJustification",
              "type": "string",
              "required": false,
              "description": "Justificativa da classificação de temperatura gerada pela IA."
            },
            {
              "fieldId": "followUpSuggestion",
              "type": "string",
              "required": false,
              "description": "Sugestão de mensagem de follow-up gerada pelo agente de IA."
            },
            {
              "fieldId": "notes",
              "type": "string",
              "required": false,
              "description": "Anotações livres sobre o lead, usadas como input para os agentes de IA."
            },
            {
              "fieldId": "interactionHistory",
              "type": "object[]",
              "required": false,
              "description": "Histórico de interações com o lead (data, tipo, descrição)."
            },
            {
              "fieldId": "interestedPropertyIds",
              "type": "string[]",
              "required": false,
              "description": "IDs dos imóveis de interesse do lead."
            },
            {
              "fieldId": "assignedCorretorId",
              "type": "string",
              "required": true,
              "description": "ID do corretor responsável pelo lead."
            },
            {
              "fieldId": "source",
              "type": "string",
              "required": false,
              "description": "Origem do lead (ex: site, indicação, portal imobiliário)."
            },
            {
              "fieldId": "createdAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora de criação do registro."
            },
            {
              "fieldId": "updatedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da última atualização."
            },
            {
              "fieldId": "createdBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que criou o registro."
            }
          ]
        },
        "Visit": {
          "title": "Visita / Agendamento",
          "description": "Entidade transacional que vincula Lead, Imóvel e Corretor com data/hora, status do ciclo de vida e observações.",
          "kind": "transactionalEntity",
          "ownership": "mdmOwned",
          "statusEnum": [
            "agendada",
            "confirmada",
            "realizada",
            "cancelada",
            "reagendada"
          ],
          "lifecycleStates": [
            "agendada",
            "confirmada",
            "realizada",
            "cancelada",
            "reagendada"
          ],
          "rulesApplied": [
            "rule-visit-no-conflict",
            "rule-rbac-data-isolation"
          ],
          "fields": [
            {
              "fieldId": "visitId",
              "type": "string",
              "required": true,
              "description": "Identificador único da visita (UUID)."
            },
            {
              "fieldId": "propertyId",
              "type": "string",
              "required": true,
              "description": "ID do imóvel a ser visitado."
            },
            {
              "fieldId": "leadId",
              "type": "string",
              "required": true,
              "description": "ID do lead/cliente que realizará a visita."
            },
            {
              "fieldId": "corretorId",
              "type": "string",
              "required": true,
              "description": "ID do corretor responsável pela visita."
            },
            {
              "fieldId": "scheduledAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora agendada para a visita."
            },
            {
              "fieldId": "durationMinutes",
              "type": "integer",
              "required": false,
              "description": "Duração estimada da visita em minutos."
            },
            {
              "fieldId": "status",
              "type": "enum(agendada,confirmada,realizada,cancelada,reagendada)",
              "required": true,
              "description": "Status atual da visita no ciclo de vida."
            },
            {
              "fieldId": "notes",
              "type": "string",
              "required": false,
              "description": "Observações sobre a visita (feedback, impressões do cliente etc.)."
            },
            {
              "fieldId": "cancelReason",
              "type": "string",
              "required": false,
              "description": "Motivo do cancelamento, quando aplicável."
            },
            {
              "fieldId": "createdAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora de criação do agendamento."
            },
            {
              "fieldId": "updatedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da última atualização."
            },
            {
              "fieldId": "createdBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que criou o agendamento."
            }
          ]
        },
        "Deal": {
          "title": "Negócio / Proposta",
          "description": "Entidade transacional que representa uma proposta ou negócio em andamento, com etapas do funil de fechamento, valor e vínculos a Imóvel e Lead.",
          "kind": "transactionalEntity",
          "ownership": "mdmOwned",
          "statusEnum": [
            "proposta",
            "negociacao",
            "contrato",
            "fechado",
            "perdido"
          ],
          "lifecycleStates": [
            "proposta",
            "negociacao",
            "contrato",
            "fechado",
            "perdido"
          ],
          "rulesApplied": [
            "rule-deal-stage-transition",
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ],
          "fields": [
            {
              "fieldId": "dealId",
              "type": "string",
              "required": true,
              "description": "Identificador único do negócio (UUID)."
            },
            {
              "fieldId": "title",
              "type": "string",
              "required": true,
              "description": "Título ou referência do negócio/proposta."
            },
            {
              "fieldId": "propertyId",
              "type": "string",
              "required": true,
              "description": "ID do imóvel vinculado ao negócio."
            },
            {
              "fieldId": "leadId",
              "type": "string",
              "required": true,
              "description": "ID do lead/cliente vinculado ao negócio."
            },
            {
              "fieldId": "corretorId",
              "type": "string",
              "required": true,
              "description": "ID do corretor responsável pelo negócio."
            },
            {
              "fieldId": "stage",
              "type": "enum(proposta,negociacao,contrato,fechado,perdido)",
              "required": true,
              "description": "Etapa atual do negócio no funil de fechamento."
            },
            {
              "fieldId": "dealValue",
              "type": "number",
              "required": true,
              "description": "Valor da proposta/negócio em reais."
            },
            {
              "fieldId": "dealType",
              "type": "enum(venda,locacao)",
              "required": true,
              "description": "Tipo do negócio: venda ou locação."
            },
            {
              "fieldId": "notes",
              "type": "string",
              "required": false,
              "description": "Observações e histórico de negociação."
            },
            {
              "fieldId": "lostReason",
              "type": "string",
              "required": false,
              "description": "Motivo da perda do negócio, quando aplicável."
            },
            {
              "fieldId": "expectedCloseDate",
              "type": "date",
              "required": false,
              "description": "Data prevista de fechamento do negócio."
            },
            {
              "fieldId": "closedAt",
              "type": "datetime",
              "required": false,
              "description": "Data e hora efetiva do fechamento."
            },
            {
              "fieldId": "createdAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora de criação do registro."
            },
            {
              "fieldId": "updatedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da última atualização."
            },
            {
              "fieldId": "createdBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que criou o registro."
            }
          ]
        },
        "Corretor": {
          "title": "Corretor",
          "description": "Entidade mestre de corretores vinculados à imobiliária. Referenciada por Visitas, Leads e Negócios para controle de acesso e isolamento de registros por perfil.",
          "kind": "masterEntity",
          "ownership": "mdmOwned",
          "statusEnum": [
            "ativo",
            "inativo"
          ],
          "lifecycleStates": [
            "ativo",
            "inativo"
          ],
          "rulesApplied": [
            "rule-rbac-data-isolation"
          ],
          "fields": [
            {
              "fieldId": "corretorId",
              "type": "string",
              "required": true,
              "description": "Identificador único do corretor (UUID), vinculado ao userId do sistema de autenticação."
            },
            {
              "fieldId": "userId",
              "type": "string",
              "required": true,
              "description": "ID do usuário no sistema de autenticação (RBAC)."
            },
            {
              "fieldId": "fullName",
              "type": "string",
              "required": true,
              "description": "Nome completo do corretor."
            },
            {
              "fieldId": "email",
              "type": "string",
              "required": true,
              "description": "E-mail profissional do corretor."
            },
            {
              "fieldId": "phone",
              "type": "string",
              "required": false,
              "description": "Telefone de contato do corretor."
            },
            {
              "fieldId": "role",
              "type": "enum(admin,corretor,assistente)",
              "required": true,
              "description": "Perfil de acesso do corretor no sistema."
            },
            {
              "fieldId": "creci",
              "type": "string",
              "required": false,
              "description": "Número do CRECI (Conselho Regional de Corretores de Imóveis)."
            },
            {
              "fieldId": "avatarUrl",
              "type": "string",
              "required": false,
              "description": "URL da foto de perfil do corretor."
            },
            {
              "fieldId": "status",
              "type": "enum(ativo,inativo)",
              "required": true,
              "description": "Status do corretor na imobiliária."
            },
            {
              "fieldId": "createdAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora de criação do registro."
            },
            {
              "fieldId": "updatedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da última atualização."
            }
          ]
        },
        "PropertyDescriptionCommand": {
          "title": "Comando: Gerar Descrição de Imóvel",
          "description": "Entidade de caso de uso (layer_3) que representa o comando de acionamento do agente LLM para geração de descrição profissional de imóvel a partir de bullets.",
          "kind": "usecaseEntity",
          "ownership": "moduleOwned",
          "rulesApplied": [
            "rule-llm-agent-invocation"
          ],
          "fields": [
            {
              "fieldId": "commandId",
              "type": "string",
              "required": true,
              "description": "Identificador único do comando (UUID)."
            },
            {
              "fieldId": "propertyId",
              "type": "string",
              "required": true,
              "description": "ID do imóvel para o qual a descrição será gerada."
            },
            {
              "fieldId": "inputBullets",
              "type": "string",
              "required": true,
              "description": "Bullets e características do imóvel fornecidos como input para o agente."
            },
            {
              "fieldId": "targetLanguage",
              "type": "enum(pt-BR,en)",
              "required": true,
              "description": "Idioma alvo da descrição gerada."
            },
            {
              "fieldId": "generatedDescription",
              "type": "string",
              "required": false,
              "description": "Descrição profissional gerada pelo agente LLM."
            },
            {
              "fieldId": "status",
              "type": "enum(pending,completed,failed)",
              "required": true,
              "description": "Status do processamento do comando."
            },
            {
              "fieldId": "requestedBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que acionou o comando."
            },
            {
              "fieldId": "createdAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora de criação do comando."
            }
          ]
        },
        "LeadClassificationCommand": {
          "title": "Comando: Classificar Lead com IA",
          "description": "Entidade de caso de uso (layer_3) que representa o comando de acionamento do agente LLM para classificação de temperatura do lead.",
          "kind": "usecaseEntity",
          "ownership": "moduleOwned",
          "rulesApplied": [
            "rule-llm-agent-invocation"
          ],
          "fields": [
            {
              "fieldId": "commandId",
              "type": "string",
              "required": true,
              "description": "Identificador único do comando (UUID)."
            },
            {
              "fieldId": "leadId",
              "type": "string",
              "required": true,
              "description": "ID do lead a ser classificado."
            },
            {
              "fieldId": "inputNotes",
              "type": "string",
              "required": true,
              "description": "Anotações e histórico do lead usados como input para o agente."
            },
            {
              "fieldId": "classificationResult",
              "type": "enum(quente,morno,frio)",
              "required": false,
              "description": "Resultado da classificação de temperatura gerado pelo agente."
            },
            {
              "fieldId": "classificationJustification",
              "type": "string",
              "required": false,
              "description": "Justificativa da classificação gerada pelo agente."
            },
            {
              "fieldId": "status",
              "type": "enum(pending,completed,failed)",
              "required": true,
              "description": "Status do processamento do comando."
            },
            {
              "fieldId": "requestedBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que acionou o comando."
            },
            {
              "fieldId": "createdAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora de criação do comando."
            }
          ]
        },
        "FollowUpSuggestionCommand": {
          "title": "Comando: Sugestão de Follow-up",
          "description": "Entidade de caso de uso (layer_3) dedicada ao comando de acionamento do agente LLM para geração de sugestão de mensagem de follow-up personalizada para o lead. Separada de LeadClassificationCommand pois possui ciclo de vida e inputs/outputs independentes.",
          "kind": "usecaseEntity",
          "ownership": "moduleOwned",
          "rulesApplied": [
            "rule-llm-agent-invocation"
          ],
          "fields": [
            {
              "fieldId": "commandId",
              "type": "string",
              "required": true,
              "description": "Identificador único do comando (UUID)."
            },
            {
              "fieldId": "leadId",
              "type": "string",
              "required": true,
              "description": "ID do lead para o qual a sugestão será gerada."
            },
            {
              "fieldId": "inputContext",
              "type": "string",
              "required": true,
              "description": "Contexto do lead (perfil, classificação de temperatura, histórico de interações) usado como input para o agente."
            },
            {
              "fieldId": "suggestionResult",
              "type": "string",
              "required": false,
              "description": "Mensagem de follow-up sugerida pelo agente LLM."
            },
            {
              "fieldId": "status",
              "type": "enum(pending,completed,failed)",
              "required": true,
              "description": "Status do processamento do comando."
            },
            {
              "fieldId": "requestedBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que acionou o comando."
            },
            {
              "fieldId": "createdAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora de criação do comando."
            }
          ]
        },
        "LeadStageTransitionEvent": {
          "title": "Evento: Transição de Etapa do Lead",
          "description": "Entidade de caso de uso (layer_3) que registra cada transição de etapa do lead no funil, garantindo rastreabilidade do histórico de movimentações.",
          "kind": "usecaseEntity",
          "ownership": "moduleOwned",
          "rulesApplied": [
            "rule-lead-stage-transition"
          ],
          "fields": [
            {
              "fieldId": "eventId",
              "type": "string",
              "required": true,
              "description": "Identificador único do evento (UUID)."
            },
            {
              "fieldId": "leadId",
              "type": "string",
              "required": true,
              "description": "ID do lead que sofreu a transição."
            },
            {
              "fieldId": "fromStage",
              "type": "string",
              "required": true,
              "description": "Etapa de origem da transição."
            },
            {
              "fieldId": "toStage",
              "type": "string",
              "required": true,
              "description": "Etapa de destino da transição."
            },
            {
              "fieldId": "transitionReason",
              "type": "string",
              "required": false,
              "description": "Motivo ou observação sobre a transição."
            },
            {
              "fieldId": "performedBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que realizou a transição."
            },
            {
              "fieldId": "occurredAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da transição."
            }
          ]
        },
        "DealStageTransitionEvent": {
          "title": "Evento: Transição de Etapa do Negócio",
          "description": "Entidade de caso de uso (layer_3) que registra cada transição de etapa do negócio no funil de fechamento, atualizando métricas do pipeline.",
          "kind": "usecaseEntity",
          "ownership": "moduleOwned",
          "rulesApplied": [
            "rule-deal-stage-transition"
          ],
          "fields": [
            {
              "fieldId": "eventId",
              "type": "string",
              "required": true,
              "description": "Identificador único do evento (UUID)."
            },
            {
              "fieldId": "dealId",
              "type": "string",
              "required": true,
              "description": "ID do negócio que sofreu a transição."
            },
            {
              "fieldId": "fromStage",
              "type": "string",
              "required": true,
              "description": "Etapa de origem da transição."
            },
            {
              "fieldId": "toStage",
              "type": "string",
              "required": true,
              "description": "Etapa de destino da transição."
            },
            {
              "fieldId": "notes",
              "type": "string",
              "required": false,
              "description": "Observações sobre a transição de etapa."
            },
            {
              "fieldId": "performedBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que realizou a transição."
            },
            {
              "fieldId": "occurredAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da transição."
            }
          ]
        },
        "VisitStatusTransitionEvent": {
          "title": "Evento: Transição de Status da Visita",
          "description": "Entidade de caso de uso (layer_3) que registra cada transição de status da visita (agendada → confirmada → realizada / cancelada / reagendada), garantindo rastreabilidade do ciclo de vida e alimentando a VisitsPerMonthMetric.",
          "kind": "usecaseEntity",
          "ownership": "moduleOwned",
          "rulesApplied": [
            "rule-visit-no-conflict",
            "rule-visit-requires-property-lead-corretor"
          ],
          "fields": [
            {
              "fieldId": "eventId",
              "type": "string",
              "required": true,
              "description": "Identificador único do evento (UUID)."
            },
            {
              "fieldId": "visitId",
              "type": "string",
              "required": true,
              "description": "ID da visita que sofreu a transição de status."
            },
            {
              "fieldId": "fromStatus",
              "type": "string",
              "required": true,
              "description": "Status de origem da transição."
            },
            {
              "fieldId": "toStatus",
              "type": "string",
              "required": true,
              "description": "Status de destino da transição."
            },
            {
              "fieldId": "transitionReason",
              "type": "string",
              "required": false,
              "description": "Motivo ou observação sobre a transição (ex: motivo de cancelamento)."
            },
            {
              "fieldId": "performedBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário que realizou a transição."
            },
            {
              "fieldId": "occurredAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da transição."
            }
          ]
        },
        "PropertyStatusTransitionEvent": {
          "title": "Evento: Transição de Status do Imóvel",
          "description": "Entidade de caso de uso (layer_3) que registra cada transição de status do imóvel (Disponível → Reservado → Vendido/Alugado → Disponível), acionada manualmente pelo Admin ou automaticamente via dealStageWorkflow e propertyStatusWorkflow.",
          "kind": "usecaseEntity",
          "ownership": "moduleOwned",
          "rulesApplied": [
            "rule-property-status-transition"
          ],
          "fields": [
            {
              "fieldId": "eventId",
              "type": "string",
              "required": true,
              "description": "Identificador único do evento (UUID)."
            },
            {
              "fieldId": "propertyId",
              "type": "string",
              "required": true,
              "description": "ID do imóvel que sofreu a transição de status."
            },
            {
              "fieldId": "fromStatus",
              "type": "string",
              "required": true,
              "description": "Status de origem da transição."
            },
            {
              "fieldId": "toStatus",
              "type": "string",
              "required": true,
              "description": "Status de destino da transição."
            },
            {
              "fieldId": "triggeredBy",
              "type": "enum(manual,dealClosed,dealLost,dealCreated)",
              "required": true,
              "description": "Origem da transição: manual (Admin) ou automática via workflow de negócio."
            },
            {
              "fieldId": "relatedDealId",
              "type": "string",
              "required": false,
              "description": "ID do negócio que originou a transição automática, quando aplicável."
            },
            {
              "fieldId": "performedBy",
              "type": "string",
              "required": true,
              "description": "ID do usuário ou sistema que realizou a transição."
            },
            {
              "fieldId": "occurredAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora da transição."
            }
          ]
        },
        "ActivePropertiesMetric": {
          "title": "Métrica: Imóveis Ativos",
          "description": "Tabela de métrica com contagem de imóveis por status, destacando os disponíveis (ativos). Alimenta o card de imóveis ativos no Dashboard.",
          "kind": "metricTable",
          "ownership": "moduleOwned",
          "fields": [
            {
              "fieldId": "metricId",
              "type": "string",
              "required": true,
              "description": "Identificador único do registro de métrica."
            },
            {
              "fieldId": "totalActive",
              "type": "integer",
              "required": true,
              "description": "Total de imóveis com status 'disponivel'."
            },
            {
              "fieldId": "totalReserved",
              "type": "integer",
              "required": true,
              "description": "Total de imóveis com status 'reservado'."
            },
            {
              "fieldId": "totalSold",
              "type": "integer",
              "required": true,
              "description": "Total de imóveis com status 'vendido'."
            },
            {
              "fieldId": "totalRented",
              "type": "integer",
              "required": true,
              "description": "Total de imóveis com status 'alugado'."
            },
            {
              "fieldId": "computedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora do último cálculo da métrica."
            }
          ]
        },
        "MonthlyLeadsMetric": {
          "title": "Métrica: Leads do Mês",
          "description": "Tabela de métrica com contagem de leads criados no mês corrente, segmentada por etapa do funil e corretor responsável.",
          "kind": "metricTable",
          "ownership": "moduleOwned",
          "fields": [
            {
              "fieldId": "metricId",
              "type": "string",
              "required": true,
              "description": "Identificador único do registro de métrica."
            },
            {
              "fieldId": "referenceMonth",
              "type": "string",
              "required": true,
              "description": "Mês de referência no formato YYYY-MM."
            },
            {
              "fieldId": "corretorId",
              "type": "string",
              "required": false,
              "description": "ID do corretor (null para totais globais)."
            },
            {
              "fieldId": "totalLeads",
              "type": "integer",
              "required": true,
              "description": "Total de leads criados no mês."
            },
            {
              "fieldId": "leadsByStage",
              "type": "object",
              "required": true,
              "description": "Contagem de leads por etapa do funil (novo, contato, visita, proposta, fechado, perdido)."
            },
            {
              "fieldId": "computedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora do último cálculo da métrica."
            }
          ]
        },
        "DealPipelineMetric": {
          "title": "Métrica: Pipeline de Fechamentos",
          "description": "Tabela de métrica com volume e valor total de negócios por etapa do funil de fechamento, atualizada a cada transição de etapa.",
          "kind": "metricTable",
          "ownership": "moduleOwned",
          "fields": [
            {
              "fieldId": "metricId",
              "type": "string",
              "required": true,
              "description": "Identificador único do registro de métrica."
            },
            {
              "fieldId": "referenceMonth",
              "type": "string",
              "required": true,
              "description": "Mês de referência no formato YYYY-MM."
            },
            {
              "fieldId": "corretorId",
              "type": "string",
              "required": false,
              "description": "ID do corretor (null para totais globais)."
            },
            {
              "fieldId": "stage",
              "type": "enum(proposta,negociacao,contrato,fechado,perdido)",
              "required": true,
              "description": "Etapa do funil de fechamento."
            },
            {
              "fieldId": "dealCount",
              "type": "integer",
              "required": true,
              "description": "Número de negócios na etapa."
            },
            {
              "fieldId": "totalValue",
              "type": "number",
              "required": true,
              "description": "Valor total dos negócios na etapa em reais."
            },
            {
              "fieldId": "computedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora do último cálculo da métrica."
            }
          ]
        },
        "LeadConversionMetric": {
          "title": "Métrica: Taxa de Conversão de Leads",
          "description": "Tabela de métrica com percentual de leads que avançaram para proposta ou fechamento, segmentada por corretor e período.",
          "kind": "metricTable",
          "ownership": "moduleOwned",
          "fields": [
            {
              "fieldId": "metricId",
              "type": "string",
              "required": true,
              "description": "Identificador único do registro de métrica."
            },
            {
              "fieldId": "referenceMonth",
              "type": "string",
              "required": true,
              "description": "Mês de referência no formato YYYY-MM."
            },
            {
              "fieldId": "corretorId",
              "type": "string",
              "required": false,
              "description": "ID do corretor (null para totais globais)."
            },
            {
              "fieldId": "totalLeads",
              "type": "integer",
              "required": true,
              "description": "Total de leads no período."
            },
            {
              "fieldId": "convertedToProposal",
              "type": "integer",
              "required": true,
              "description": "Leads que avançaram para etapa de proposta."
            },
            {
              "fieldId": "convertedToClosed",
              "type": "integer",
              "required": true,
              "description": "Leads que chegaram ao fechamento."
            },
            {
              "fieldId": "conversionRateProposal",
              "type": "number",
              "required": true,
              "description": "Taxa de conversão para proposta (0-100%)."
            },
            {
              "fieldId": "conversionRateClosed",
              "type": "number",
              "required": true,
              "description": "Taxa de conversão para fechamento (0-100%)."
            },
            {
              "fieldId": "computedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora do último cálculo da métrica."
            }
          ]
        },
        "VisitsPerMonthMetric": {
          "title": "Métrica: Visitas Realizadas no Mês",
          "description": "Tabela de métrica com contagem de visitas realizadas no mês, segmentada por corretor e imóvel.",
          "kind": "metricTable",
          "ownership": "moduleOwned",
          "fields": [
            {
              "fieldId": "metricId",
              "type": "string",
              "required": true,
              "description": "Identificador único do registro de métrica."
            },
            {
              "fieldId": "referenceMonth",
              "type": "string",
              "required": true,
              "description": "Mês de referência no formato YYYY-MM."
            },
            {
              "fieldId": "corretorId",
              "type": "string",
              "required": false,
              "description": "ID do corretor (null para totais globais)."
            },
            {
              "fieldId": "totalScheduled",
              "type": "integer",
              "required": true,
              "description": "Total de visitas agendadas no mês."
            },
            {
              "fieldId": "totalRealized",
              "type": "integer",
              "required": true,
              "description": "Total de visitas realizadas no mês."
            },
            {
              "fieldId": "totalCancelled",
              "type": "integer",
              "required": true,
              "description": "Total de visitas canceladas no mês."
            },
            {
              "fieldId": "realizationRate",
              "type": "number",
              "required": true,
              "description": "Taxa de realização de visitas (0-100%)."
            },
            {
              "fieldId": "computedAt",
              "type": "datetime",
              "required": true,
              "description": "Data e hora do último cálculo da métrica."
            }
          ]
        }
      }
    },
    "relationships": [
      {
        "relationshipId": "rel-lead-corretor",
        "fromEntity": "Lead",
        "toEntity": "Corretor",
        "type": "manyToOne",
        "description": "Cada lead é atribuído a um corretor responsável. Um corretor pode ter múltiplos leads."
      },
      {
        "relationshipId": "rel-visit-property",
        "fromEntity": "Visit",
        "toEntity": "Property",
        "type": "manyToOne",
        "description": "Cada visita é realizada em um imóvel específico. Um imóvel pode ter múltiplas visitas."
      },
      {
        "relationshipId": "rel-visit-lead",
        "fromEntity": "Visit",
        "toEntity": "Lead",
        "type": "manyToOne",
        "description": "Cada visita é associada a um lead/cliente. Um lead pode ter múltiplas visitas."
      },
      {
        "relationshipId": "rel-visit-corretor",
        "fromEntity": "Visit",
        "toEntity": "Corretor",
        "type": "manyToOne",
        "description": "Cada visita é conduzida por um corretor. Um corretor pode conduzir múltiplas visitas."
      },
      {
        "relationshipId": "rel-deal-property",
        "fromEntity": "Deal",
        "toEntity": "Property",
        "type": "manyToOne",
        "description": "Cada negócio está vinculado a um imóvel específico. Um imóvel pode ter múltiplos negócios ao longo do tempo."
      },
      {
        "relationshipId": "rel-deal-lead",
        "fromEntity": "Deal",
        "toEntity": "Lead",
        "type": "manyToOne",
        "description": "Cada negócio está vinculado a um lead/cliente. Um lead pode ter múltiplos negócios."
      },
      {
        "relationshipId": "rel-deal-corretor",
        "fromEntity": "Deal",
        "toEntity": "Corretor",
        "type": "manyToOne",
        "description": "Cada negócio é gerenciado por um corretor responsável."
      },
      {
        "relationshipId": "rel-property-corretor",
        "fromEntity": "Property",
        "toEntity": "Corretor",
        "type": "manyToOne",
        "description": "Um imóvel pode ser atribuído a um corretor responsável pela captação/venda."
      },
      {
        "relationshipId": "rel-lead-stage-event-lead",
        "fromEntity": "LeadStageTransitionEvent",
        "toEntity": "Lead",
        "type": "manyToOne",
        "description": "Cada evento de transição de etapa pertence a um lead específico."
      },
      {
        "relationshipId": "rel-deal-stage-event-deal",
        "fromEntity": "DealStageTransitionEvent",
        "toEntity": "Deal",
        "type": "manyToOne",
        "description": "Cada evento de transição de etapa pertence a um negócio específico."
      },
      {
        "relationshipId": "rel-visit-status-event-visit",
        "fromEntity": "VisitStatusTransitionEvent",
        "toEntity": "Visit",
        "type": "manyToOne",
        "description": "Cada evento de transição de status pertence a uma visita específica."
      },
      {
        "relationshipId": "rel-property-status-event-property",
        "fromEntity": "PropertyStatusTransitionEvent",
        "toEntity": "Property",
        "type": "manyToOne",
        "description": "Cada evento de transição de status pertence a um imóvel específico."
      },
      {
        "relationshipId": "rel-property-desc-cmd-property",
        "fromEntity": "PropertyDescriptionCommand",
        "toEntity": "Property",
        "type": "manyToOne",
        "description": "Cada comando de geração de descrição está vinculado a um imóvel."
      },
      {
        "relationshipId": "rel-lead-class-cmd-lead",
        "fromEntity": "LeadClassificationCommand",
        "toEntity": "Lead",
        "type": "manyToOne",
        "description": "Cada comando de classificação está vinculado a um lead."
      },
      {
        "relationshipId": "rel-followup-cmd-lead",
        "fromEntity": "FollowUpSuggestionCommand",
        "toEntity": "Lead",
        "type": "manyToOne",
        "description": "Cada comando de sugestão de follow-up está vinculado a um lead."
      }
    ]
  }
} as const;

export default modulePlan;
