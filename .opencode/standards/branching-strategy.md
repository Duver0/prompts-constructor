# Branching Strategy

## Main Branches
- `main` — Production-ready code; deployed to GitHub Pages
- `develop` — Integration branch for feature work

## Supporting Branches
- `feat/<feature-name>` — New features; branched from `develop`
- `fix/<bug-description>` — Bug fixes; branched from `develop` (or `main` for hotfix)
- `refactor/<description>` — Refactoring; branched from `develop`
- `docs/<description>` — Documentation changes; branched from `develop`

## Naming Conventions
- Use kebab-case: `feat/prompt-versioning`
- Use forward slash separators: `<type>/<description>`
- Include issue number when applicable: `feat/PROMPT-42-prompt-composition`

## Lifecycle
1. Branch from appropriate source (`develop` by default)
2. Implement changes with conventional commits
3. Push and open Pull Request to source branch
4. Pass all CI checks (typecheck, lint, test, build)
5. Pass Code Review (via Code Reviewer Agent)
6. Squash-merge to source branch
7. Delete feature branch

## Hotfixes
- Branch from `main`
- Merge both to `main` and `develop`

## Protection Rules
- `main` and `develop` are protected
- Require status checks to pass before merging
- Require up-to-date branches before merging
- Require linear history (no merge commits on main)
