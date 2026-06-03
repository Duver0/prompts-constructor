# Workflow: Refactor

## Trigger
- User requests a refactoring
- Code Reviewer identifies systemic quality issues
- Performance review reveals optimization opportunities
- Architectural debt is addressed

## Agents Involved
1. Orchestrator Agent (plan and coordinate)
2. Architecture Guardian Agent (architecture validation — required for all refactors)
3. Frontend Architect Agent (implementation)
4. Domain Modeling Agent (if domain changes)
5. Testing Architect Agent (test updates)
6. Code Reviewer Agent (quality gate)
7. Documentation Agent (documentation)

## Execution Order

### Phase 1: Analysis (Orchestrator)
1. Orchestrator identifies refactoring scope and goals
2. Orchestrator defines success criteria (e.g., reduce component complexity, improve testability)
3. Orchestrator communicates constraints (no functional changes)

### Phase 2: Architecture Validation (Architecture Guardian)
1. Orchestrator submits refactoring scope and goals to Architecture Guardian
2. Architecture Guardian assesses refactoring plan against SOLID, Clean Architecture, ADRs
3. Architecture Guardian identifies architecture risks in the proposed refactoring
4. Architecture Guardian issues assessment: approved, conditional, or vetoed
5. If vetoed → refactoring plan must be revised before proceeding

### Phase 3: Planning (Frontend Architect)
1. Frontend Architect analyzes current code and identifies specific changes (informed by Architecture Guardian assessment)
2. Frontend Architect produces refactoring plan with before/after comparison
3. Orchestrator approves plan (must align with Architecture Guardian conditions)

### Phase 4: Implementation (Frontend Architect + Domain Modeler)
1. Frontend Architect implements refactoring
2. If domain model changes → Domain Modeler updates entities/rules
3. Frontend Architect updates existing tests to match new structure
4. No new features added during refactoring

### Phase 5: Testing (Testing Architect)
1. Testing Architect verifies all existing tests still pass
2. Testing Architect updates test suite for structural changes
3. Testing Architect validates coverage thresholds are maintained

### Phase 6: Review (Code Reviewer)
1. Code Reviewer validates improved quality metrics
2. Code Reviewer confirms no regression in architecture compliance
3. Code Reviewer issues quality verdict

### Phase 7: Documentation (Documentation Agent)
1. Documentation Agent updates module READMEs if structure changed
2. Documentation Agent creates ADR if significant architectural changes

## Deliverables
- Architecture assessment (approval/conditional pass from Architecture Guardian)
- Refactored code with improved quality metrics
- Updated test suite
- Code review report (improvement validation)
- Documentation updates (if needed)

## Exit Criteria
- No functional changes in refactored code (existing tests pass)
- Quality metrics improved (lower complexity, better cohesion, etc.)
- Architecture Guardian approval (or conditional pass with accepted remediation)
- Code review verdict: pass
- All CI pipeline stages pass
- Coverage thresholds maintained or improved
