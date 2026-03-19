#!/usr/bin/env bash
# =============================================================================
# CONECTA360 - Gerenciador do banco de dados local
# Uso: bash infra/scripts/db.sh <comando>
# =============================================================================

set -euo pipefail

DOCKER_COMPOSE="docker compose -f infra/docker/docker-compose.yml"
ENV_FILE="infra/docker/.env"
ENV_EXAMPLE="infra/docker/.env.example"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

_require_env() {
  if [ ! -f "$ENV_FILE" ]; then
    echo ""
    echo "  ❌  Arquivo $ENV_FILE não encontrado."
    echo "  👉  Execute primeiro: bash infra/scripts/db.sh setup"
    echo ""
    exit 1
  fi
}

_get_env() {
  grep "^${1}=" "$ENV_FILE" | cut -d= -f2
}

# ---------------------------------------------------------------------------
# Comandos
# ---------------------------------------------------------------------------

cmd_setup() {
  if [ ! -f "$ENV_FILE" ]; then
    cp "$ENV_EXAMPLE" "$ENV_FILE"
    echo ""
    echo "  ✅  Arquivo $ENV_FILE criado."
    echo "  ⚠️   Edite suas credenciais antes de continuar: $ENV_FILE"
    echo ""
  else
    echo ""
    echo "  ℹ️   $ENV_FILE já existe. Nenhuma alteração feita."
    echo ""
  fi
}

cmd_up() {
  _require_env
  $DOCKER_COMPOSE --env-file "$ENV_FILE" up -d

  echo ""
  echo "  ⏳  Aguardando MongoDB ficar pronto..."

  local retries=30
  until $DOCKER_COMPOSE --env-file "$ENV_FILE" exec -T mongodb \
      mongosh --quiet --eval "db.adminCommand('ping').ok" &>/dev/null; do
    retries=$((retries - 1))
    if [ "$retries" -eq 0 ]; then
      echo "  ❌  Timeout: MongoDB não respondeu a tempo."
      exit 1
    fi
    sleep 2
  done

  echo "  ✅  MongoDB pronto       → mongodb://localhost:$(_get_env MONGO_PORT)"
  echo "  🌐  Mongo Express (GUI)  → http://localhost:$(_get_env MONGO_EXPRESS_PORT)"
  echo ""
  echo "  ⏳  Aguardando Prisma aplicar o schema (pode demorar na 1ª execução)..."

  local prisma_retries=90
  until [ "$(docker inspect --format='{{.State.Status}}' conecta360-prisma-migrate 2>/dev/null)" = "exited" ]; do
    prisma_retries=$((prisma_retries - 1))
    if [ "$prisma_retries" -eq 0 ]; then
      echo "  ⚠️   Prisma ainda está rodando em background."
      echo "       Acompanhe com: docker logs -f conecta360-prisma-migrate"
      echo ""
      return 0
    fi
    sleep 2
  done

  local exit_code
  exit_code=$(docker inspect --format='{{.State.ExitCode}}' conecta360-prisma-migrate 2>/dev/null || echo "1")
  if [ "$exit_code" = "0" ]; then
    echo "  ✅  Prisma schema aplicado com sucesso."
  else
    echo "  ❌  Prisma falhou (exit $exit_code). Veja: docker logs conecta360-prisma-migrate"
  fi
  echo ""
}

cmd_down() {
  _require_env
  $DOCKER_COMPOSE --env-file "$ENV_FILE" down
  echo ""
  echo "  ⏹️   Containers parados. Os dados continuam salvos."
  echo ""
}

cmd_logs() {
  _require_env
  $DOCKER_COMPOSE --env-file "$ENV_FILE" logs -f mongodb
}

cmd_status() {
  _require_env
  $DOCKER_COMPOSE --env-file "$ENV_FILE" ps
}

cmd_shell() {
  _require_env
  $DOCKER_COMPOSE --env-file "$ENV_FILE" exec mongodb \
    mongosh \
    -u "$(_get_env MONGO_ROOT_USER)" \
    -p "$(_get_env MONGO_ROOT_PASSWORD)" \
    --authenticationDatabase admin
}

cmd_backup() {
  _require_env
  local backup_dir="infra/docker/backups"
  local timestamp
  timestamp=$(date +"%Y%m%d_%H%M%S")
  local backup_file="${backup_dir}/backup_${timestamp}.gz"

  mkdir -p "$backup_dir"

  $DOCKER_COMPOSE --env-file "$ENV_FILE" exec -T mongodb \
    mongodump \
    --username "$(_get_env MONGO_ROOT_USER)" \
    --password "$(_get_env MONGO_ROOT_PASSWORD)" \
    --authenticationDatabase admin \
    --db "$(_get_env MONGO_DB_NAME)" \
    --archive \
    --gzip > "$backup_file"

  echo ""
  echo "  ✅  Backup salvo em: $backup_file"
  echo ""
}

cmd_migrate() {
  _require_env
  echo ""
  echo "  ⏳  Reaplicando schema Prisma..."
  $DOCKER_COMPOSE --env-file "$ENV_FILE" run --rm prisma-migrate \
    sh -c "npm install --silent && npx prisma db push"
  echo ""
  echo "  ✅  Schema Prisma aplicado."
  echo ""
}

cmd_prisma_logs() {
  _require_env
  docker logs -f conecta360-prisma-migrate
}

cmd_reset() {
  _require_env
  echo ""
  echo "  ⚠️   ATENÇÃO: todos os dados serão APAGADOS permanentemente."
  echo "  ℹ️   O cache do node_modules do Prisma será preservado."
  echo ""
  read -rp "  Digite 'sim' para confirmar: " confirm
  if [ "$confirm" = "sim" ]; then
    $DOCKER_COMPOSE --env-file "$ENV_FILE" down
    docker volume rm conecta360-mongodb-data 2>/dev/null || true
    $DOCKER_COMPOSE --env-file "$ENV_FILE" up -d
    echo ""
    echo "  ✅  Banco recriado com sucesso."
    echo ""
  else
    echo "  Operação cancelada."
  fi
}

cmd_help() {
  echo ""
  echo "  CONECTA360 — Comandos disponíveis:"
  echo ""
  echo "  bash infra/scripts/db.sh setup     Primeira execução: cria o .env local"
  echo "  bash infra/scripts/db.sh up        Sobe MongoDB, aplica schema Prisma e Mongo Express"
  echo "  bash infra/scripts/db.sh down      Para os containers (dados persistem)"
  echo "  bash infra/scripts/db.sh logs      Exibe logs em tempo real do MongoDB"
  echo "  bash infra/scripts/db.sh migrate      Reaplica o schema Prisma manualmente"
  echo "  bash infra/scripts/db.sh prisma-logs  Exibe logs do container Prisma em tempo real"
  echo "  bash infra/scripts/db.sh status       Verifica status dos containers"
  echo "  bash infra/scripts/db.sh shell     Abre o mongosh interativo"
  echo "  bash infra/scripts/db.sh backup    Exporta os dados para infra/docker/backups/"
  echo "  bash infra/scripts/db.sh reset     ⚠️  Apaga todos os dados e recria"
  echo "  bash infra/scripts/db.sh help      Exibe esta mensagem"
  echo ""
}

# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

case "${1:-help}" in
  setup)        cmd_setup       ;;
  up)           cmd_up          ;;
  down)         cmd_down        ;;
  logs)         cmd_logs        ;;
  migrate)      cmd_migrate     ;;
  prisma-logs)  cmd_prisma_logs ;;
  status)       cmd_status      ;;
  shell)        cmd_shell       ;;
  backup)       cmd_backup      ;;
  reset)        cmd_reset       ;;
  help)         cmd_help        ;;
  *)
    echo "  ❌  Comando desconhecido: '${1}'"
    cmd_help
    exit 1
    ;;
esac
