# Contributing to Prompt Architect

## Welcome

Prompt Architect is developed using an **Agentic Spec-Driven Development (ASDD)** methodology. All work is coordinated through a multi-agent system defined in `.opencode/`. This guide explains how to contribute effectively within this framework.

## Development Setup

### Prerequisites
- **Bun** v1.x — [Install Bun](https://bun.sh/docs/installation)
- **Node.js** v20+ LTS
- **Git**

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd prompts-constructor

# Install dependencies
bun install

# Start development server
bun run dev

# Run type check
bun run typecheck

# Run linter
bun run lint

# Run tests
bun run test

# Build for production
bun run build
```

## ASDD Development Workflow

### 1. Specification Phase (Specification)

Before any code is written, requirements must be fully specified:

1. **Orchestrator** receives feature request or bug report
2. **Product Analyst** analyzes requirements and produces user stories with acceptance criteria
3. **Prompt Engineer** defines prompt domain specifications (for prompt-related features)
4. **Domain Modeler** formalizes domain entities, value objects, and business rules
5. **UX/UI Architect** designs user flows, component hierarchy, and interaction patterns
6. **Architecture Guardian** validates all specifications against ADRs and architecture rules (Gate 1)

**No code is written during the Specification phase.**

### 2. Implementation Phase

After Architecture Guardian approval:

1. **Frontend Architect** implements components, stores, hooks, and infrastructure
2. **Testing Architect** writes unit, component, integration, and E2E tests
3. **Architecture Guardian** validates implementation architecture (Gate 2)

### 3. Review Phase

1. **Code Reviewer** validates code quality, SOLID compliance, TypeScript strictness
2. **Orchestrator** confirms acceptance criteria are met
3. **Documentation Agent** records decisions and updates documentation

### 4. Release Phase

1. **DevOps** builds and deploys to GitHub Pages
2. **Architecture Guardian** provides final architecture sign-off
3. **Documentation Agent** generates changelog

## Agent Communication Rules

1. **All communication flows through the Orchestrator** — No agent invokes another directly
2. **Artifact-based delivery** — Agents produce files (specifications, code, tests), not messages
3. **Validation gates** — Each phase requires approval before proceeding
4. **Architecture Guardian has veto authority** — Any violation of architecture rules blocks progress

## Branch Strategy

| Branch | Purpose | Base |
|--------|---------|------|
| `main` | Production-ready code | — |
| `develop` | Integration branch | `main` |
| `feat/*` | New features | `develop` |
| `fix/*` | Bug fixes | `develop` |
| `refactor/*` | Code refactoring | `develop` |

### Branch Naming

```
feat/short-description     # Feature branch
fix/short-description      # Bug fix branch
refactor/short-description # Refactoring branch
```

## Commit Convention

```
type(scope): description

Types: feat, fix, refactor, test, docs, chore, style, perf
Scope: component, feature, domain, infrastructure, config, ci
```

**Examples:**
- `feat(prompt-editor): add drag-and-drop block reordering`
- `fix(export): resolve variable interpolation for nested objects`
- `refactor(validation): extract block ordering rules to domain layer`
- `test(domain): add edge case tests for version increment validation`

## Pull Request Process

1. Create feature/fix branch from `develop`
2. Implement following the ASDD workflow phases
3. Ensure all quality gates pass:
   - TypeScript strict mode ✓
   - ESLint zero warnings ✓
   - Unit tests ≥ 80% coverage ✓
   - All tests passing ✓
   - Build succeeds ✓
4. Create PR to `develop`
5. PR must pass:
   - CI pipeline (all stages)
   - Architecture Guardian review
   - Code Reviewer approval
   - Orchestrator validation
6. Squash merge with conventional commit message
7. Delete feature branch

## Quality Standards

### TypeScript
- `strict: true` — zero exceptions
- No `any` — use `unknown` with type guards
- Explicit return types on public functions
- Branded types for nominal typing where needed

### Testing
- **Unit**: ≥ 80% line coverage, ≥ 70% branch coverage
- **Integration**: ≥ 70% line coverage
- **E2E**: 100% of critical user journeys
- **Accessibility**: 0 WCAG 2.1 AA violations

### Architecture
- Clean Architecture layers must be respected
- No circular dependencies
- Feature modules must not import from other feature modules
- Domain layer must have zero framework dependencies

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Assume good intent
- Disagree with ideas, not people

## Project Structure

```
├── src/
│   ├── domain/           # Business logic (zero dependencies)
│   ├── application/      # Use cases
│   ├── infrastructure/   # Adapters (localStorage, Anime.js)
│   └── presentation/     # React UI
│       └── features/     # Feature-based modules
├── .opencode/
│   ├── agents/           # Agent specifications
│   ├── skills/           # Skill definitions
│   ├── contracts/        # Agent contracts
│   ├── workflows/        # Process workflows
│   ├── standards/        # Quality standards
│   ├── templates/        # Document templates
│   ├── checklists/       # Quality checklists
│   └── docs/             # Architecture documentation
└── SPECIFICATION.md      # Master product specification
```

## Getting Help

- Read the specification: `SPECIFICATION.md`
- Check architecture docs: `.opencode/docs/`
- Review standards: `.opencode/standards/`
- Follow workflows: `.opencode/workflows/`
