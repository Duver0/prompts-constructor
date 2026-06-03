# Prompt Architect — Architecture Overview

## System Context

Prompt Architect is a visual prompt engineering platform deployed as a static site on GitHub Pages. Users build, compose, version, organize, and export structured prompts for AI models (ChatGPT, Claude, Gemini, custom agents).

```
┌─────────────────────────────────────────────────────────────┐
│                    Prompt Architect                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Static SPA (React + Vite)               │  │
│  │                                                      │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │  │
│  │  │ Prompt   │ │ Prompt  │ │ Version  │ │ Export │ │  │
│  │  │ Builder  │ │ Library │ │ History  │ │ Center │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘ │  │
│  │                                                      │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │         Zustand State Management                 │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │         Domain Model (TypeScript)                │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           localStorage / IndexedDB                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Architecture Style

**Clean Architecture with Feature-Based Modular Organization**

```
src/
├── domain/           # Enterprise business rules (zero dependencies)
│   ├── entities/
│   ├── value-objects/
│   ├── aggregates/
│   ├── services/     # Interfaces only
│   ├── events/
│   ├── repositories/ # Interfaces only
│   └── rules/        # Pure business rule functions
├── application/      # Use cases and application services
│   ├── use-cases/
│   ├── ports/        # Input/output interfaces
│   └── services/
├── infrastructure/   # Frameworks, storage, adapters
│   ├── persistence/  # Repository implementations
│   ├── animation/    # Anime.js adapters
│   └── utils/
├── presentation/     # React UI layer
│   ├── features/     # Feature-based modules
│   │   ├── prompt-builder/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── prompt-library/
│   │   ├── version-history/
│   │   ├── export-center/
│   │   └── shared/
│   ├── routing/
│   ├── layouts/
│   ├── theme/        # Design tokens, TailwindCSS
│   └── App.tsx
└── config/           # Vite, TypeScript, TailwindCSS
```

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Feature-based modules | Clear boundaries, independent development |
| Zustand over Redux | Minimal boilerplate, sliced stores, TypeScript-native |
| Anime.js for animations | Lightweight, declarative, timeline support |
| Clean Architecture layers | Testability, framework independence, DIP |
| GitHub Pages deployment | Zero infrastructure cost, CDN delivery |
| Bun runtime | Fast package management, TypeScript-native |
| Architecture Guardian agent | Prevents architectural erosion, enforces ADRs, veto authority |
| Architecture-before-code validation | Catches design violations before implementation cost incurred |
| Prompt Engineer agent | Domain authority for prompt architecture, composition, validation, export, and quality |
| Sequential spec → design flow | Prompt Engineer defines domain specs before Domain Modeler formalizes and UX/UI designs |

## Agent Ecosystem Architecture

```
                    ┌──────────────────┐
                    │   Orchestrator   │ (owns lifecycle)
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼───┐  ┌──────▼──────┐  ┌───▼──────────┐
     │   Product  │  │   Prompt    │  │    UX/UI     │
     │  Analyst   │  │   Engineer  │  │  Architect   │
     └────────────┘  └──────┬───────┘  └──────┬───────┘
                            │                 │
                            └────────┬────────┘
                                     │
                            ┌────────▼─────────┐
                            │     Domain       │
                            │    Modeler       │
                            └────────┬─────────┘
                                     │
                            ┌────────▼─────────┐
                            │   Architecture   │ (veto authority,
                            │    Guardian      │  governance gate)
                            └────────┬─────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
     ┌────────▼───┐        ┌────────▼──────┐       ┌───────▼────────┐
     │  Frontend  │        │   Testing     │       │     DevOps     │
     │ Architect  │        │  Architect    │       │    Engineer    │
     └────────────┘        └───────────────┘       └────────────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
     ┌────────▼───┐        ┌────────▼──────┐
     │    Code    │        │Documentation  │
     │  Reviewer  │        │   Agent       │
     └────────────┘        └───────────────┘
```

## Communication Flow

1. User provides specification to Orchestrator
2. Orchestrator breaks work into phases
3. Product Analyst analyzes requirements and produces stories
4. **Prompt Engineer defines prompt domain specifications** (for prompt-related features)
5. Domain Modeler formalizes domain into TypeScript entities (informed by Prompt Engineer)
6. UX/UI Architect designs user experience (informed by Prompt Engineer)
7. **Architecture Guardian validates architecture integrity (pre-implementation gate)**
8. Frontend Architect implements components, stores, and hooks
9. Testing Architect writes and validates tests
10. **Architecture Guardian validates architecture integrity (pre-code-review gate)**
11. Code Reviewer validates final output
12. Documentation Agent records decisions and updates docs
13. Orchestrator presents aggregated result to user

## Execution Order (Full Flow)

```
Analysis → Prompt Domain Spec (if prompt feature) → Design (Domain Modeler + UX/UI)
     ↑                                                        |
     └── rework ──────────────────────────── Architecture Guardian (Gate 1)
                                                      |
                                                      ↓
                                           Implementation (Frontend Architect)
                                                      |
                                                      ↓
                                           Testing (Testing Architect)
                                                      |
                                                      ↓
                                           Architecture Guardian (Gate 2)
                                                      |
                                                      ↓
                                           Code Reviewer → Documentation → Release
```

Architecture Guardian executes twice: once before implementation (validating design + domain specifications) and again before Code Reviewer (validating implementation architecture). The Prompt Engineer feeds domain specifications into both the Domain Modeler and UX/UI Architect before Architecture Guardian Gate 1.
