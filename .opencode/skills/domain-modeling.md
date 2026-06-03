# Skill: Domain Modeling

## Domain
Domain-Driven Design

## Invoked By
Domain Modeling Agent

## Purpose
Design domain entities, value objects, aggregates, and business rules from requirements using DDD principles.

## Inputs
- User stories and acceptance criteria
- Functional decomposition
- Technical constraints

## Process
1. Identify domain concepts from user stories (nouns → entities/value objects)
2. For each concept, determine: entity (has identity) or value object (immutable, equality by value)
3. Define attributes and invariants for each entity/VO
4. Design aggregates: identify aggregate roots and consistency boundaries
5. Define domain events for state transitions
6. Define repository interfaces for aggregate persistence
7. Implement business rules as pure functions
8. Define domain services for operations spanning multiple aggregates
9. Validate model against all acceptance criteria
10. Produce TypeScript types and interfaces

## Output
- TypeScript entity definitions
- Value object implementations
- Aggregate root definitions
- Domain event types
- Repository interface contracts
- Business rule functions
- Domain service interfaces

## Quality Criteria
- Zero framework dependencies in domain layer
- All value objects are immutable
- All entities have identity equality
- Aggregate boundaries respect transaction boundaries
- Business rules are pure, testable functions
- Repository interfaces are implementation-agnostic
