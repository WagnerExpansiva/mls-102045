/// <mls fileReference="_102045_/l5/propertyFlowCrm/module.defs.ts" enhancement="_blank"/>

export const modulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "module",
  "artifactId": "propertyFlowCrm",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "module": {
      "moduleName": "propertyFlowCrm",
      "purpose": "Organizar imóveis, leads e visitas para aumentar a conversão em corretagem imobiliária.",
      "businessDomain": "CRM imobiliário para pequenas imobiliárias e corretores autônomos",
      "languages": [
        "pt-BR",
        "en"
      ],
      "visualStyle": {
        "tone": "moderno e clean",
        "layout": "cards e painéis com foco em produtividade",
        "palette": [
          "#1F6FEB",
          "#F7F9FB",
          "#111827",
          "#10B981"
        ]
      }
    },
    "actors": [
      {
        "actorId": "corretor",
        "title": "Corretor",
        "description": "Cadastra imóveis, atende leads, agenda visitas e acompanha propostas."
      },
      {
        "actorId": "gestor",
        "title": "Gestor",
        "description": "Acompanha métricas, pipeline e desempenho da equipe."
      }
    ],
    "capabilities": [
      {
        "capabilityId": "manageProperties",
        "title": "CRUD de imóveis com busca",
        "description": "Cadastrar, editar, remover e buscar imóveis com endereço, tipo, preço, status, características e fotos mock.",
        "actor": "corretor",
        "priority": "now"
      },
      {
        "capabilityId": "manageLeads",
        "title": "Pipeline de leads (kanban)",
        "description": "Gerenciar leads/clientes em colunas de estágio, atualizar dados e notas.",
        "actor": "corretor",
        "priority": "now"
      },
      {
        "capabilityId": "scheduleVisits",
        "title": "Agendador de visitas",
        "description": "Criar, reagendar e cancelar visitas vinculadas a imóvel e lead.",
        "actor": "corretor",
        "priority": "now"
      },
      {
        "capabilityId": "trackDeals",
        "title": "Rastreador de negócios por etapas",
        "description": "Acompanhar propostas/negócios por status e valor vinculados ao imóvel.",
        "actor": "corretor",
        "priority": "now"
      },
      {
        "capabilityId": "viewDashboard",
        "title": "Dashboard com métricas básicas",
        "description": "Visualizar imóveis ativos, leads do mês e pipeline de fechamentos.",
        "actor": "gestor",
        "priority": "now"
      },
      {
        "capabilityId": "aiPropertyDescription",
        "title": "IA para descrição de imóvel",
        "description": "Gerar descrição a partir de bullets informados pelo corretor.",
        "actor": "corretor",
        "priority": "soon"
      },
      {
        "capabilityId": "aiLeadScoring",
        "title": "IA para qualificação e follow-up",
        "description": "Classificar lead como quente/morno/frio a partir de anotações e sugerir próxima mensagem.",
        "actor": "corretor",
        "priority": "soon"
      }
    ],
    "ontology": {
      "entities": {
        "Property": {
          "title": "Imóvel",
          "description": "Unidade imobiliária cadastrada para venda ou locação, com atributos, status e mídia."
        },
        "Lead": {
          "title": "Lead/Cliente",
          "description": "Pessoa interessada com dados de contato, notas, estágio e temperatura."
        },
        "Visit": {
          "title": "Visita/Agendamento",
          "description": "Agendamento de visita vinculada a um lead e um imóvel, com data, hora e status."
        },
        "Deal": {
          "title": "Negócio/Proposta",
          "description": "Compromisso comercial entre lead e imóvel, com valor e etapa do pipeline."
        },
        "Broker": {
          "title": "Corretor",
          "description": "Usuário responsável pelo atendimento e gestão do funil."
        }
      }
    },
    "relationships": [
      {
        "relationshipId": "relLeadBroker",
        "fromEntity": "Lead",
        "toEntity": "Broker",
        "type": "assigned_to",
        "description": "Lead é atendido por um corretor."
      },
      {
        "relationshipId": "relPropertyBroker",
        "fromEntity": "Property",
        "toEntity": "Broker",
        "type": "owned_by",
        "description": "Imóvel é gerido por um corretor responsável."
      },
      {
        "relationshipId": "relVisitLead",
        "fromEntity": "Visit",
        "toEntity": "Lead",
        "type": "references",
        "description": "Visita está ligada a um lead."
      },
      {
        "relationshipId": "relVisitProperty",
        "fromEntity": "Visit",
        "toEntity": "Property",
        "type": "references",
        "description": "Visita está ligada a um imóvel."
      },
      {
        "relationshipId": "relDealLead",
        "fromEntity": "Deal",
        "toEntity": "Lead",
        "type": "references",
        "description": "Negócio está ligado a um lead."
      },
      {
        "relationshipId": "relDealProperty",
        "fromEntity": "Deal",
        "toEntity": "Property",
        "type": "references",
        "description": "Negócio está ligado a um imóvel."
      }
    ]
  }
} as const;

export default modulePlan;
