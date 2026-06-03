# Skill: Acceptance Criteria Generation

## Domain
Product Analysis

## Invoked By
Product Analyst Agent

## Purpose
Define testable acceptance criteria for each user story using Given/When/Then format, covering happy path, error states, and edge cases.

## Inputs
- User stories
- Domain model rules and invariants
- UI/UX specifications (if available)

## Process
1. For each user story, identify the trigger action
2. Define precondition (Given)
3. Define trigger action (When)
4. Define expected outcome (Then)
5. Identify alternate flows and error conditions
6. Define acceptance criteria for each alternate flow
7. Define edge cases (empty data, boundary values, concurrent actions)
8. Verify that each criterion is testable (observable, deterministic)
9. Assign AC-IDs (AC-001, etc.)

## Output
- Acceptance criteria per user story in Given/When/Then format
- Edge case catalog
- Non-functional acceptance criteria (performance, accessibility)

## Quality Criteria
- Every acceptance criterion is uniquely identifiable
- Every acceptance criterion produces a pass/fail verdict
- Edge cases cover: empty, error, loading, maximum, minimum, concurrent
- Non-functional criteria are measurable
