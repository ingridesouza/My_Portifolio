.PHONY: help dev prod build down logs shell migrate seed test lint clean

# Colors
YELLOW := \033[1;33m
GREEN := \033[1;32m
NC := \033[0m

help: ## Show this help
	@echo "$(GREEN)Portfolio Development Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

# Development
dev: ## Start development environment
	docker-compose -f docker-compose.dev.yml up -d
	@echo "$(GREEN)Development environment started!$(NC)"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend:  http://localhost:8000"
	@echo "Admin:    http://localhost:8000/admin"

dev-build: ## Build and start development environment
	docker-compose -f docker-compose.dev.yml up -d --build

dev-logs: ## Show development logs
	docker-compose -f docker-compose.dev.yml logs -f

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

# Production
prod: ## Start production environment
	docker-compose up -d

prod-build: ## Build and start production environment
	docker-compose up -d --build

prod-down: ## Stop production environment
	docker-compose down

# Database
migrate: ## Run Django migrations
	docker-compose -f docker-compose.dev.yml exec backend python manage.py migrate

makemigrations: ## Create new migrations
	docker-compose -f docker-compose.dev.yml exec backend python manage.py makemigrations

seed: ## Seed database with initial data
	docker-compose -f docker-compose.dev.yml exec backend python manage.py seed_data

# Shell access
shell-backend: ## Access backend shell
	docker-compose -f docker-compose.dev.yml exec backend python manage.py shell

shell-db: ## Access database shell
	docker-compose -f docker-compose.dev.yml exec db psql -U postgres -d portfolio_db

shell-frontend: ## Access frontend shell
	docker-compose -f docker-compose.dev.yml exec frontend sh

# Django Admin
createsuperuser: ## Create Django superuser
	docker-compose -f docker-compose.dev.yml exec backend python manage.py createsuperuser

# Testing
test-backend: ## Run backend tests
	docker-compose -f docker-compose.dev.yml exec backend python manage.py test

test-frontend: ## Run frontend tests
	docker-compose -f docker-compose.dev.yml exec frontend npm test

# Linting
lint-backend: ## Lint backend code
	docker-compose -f docker-compose.dev.yml exec backend flake8 .

lint-frontend: ## Lint frontend code
	docker-compose -f docker-compose.dev.yml exec frontend npm run lint

# GitHub sync
github-sync: ## Trigger GitHub sync manually
	docker-compose -f docker-compose.dev.yml exec backend python manage.py sync_github

# Cleanup
clean: ## Remove all containers, volumes, and images
	docker-compose -f docker-compose.dev.yml down -v --rmi local
	docker-compose down -v --rmi local

# Logs
logs: ## Show all logs
	docker-compose -f docker-compose.dev.yml logs -f

logs-backend: ## Show backend logs
	docker-compose -f docker-compose.dev.yml logs -f backend

logs-frontend: ## Show frontend logs
	docker-compose -f docker-compose.dev.yml logs -f frontend

# Static files
collectstatic: ## Collect static files
	docker-compose -f docker-compose.dev.yml exec backend python manage.py collectstatic --noinput

# Install dependencies
install-backend: ## Install backend dependencies
	docker-compose -f docker-compose.dev.yml exec backend pip install -r requirements/dev.txt

install-frontend: ## Install frontend dependencies
	docker-compose -f docker-compose.dev.yml exec frontend npm install
