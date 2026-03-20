# =============================================================================
# CONECTA360 - MAKEFILE
# Wrapper de conveniência. Toda a lógica está em scripts/db.sh
#
# Pré-requisitos: Docker, Docker Compose, Git Bash
# Uso: make <comando>  |  Ajuda: make help
# =============================================================================

.DEFAULT_GOAL := help

DB = bash infra/scripts/db.sh

.PHONY: db-setup db-up db-down db-logs db-migrate db-prisma-logs db-status db-shell db-backup db-reset help

db-setup: ## Primeira execução: cria o .env local
	$(DB) setup

db-up: ## Sobe o MongoDB, aplica schema Prisma e Mongo Express em background
	$(DB) up

db-down: ## Para os containers (dados persistem no volume)
	$(DB) down

db-logs: ## Exibe logs em tempo real do MongoDB
	$(DB) logs

db-migrate: ## Reaplica o schema Prisma manualmente
	$(DB) migrate

db-prisma-logs: ## Exibe logs do container Prisma em tempo real
	$(DB) prisma-logs

db-status: ## Verifica o status dos containers
	$(DB) status

db-shell: ## Abre o shell interativo do MongoDB (mongosh)
	$(DB) shell

db-backup: ## Exporta os dados para infra/docker/backups/
	$(DB) backup

db-reset: ## ⚠️  DESTRÓI todos os dados e recria o banco do zero
	$(DB) reset

help: ## Lista todos os comandos disponíveis
	@bash infra/scripts/db.sh help
