/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/Lead.defs.ts" enhancement="_blank"/>

export const LeadMdm = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmEntity",
  "artifactId": "Lead",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdmEntity",
    "entity": "Lead",
    "ownership": "mdmOwned",
    "generateTable": false,
    "moduleId": "manterPropertyFlowCrm",
    "domainId": "lead",
    "infrastructureModuleRef": "102034",
    "domainTitle": "Lead / Cliente",
    "sourceOfTruth": "102034",
    "governanceRules": [
      "rule-lead-stage-transition",
      "rule-rbac-data-isolation"
    ],
    "title": "Lead / Cliente",
    "description": "Entidade mestre de leads e clientes com dados de contato, anotações, classificação de temperatura gerada por IA, histórico de interações e corretor responsável.",
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
  }
} as const;

export default LeadMdm;
