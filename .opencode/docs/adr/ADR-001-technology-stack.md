# ADR-001: Technology Stack

## Status
Accepted

## Context
Prompt Architect is a visual prompt engineering platform that must be deployable as a static website through GitHub Pages with zero server infrastructure. The technology stack must support:

1. **Static-first architecture** — No server-side rendering, no database, no authentication; all data stored client-side
2. **Modern React** — Component-based UI with hooks, functional components, and TypeScript
3. **Rich visual interactions** — Drag-and-drop block composition, smooth animations, real-time preview
4. **Strict TypeScript** — Full type safety across all layers; zero `any` types
5. **Fast development** — Hot module replacement, instant feedback, fast builds
6. **Small bundle size** — Static site must load fast; initial JS under 200KB gzipped
7. **Testability** — Framework must support unit, component, integration, and E2E testing
8. **Zero infrastructure cost** — No servers, no databases, no API endpoints

## Decision

We will use the following technology stack:

| Technology | Version | Purpose |
|------------|---------|---------|
| **Bun** | 1.x | Package manager and JavaScript runtime |
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Strict mode typing |
| **Vite** | 5.x | Build tool and dev server |
| **TailwindCSS** | 3.x | Utility-first CSS framework |
| **Zustand** | 4.x | State management |
| **Anime.js** | 3.x | Animation library |
| **React Router** | 6.x | Client-side routing |
| **Vitest** | 1.x | Test runner |
| **React Testing Library** | 14.x | Component tests |
| **Playwright** | 1.x | E2E tests |

## Options Considered

### Option 1: Bun + React + Vite + TailwindCSS + Zustand (selected)
- **Pros**: Bun is TypeScript-native and fast; React has largest ecosystem; Vite is the fastest build tool for SPAs; TailwindCSS enables utility-first rapid UI development; Zustand has minimal boilerplate compared to Redux; Anime.js is lightweight (10KB gzipped) with timeline support
- **Cons**: Bun is newer than Node.js (ecosystem maturity); Zustand less established than Redux for large teams; Anime.js v4 API differs from v3

### Option 2: Node.js + Next.js + Redux + Framer Motion
- **Pros**: Next.js has SSR/SSG; Redux has largest state management ecosystem; Framer Motion is React-native
- **Cons**: Next.js overkill for static site (no SSR needed); Redux boilerplate excessive for client-only app; Framer Motion is 3x Anime.js size; Next.js deployment to GitHub Pages is complex

### Option 3: Bun + Svelte + Vite
- **Pros**: Svelte produces smaller bundles; less boilerplate than React
- **Cons**: Smaller ecosystem; fewer UI libraries; less TypeScript community support; team familiarity assumed with React

## Rationale
The selected stack optimizes for: (1) minimal bundle size — static site deployment requires fast initial load; (2) development speed — Vite HMR + TailwindCSS utility classes enable rapid iteration; (3) type safety — TypeScript strict mode with Bun's native TypeScript support; (4) testability — Vitest is Vite-native, Playwright supports the full browser matrix; (5) animation intentionality — Anime.js's lightweight footprint and timeline API support the "animations serve usability goals" principle.

## Consequences

### Positive
- Bun installs dependencies 10-100x faster than npm
- Vite provides instant HMR and fast production builds
- Zustand's sliced store pattern aligns with feature-based architecture
- Anime.js enables declarative animations without React-specific lock-in
- TailwindCSS reduces CSS bundle size via purging
- Vitest shares Vite config, reducing test setup overhead
- Full stack is deployable to GitHub Pages with zero server infrastructure

### Negative
- Bun ecosystem maturity: some tools may need Node.js fallback
- Zustand ecosystem smaller than Redux (fewer third-party middleware options)
- Anime.js v3 used (latest stable); v4 migration may be needed later
- TailwindCSS class strings can make JSX verbose

## Mitigations
- Use `bun --bun` flag for Node.js compatibility when needed
- Zustand's small API surface means middleware ecosystem is less critical
- Anime.js hooks encapsulate library calls; migration path is hook-internal
- TailwindCSS component extraction patterns keep JSX readable

## Related ADRs
- ADR-002: Clean Architecture (establishes how this stack is organized)
- ADR-003: Architecture Guardian Agent (enforces the architectural rules this stack supports)
