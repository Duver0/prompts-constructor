# Skill: Documentation Generation

## Domain
Documentation

## Invoked By
Documentation Agent

## Purpose
Generate and maintain technical documentation, architecture diagrams (C4 model), developer guides, and module-level READMEs.

## Inputs
- Source code structure and types
- Architecture decisions and ADRs
- Component hierarchy and design specs
- CI/CD configuration and workflows

## Process
1. Analyze source code structure to extract public API surfaces
2. Generate module-level README files with:
   - Purpose and responsibilities
   - Public API and types
   - Usage examples
   - Dependencies
3. Create C4 model diagrams using Mermaid:
   - Context diagram (system boundaries, users, external systems)
   - Container diagram (application, static site, APIs)
   - Component diagram (React components, stores, services)
4. Generate developer onboarding guide:
   - Prerequisites (Bun, Node.js)
   - Setup instructions
   - Available scripts
   - Project structure overview
   - Development workflow
5. Generate changelog entries from conventional commits
6. Create agent interaction documentation from agent contracts

## Output
- Module-level README files
- C4 model Mermaid diagrams
- Developer onboarding guide (CONTRIBUTING.md)
- Agent interaction documentation
- Changelog entries

## Quality Criteria
- Module READMEs answer: what, why, how for each module
- C4 diagrams are accurate and reflect current architecture
- Onboarding guide is reproducible (another developer can follow it)
- Agent interactions are documented with contract references
- Diagrams render correctly in GitHub Markdown
