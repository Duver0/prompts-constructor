# Skill: User Story Generation

## Domain
Product Analysis

## Invoked By
Product Analyst Agent

## Purpose
Transform structured requirements into INVEST-compliant user stories with clear role, goal, and benefit.

## Inputs
- Structured requirements specification
- Domain model entities and value objects
- Actor definitions

## Process
1. For each requirement, identify: actor (who), action (what), benefit (why)
2. Format as: "As a <actor>, I want <action> so that <benefit>"
3. Verify INVEST compliance (Independent, Negotiable, Valuable, Estimable, Small, Testable)
4. Split large stories into smaller ones
5. Assign unique identifiers (US-001, etc.)
6. Link stories to parent features/requirements
7. Order by dependency and priority

## Output
- User story set in standard format
- Story dependency graph
- Traceability to requirements

## Quality Criteria
- Each story is independently deliverable
- Each story has clear value to the user
- Each story can be estimated (story points)
- No story is too large (epic) without decomposition
