# Workflow: New Feature

## Trigger
- User requests a new feature
- Feature is added to the project backlog
- Orchestrator initiates feature development

## Agents Involved
1. Orchestrator Agent (plans and coordinates)
2. Product Analyst Agent (requirements analysis)
3. Prompt Engineer Agent (prompt domain specification) — prompt-related features only
4. Domain Modeling Agent (domain design)
5. UX/UI Architect Agent (design and interaction)
6. Architecture Guardian Agent (architecture validation gate)
7. Frontend Architect Agent (implementation)
8. Testing Architect Agent (tests)
9. Code Reviewer Agent (quality gate)
10. Documentation Agent (documentation)

## Execution Order

### Phase 1: Analysis (Orchestrator → Product Analyst)
1. Orchestrator receives feature request
2. Delegates to Product Analyst for requirements analysis
3. Product Analyst produces user stories + acceptance criteria
4. Orchestrator validates and approves stories

### Phase 2: Prompt Domain Specification (Prompt Engineer — prompt features only)
1. Orchestrator delegates prompt domain specification to Prompt Engineer (if feature involves prompt structure, blocks, templates, variables, export, or validation)
2. Prompt Engineer produces: block hierarchy, composition rules, validation rules, export specs, template definitions, variable system, quality standards, versioning strategy
3. Orchestrator validates prompt domain specifications for completeness and consistency

### Phase 3: Design (Domain Modeler + UX/UI Architect — parallel, informed by Prompt Engineer)
1. Orchestrator delegates domain modeling to Domain Modeler (with Prompt Engineer's specs as input)
2. Orchestrator delegates UX design to UX/UI Architect (with Prompt Engineer's specs as input)
3. Domain Modeler produces entities, rules, repository interfaces (formalizing Prompt Engineer's specifications into TypeScript)
4. UX/UI Architect produces user flows, component hierarchy, design tokens, animation specs, accessibility specs (informed by Prompt Engineer's block and composition specifications)
5. Both agents deliver to Orchestrator
6. Orchestrator validates consistency between domain model, UX design, and prompt domain specs

### Phase 4: Architecture Validation (Architecture Guardian)
1. Orchestrator submits design + domain model + prompt domain specs to Architecture Guardian
2. Architecture Guardian validates against SOLID, Clean Architecture, ADRs, DDD patterns
3. Architecture Guardian produces architecture assessment and compliance report
4. If vetoed → Orchestrator routes violations back to responsible agent (Prompt Engineer, Domain Modeler, UX/UI, or Frontend Architect)
5. Re-validation cycle until approved or conditional pass with remediation plan
6. Conditional approval requires acceptance of remediation actions before Phase 6

### Phase 5: Implementation (Frontend Architect)
1. Orchestrator delegates implementation to Frontend Architect (after architecture approval)
2. Frontend Architect produces components, stores, hooks, routing, types
3. Frontend Architect produces unit and integration tests
4. Orchestrator validates implementation against specs

### Phase 6: Testing (Testing Architect)
1. Orchestrator delegates test authoring to Testing Architect
2. Testing Architect produces E2E tests + augments unit/integration coverage
3. Testing Architect configures quality gates
4. Testing Architect validates all acceptance criteria have corresponding tests

### Phase 7: Review (Code Reviewer)
1. Orchestrator delegates code review to Code Reviewer
2. Code Reviewer produces review report with compliance score
3. Code Reviewer issues quality verdict
4. If fail → Orchestrator routes issues back to Frontend Architect for fixes
5. Re-review cycle until pass

### Phase 8: Documentation (Documentation Agent)
1. Orchestrator delegates documentation to Documentation Agent
2. Documentation Agent updates ADRs if architectural decisions were made
3. Documentation Agent generates/updates module READMEs
4. Documentation Agent adds changelog entries

## Deliverables
- User stories with acceptance criteria
- Prompt domain specifications (blocks, composition, validation, export, templates) — if prompt feature
- Domain model (entities, value objects, rules)
- UX design (flows, components, tokens, animations, accessibility)
- React implementation (components, stores, hooks, types)
- Test suite (unit, integration, E2E)
- Architecture assessment (approval/conditional pass from Architecture Guardian)
- Code review report (pass verdict)
- Documentation updates
- Feature branch with passing CI pipeline

## Exit Criteria
- All acceptance criteria are met
- Architecture Guardian approval (or conditional pass with accepted remediation)
- Code review verdict: pass
- All CI pipeline stages pass
- Coverage thresholds met
- Accessibility requirements satisfied
- Feature branch merged to develop
