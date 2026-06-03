# Coding Standards

## TypeScript
- Strict mode enabled (`strict: true`) in tsconfig.json
- No `any` type usage — use `unknown` with type guards when type is uncertain
- Explicit return types on all public functions and methods
- Prefer `interface` over `type` for object shapes that may be extended
- Use `type` for unions, intersections, and primitive aliases
- Enforce `no-unused-vars` with underscore prefix for intentionally unused params
- Use `const` assertions for literal types
- Branded types for nominal typing where needed

## React
- Functional components only; no class components
- Props interfaces defined in component files or co-located types
- Custom hooks for all reusable stateful logic
- No prop drilling beyond 2 levels — use composition or store
- Components should be pure where possible (same props → same output)
- `React.memo` only after profiling shows re-render benefit
- Event handlers named `handle{Entity}{Action}` (e.g., `handlePromptDelete`)

## Naming Conventions
- **Files**: PascalCase for components (`PromptEditor.tsx`), camelCase for utilities (`formatPrompt.ts`)
- **Directories**: kebab-case for feature modules (`prompt-editor/`)
- **Components**: PascalCase
- **Hooks**: camelCase prefixed with `use` (`usePromptBuilder`)
- **Stores**: camelCase (`usePromptStore`)
- **Interfaces**: PascalCase prefixed with `I` optionally, but prefer no prefix
- **Types**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE for magic constants

## File Organization
- One component per file (except small tightly-coupled sub-components)
- Co-locate tests alongside implementation (`Component.test.tsx`)
- Barrel exports (`index.ts`) for feature module public API
- Maximum 250 lines per file; refactor beyond that

## Imports Order
1. Node built-ins
2. External dependencies (react, zustand, etc.)
3. Internal absolute imports (`@/domain/`, `@/features/`, etc.)
4. Internal relative imports
5. CSS/style imports

## Formatting
- 2-space indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multiline objects/arrays
- 100 character print width
