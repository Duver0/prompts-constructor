# Skill: React Architecture Design

## Domain
Frontend Architecture

## Invoked By
Frontend Architect Agent

## Purpose
Design feature-based React application architecture following Clean Architecture and SOLID principles.

## Inputs
- Component hierarchy from UX/UI Architect
- Domain model from Domain Modeler
- Design tokens and theme configuration

## Process
1. Define feature boundaries based on UX component hierarchy
2. Structure each feature module: `components/`, `hooks/`, `stores/`, `types/`, `index.ts`
3. Design presentation layer (React components, no business logic)
4. Design application layer (hooks, store actions, orchestrators)
5. Design infrastructure layer (repository implementations, storage adapters)
6. Configure dependency injection via context or prop passing
7. Define route tree with lazy loading boundaries
8. Establish component composition patterns (compound components, render props, composition)
9. Design error boundaries per feature

## Output
- Feature module directory structure
- Layer separation with public API surfaces
- Route tree with lazy loading configuration
- Component composition patterns specification
- Error boundary hierarchy

## Quality Criteria
- Feature modules are independently buildable
- Presentation layer contains zero business logic
- Infrastructure layer is replaceable (e.g., localStorage → IndexedDB)
- All cross-feature communication happens through stores or events
- Routes are lazy-loaded at feature boundaries
