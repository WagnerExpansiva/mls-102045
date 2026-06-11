/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/Corretor.defs.ts" enhancement="_blank"/>

export const CorretorMdm = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmEntity",
  "artifactId": "Corretor",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdmEntity",
    "entity": "Corretor",
    "ownership": "mdmOwned",
    "generateTable": false,
    "moduleId": "manterPropertyFlowCrm",
    "domainId": "broker",
    "infrastructureModuleRef": "102034",
    "domainTitle": "Corretor",
    "sourceOfTruth": "102034",
    "governanceRules": [
      "rule-rbac-data-isolation"
    ],
    "title": "Corretor",
    "description": "Entidade mestre de corretores vinculados à imobiliária. Referenciada por Visitas, Leads e Negócios para controle de acesso e isolamento de registros por perfil.",
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
  }
} as const;

export default CorretorMdm;
