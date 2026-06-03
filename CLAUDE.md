# Prompt Architect - Project Guide

## Stack
- **Runtime**: Bun 1.x
- **Frontend**: React 19 + TypeScript 6 (strict)
- **Build**: Vite 8 + TailwindCSS 4
- **State**: Zustand 5 + Immer
- **Routing**: React Router 7
- **Testing**: Vitest + React Testing Library + Playwright
- **Animation**: Anime.js 4

## Commands
- `bun run dev` — Start dev server (port 3000)
- `bun run build` — TypeScript check + production build
- `bun run typecheck` — TypeScript strict check
- `bun run lint` — ESLint
- `bun run test` — Vitest unit/integration tests
- `bun run test:e2e` — Playwright E2E tests
- `bun run test:coverage` — Tests with coverage report

## Architecture
Clean Architecture with feature-based modules:
```
src/
├── domain/           # Business logic (zero dependencies)
├── application/      # Use cases
├── infrastructure/   # Adapters (localStorage, Anime.js)
└── presentation/     # React UI (feature-based)
```

## Key Rules
- Domain layer must have ZERO external imports
- No `any` types allowed
- All components must be functional with hooks
- Lazy-load all feature routes
- Anime.js encapsulated in custom hooks only
- Follow GitFlow branching strategy
- Use semantic commits (feat:, fix:, chore:, docs:, spec:, refactor:, test:)

## Agent Ecosystem
This project uses ASDD (Agentic Spec-Driven Development). See `.opencode/` for agent definitions, contracts, and workflows.
