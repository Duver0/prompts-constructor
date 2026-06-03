# Skill: Zustand Architecture

## Domain
State Management

## Invoked By
Frontend Architect Agent

## Purpose
Design Zustand state management architecture with sliced stores, derived state, and middleware for the Prompt Architect platform.

## Inputs
- Domain model entities and aggregates
- User flows and interaction patterns
- Component hierarchy

## Process
1. Identify state domains from domain model (prompts, versions, collections, UI)
2. Create one store slice per state domain
3. Define store interfaces: state shape, actions, computed getters
4. Implement store slices with Zustand's `StateCreator` pattern
5. Define derived state via Zustand `subscribe` or getters
6. Configure middleware: immer for immutable updates, persist for localStorage, devtools for debugging
7. Design cross-store communication (subscribeWithSelector for reacting to changes)
8. Define store test patterns (pure state transitions, mock infrastructure)
9. Implement store hooks for React integration
10. Ensure stores remain serializable for persist middleware

## Output
- Store slice definitions per domain
- Store composition (combined stores)
- Middleware configuration
- Cross-store communication patterns
- Store test examples

## Quality Criteria
- Each store slice has a single responsibility
- Stores are serializable (no functions or circular refs in state)
- Immutable updates via immer middleware
- Derived state is computed, not stored redundantly
- Store tests are pure (no React needed to test state transitions)
- Stores can be used outside React (e.g., in service workers)
