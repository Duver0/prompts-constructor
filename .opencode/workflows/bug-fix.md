# Workflow: Bug Fix

## Trigger
- User reports a bug
- E2E or integration test fails unexpectedly
- Testing Architect identifies a regression
- Code Reviewer identifies a logic error

## Agents Involved
1. Orchestrator Agent (triage and coordinate)
2. Product Analyst Agent (bug analysis)
3. Architecture Guardian Agent (architecture validation — skip for trivial, required for structural fixes)
4. Frontend Architect Agent (fix implementation)
5. Testing Architect Agent (regression test)
6. Code Reviewer Agent (quality gate)

## Execution Order

### Phase 1: Triage (Orchestrator)
1. Orchestrator receives bug report
2. Assesses severity (blocker, critical, major, minor)
3. Assigns priority (immediate, next release, backlog)
4. Creates bug description with reproduction steps

### Phase 2: Analysis (Product Analyst)
1. Product Analyst analyzes root cause from user perspective
2. Maps bug to affected user story and acceptance criteria
3. Updates acceptance criteria if original was incomplete
4. Provides clear specification of expected vs actual behavior

### Phase 3: Architecture Validation (Architecture Guardian)
1. Orchestrator assesses if bug fix touches architecture-level concerns (module boundaries, dependency direction, public APIs)
2. If architecture-relevant → Orchestrator submits fix proposal to Architecture Guardian for validation
3. Architecture Guardian validates fix does not introduce architecture violations
4. If vetoed → Orchestrator routes violations back to Frontend Architect before implementation

### Phase 4: Fix (Frontend Architect)
1. Frontend Architect implements the fix
2. Writes a failing test that reproduces the bug before fixing
3. Implements fix and verifies test passes
4. Ensures no regressions in related functionality

### Phase 5: Testing (Testing Architect)
1. Testing Architect adds E2E or integration regression test
2. Testing Architect validates fix across all test layers
3. Testing Architect updates quality gates if needed

### Phase 6: Review (Code Reviewer)
1. Code Reviewer validates fix approach and implementation
2. Code Reviewer confirms regression test quality
3. Code Reviewer issues quality verdict

## Deliverables
- Root cause analysis
- Architecture assessment (if structural fix)
- Bug fix implementation
- Regression test (ensures bug does not reoccur)
- Updated acceptance criteria (if original was incomplete)
- Code review report

## Exit Criteria
- Bug is reproduced by test before fix
- Fix resolves the bug (test passes)
- Regression test added to prevent reoccurrence
- No regressions in existing functionality
- Code review verdict: pass
- All CI pipeline stages pass
