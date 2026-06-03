# Prompt Architect

A visual prompt engineering platform that enables users to create, compose, organize, validate, optimize, version, and export structured prompts for modern AI systems (ChatGPT, Claude, Gemini, OpenRouter, and custom AI agents).

## Overview

Prompt Architect replaces manual text editing with reusable visual blocks, making prompt engineering systematic, repeatable, and collaborative. The application is a client-side single-page application deployed as a static site via GitHub Pages.

## Key Features

- **Visual Block Editor** — Drag-and-drop prompt construction with reusable blocks
- **Prompt Management** — Create, edit, duplicate, archive, and organize prompts
- **Block Types** — Role, Context, Objective, Constraints, Examples, Output Format, Variables, Notes
- **Templates** — Reusable prompt structures across 8 categories
- **Validation** — Structural, semantic, and variable consistency checks
- **Optimization** — Clarity analysis, ambiguity detection, redundancy detection
- **Versioning** — Draft → Published → Archive lifecycle with diff and rollback
- **Multi-Provider Export** — ChatGPT, Claude, Gemini, OpenRouter, Markdown, JSON

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **Bun** | Package manager and runtime |
| **React** 18+ | UI library |
| **TypeScript** (strict) | Type safety |
| **Vite** | Build tool |
| **TailwindCSS** | Styling |
| **Zustand** | State management |
| **Anime.js** | Intentional animations |
| **React Router** 6+ | Client-side routing |
| **Vitest** + RTL | Unit/component tests |
| **Playwright** | E2E tests |

## Architecture

The project follows **Clean Architecture** with feature-based modular organization:

```
src/
├── domain/           # Business logic (zero dependencies)
├── application/      # Use cases
├── infrastructure/   # Adapters (localStorage, Anime.js wrappers)
└── presentation/     # React UI with feature modules
```

## Development

### Prerequisites

- **Bun** v1.x — [Install Bun](https://bun.sh/docs/installation)
- **Node.js** v20+ LTS

### Quick Start

```bash
bun install
bun run dev        # Start development server
bun run typecheck  # TypeScript check
bun run lint       # ESLint
bun run test       # Run all tests
bun run build      # Production build
```

## Development Methodology

This project follows **Agentic Spec-Driven Development (ASDD)** — a multi-agent approach where:

1. **Orchestrator** coordinates the entire lifecycle
2. **Specialist agents** handle domain-specific work
3. **Architecture Guardian** enforces governance rules
4. **All work begins with specification, not code**

See [SPECIFICATION.md](./SPECIFICATION.md) for the complete master specification.
See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.
See [.opencode/docs/](./.opencode/docs/) for architecture documentation.

## Project Status

**Phase: Specification** — The complete product specification has been created. Implementation has not yet begun.

| Phase | Status |
|-------|--------|
| Product Specification | ✅ Complete |
| Architecture Decisions | ✅ Complete (4 ADRs) |
| Agent Ecosystem | ✅ Complete (11 agents) |
| Implementation | ⏳ Not started |
| Testing | ⏳ Not started |
| Deployment | ⏳ Not started |

## License

This project is licensed under the terms specified in the repository.
