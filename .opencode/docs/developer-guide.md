# Prompt Architect — Developer Guide

## Prerequisites

- **Bun** v1.x (package manager and runtime)
- **Node.js** v20+ LTS
- **Git**

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd prompts-constructor

# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun run test

# Run typecheck
bun run typecheck

# Run linter
bun run lint

# Build for production
bun run build
```

## Project Structure

```
src/
├── domain/           # Business logic, zero dependencies
├── application/      # Use cases and application services
├── infrastructure/   # Storage, adapters, utilities
├── presentation/     # React UI
│   ├── features/     # Feature modules
│   ├── routing/      # Route definitions
│   ├── layouts/      # Page layouts
│   └── theme/        # TailwindCSS configuration
└── config/           # Build and tool configuration

.opencode/
├── agents/           # Agent specifications
├── skills/           # Reusable skill definitions
├── workflows/        # Process workflows
├── standards/        # Governance documents
├── contracts/        # Agent interface contracts
├── templates/        # Document templates
├── checklists/       # Quality checklists
└── docs/             # Architecture documentation
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Vite dev server with HMR |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |
| `bun run typecheck` | TypeScript type checking |
| `bun run lint` | ESLint analysis |
| `bun run lint:fix` | ESLint auto-fix |
| `bun run test` | Run all tests |
| `bun run test:unit` | Unit tests only |
| `bun run test:integration` | Integration tests only |
| `bun run test:e2e` | Playwright E2E tests |
| `bun run test:coverage` | Tests with coverage report |
| `bun run test:ui` | Vitest UI mode |

## Technology Stack

- **Bun** — Package manager and runtime
- **TypeScript** — Strict mode
- **React** 18+ — UI library
- **Vite** — Build tool
- **TailwindCSS** — Utility-first CSS
- **Zustand** — State management
- **Anime.js** — Animation library
- **React Router** — Client-side routing
- **Vitest** — Test runner
- **React Testing Library** — Component testing
- **Playwright** — E2E testing

## Development Workflow

1. Branch from `develop`: `git checkout -b feat/my-feature`
2. Follow the New Feature workflow (`.opencode/workflows/new-feature.md`)
3. Implement changes with conventional commits
4. Push and create PR to `develop`
5. Ensure CI passes and Code Reviewer approves
6. Squash merge with conventional commit message

## Commit Convention

```
type(scope): description

Types: feat, fix, refactor, test, docs, chore, style, perf
Scope: component, feature, domain, infrastructure, config, ci
```

## Agent-Driven Development

This project uses an Agentic Spec-Driven Development (ASDD) approach. All work is coordinated through the agent ecosystem defined in `.opencode/`. The Orchestrator Agent interprets user requests, breaks them into tasks, delegates to specialist agents, and validates outputs.

**Key principle**: All agent communication flows through the Orchestrator. No agent invokes another directly.
