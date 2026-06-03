# Skill: Requirements Analysis

## Domain
Product Analysis

## Invoked By
Product Analyst Agent

## Purpose
Analyze raw requirements to identify gaps, ambiguities, contradictions, and missing information before story generation.

## Inputs
- Raw requirement text
- Technical constraints document
- Domain model (if available)

## Process
1. Parse requirements and extract discrete statements
2. Identify actors, actions, and entities mentioned
3. Flag ambiguous terms and request clarification
4. Cross-reference with domain model for consistency
5. Categorize requirements (functional, non-functional, technical)
6. Prioritize using MoSCoW framework
7. Produce structured requirement specification

## Output
- Structured requirements specification
- Gap analysis document
- Clarification questions for the user (via Orchestrator)
- MoSCoW prioritization matrix

## Quality Criteria
- All requirements are atomic and unambiguous
- Every requirement traces to a user need
- No contradictory requirements exist
- Gaps and missing information are explicitly identified
