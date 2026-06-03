# Skill: Testing Strategy

## Domain
Testing

## Invoked By
Testing Architect Agent

## Purpose
Design a comprehensive testing strategy for the Prompt Architect platform, defining test layers, coverage targets, and quality gates.

## Inputs
- Project architecture and module structure
- User stories and acceptance criteria
- Domain model
- Component hierarchy

## Process
1. Analyze application architecture layers (domain, application, presentation, infrastructure)
2. Map each layer to appropriate test type (unit, integration, component, E2E)
3. Define coverage targets per layer (unit: 80%+, integration: 70%+, E2E: critical paths)
4. Identify test dependencies and mocking strategy
5. Design test organization (co-located with source, `__tests__` folders)
6. Define quality gates for CI pipeline
7. Determine test data strategy (factories, fixtures, seed data)
8. Design accessibility test integration (axe-core)
9. Design performance test approach (Lighthouse CI)
10. Document test patterns and conventions

## Output
- Test strategy document
- Coverage threshold configuration
- Mock strategy per layer
- Test organization structure
- Quality gate definitions

## Quality Criteria
- Every architectural layer has appropriate test coverage
- Mock strategy minimizes test fragility
- Quality gates prevent regression on coverage
- Accessibility tests are integrated into component tests
- Performance budgets are enforced through CI
