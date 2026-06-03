# ADR-002: Clean Architecture

## Status
Accepted

## Context
Prompt Architect must be a maintainable, testable, and evolvable frontend application. Without a defined architecture, the codebase risks:

1. **Business logic leaking into UI components** — Prompt validation, version logic, and export formatting mixed with React code
2. **Untestable business rules** — Domain logic coupled to browser APIs or state management
3. **Rigid codebase** — Changing one feature breaks unrelated features due to tight coupling
4. **Framework lock-in** — Business logic tied to React/Zustand, making migration impossible
5. **Unclear module boundaries** — No explicit rules about what can depend on what

The application is a single-page application with no server. All data is client-side (localStorage/IndexedDB). There are no API calls. This affects Clean Architecture interpretation — the "infrastructure" layer adapts browser APIs, not external services.

## Decision
We will implement Clean Architecture with four layers and strict dependency rules:

### Layer Structure

```
┌──────────────────────────────────────┐
│          Presentation (React)         │  ─── Framework-specific UI
├──────────────────────────────────────┤
│        Infrastructure (Adapters)      │  ─── Browser API adapters
├──────────────────────────────────────┤
│         Application (Use Cases)       │  ─── Orchestration layer
├──────────────────────────────────────┤
│           Domain (Business)           │  ─── Pure business logic
└──────────────────────────────────────┘
```

### Dependency Direction

```
domain/ → (nothing)
application/ → domain/
infrastructure/ → domain/ (interfaces)
presentation/ → application/ + infrastructure/
```

### Module Organization

Combined with feature-based modularity:
```
src/
├── domain/                   # Layer 0: Zero framework dependencies
├── application/              # Layer 1: Use cases + ports
├── infrastructure/           # Layer 2: Adapters (localStorage, anime.js wrappers)
└── presentation/             # Layer 3: React components, hooks, stores
    └── features/             # Feature-based modules
        ├── prompt-editor/
        ├── prompt-library/
        ├── version-history/
        └── export-center/
```

### Layer Definitions

**Domain Layer** (`domain/`)
- Entities, Value Objects, Aggregates
- Business rules (pure functions)
- Repository interfaces (abstractions)
- Domain events
- Zero dependencies on React, Zustand, Vite, or any browser API
- Pure TypeScript only

**Application Layer** (`application/`)
- Use cases orchestrating domain operations
- Port interfaces for infrastructure
- Depends only on domain layer

**Infrastructure Layer** (`infrastructure/`)
- Repository implementations (localStorage, IndexedDB)
- Anime.js adapters (encapsulated hooks)
- Export format formatters
- Utility functions
- Depends on domain interfaces only

**Presentation Layer** (`presentation/`)
- React components (functional components)
- Zustand stores (UI state + cached domain state)
- Custom hooks
- Routing configuration
- Design system / shared components
- Depends on application and infrastructure layers

## Options Considered

### Option 1: Clean Architecture with Feature-Based Modules (selected)
- **Pros**: Layer isolation ensures testability; feature modules provide clear boundaries; dependency direction prevents architectural erosion; framework independence for domain logic; proven pattern for long-lived applications
- **Cons**: More upfront structure than flat organization; learning curve for developers unfamiliar with Clean Architecture; potential over-abstraction for simple features

### Option 2: Flat Feature-Based Architecture
- **Pros**: Simpler structure; faster initial development; fewer files
- **Cons**: No layer isolation → business logic leaks into components; difficult to test domain rules without rendering components; framework lock-in makes migration hard; no explicit dependency rules

### Option 3: MVC Pattern
- **Pros**: Familiar to many developers; clear separation of concerns
- **Cons**: Tight coupling between Model and View in practice; doesn't isolate business rules from framework; less emphasis on dependency direction; doesn't scale well for complex domain logic

## Rationale
Clean Architecture provides the strongest guarantees for: (1) testability — domain rules can be tested without any UI framework; (2) maintainability — layer boundaries prevent architectural erosion; (3) evolvability — framework decisions can be changed without rewriting business logic; (4) dependency control — explicit inward-pointing dependency direction prevents tight coupling.

For a static-site application with complex domain logic (prompt validation, versioning, multi-provider export), layer isolation is critical. The feature-based module overlay ensures features are independently buildable and testable while maintaining Clean Architecture layer rules.

## Consequences

### Positive
- Domain layer is 100% testable without mocking (pure functions)
- Business rules can be moved to a backend (if needed) without rewriting
- Framework migration (React → Solid, for example) only affects presentation layer
- Feature teams can work independently on separate feature modules
- Architecture Guardian can enforce layer rules automatically via linting
- State management strategy can evolve independently of business logic

### Negative
- More boilerplate: repository interfaces, use case classes, DTOs
- Simple CRUD operations require passing through all 4 layers
- Bundle size overhead from abstraction patterns (mitigated by tree-shaking)
- Some local-only operations (e.g., auto-save) feel overly abstracted through Clean Architecture layers

### Architectural Invariants (Enforced by Architecture Guardian)
1. `domain/` must have zero imports from outside `domain/`
2. `application/` may only import from `domain/`
3. `infrastructure/` may only import from `domain/` (interfaces)
4. `presentation/features/` must not import from another feature module
5. No circular dependencies — enforced via dependency-cruiser or eslint-plugin-import

## Related ADRs
- ADR-001: Technology Stack (establishes the framework this architecture organizes)
- ADR-003: Architecture Guardian Agent (agent that enforces these architectural rules)
- ADR-006: Persistence Strategy (specifies repository implementation approach)
