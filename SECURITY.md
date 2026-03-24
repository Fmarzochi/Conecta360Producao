# Política de Segurança — Conecta360 Produção

## Compromisso com a Segurança
A segurança do ecossistema **Conecta360** é tratada com tolerância zero a falhas. Como este repositório lida com o ambiente de produção, agradecemos a colaboração de pesquisadores para manter a blindagem dos dados.

## Versões Suportadas
Apenas a branch principal (main/master) de produção recebe patches de segurança ativos.

| Versão | Suportada |
| :--- | :--- |
| **Production (Latest)** | ✅ Sim |
| Development / Beta | ⚠️ Limitada |

## Como reportar uma vulnerabilidade
**NÃO abra Issues públicas para reportar vulnerabilidades de segurança.**

Se você identificar qualquer brecha, envie um e-mail imediatamente para o mantenedor:
- **Contato:** [Seu E-mail de Suporte Aqui]

Seguimos o protocolo de "Responsible Disclosure":
1. Confirmaremos o recebimento em até 24 horas.
2. Forneceremos uma estimativa de correção.
3. Solicitamos que a falha não seja divulgada publicamente até que o patch de correção seja aplicado em produção.

## Arquitetura de Proteção
- **Autenticação:** JWT com Refresh Token e rotação de chaves.
- **Persistência:** Proteção nativa contra SQL Injection via ORM/Prepared Statements.
- **Segredos:** Credenciais sensíveis são injetadas via Variáveis de Ambiente (não versionadas).
