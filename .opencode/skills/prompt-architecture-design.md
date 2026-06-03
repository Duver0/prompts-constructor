# Skill: Prompt Architecture Design

## Domain
Prompt Engineering

## Invoked By
Prompt Engineer Agent

## Purpose
Design the prompt architecture — block hierarchy, composition rules, ordering constraints, and structural specifications that govern how prompts are built, composed, and validated.

## Inputs
- User stories for prompt features
- Existing prompt block definitions (if evolving)
- AI provider capability documentation
- Composition requirements

## Process

### Phase 1: Block Identification
1. Analyze user stories to identify required prompt sections
2. Categorize blocks by function: Role, Context, Objective, Constraints, Examples, Output Format, Variables, Notes
3. Define each block's purpose, content type, and cardinality (required, optional, repeatable)
4. Design block metadata structure: id, type, order, content, enabled state, variables list

### Phase 2: Hierarchy Design
1. Define top-level section ordering rules (e.g., Role → Context → Objective → Constraints → Examples → Output Format)
2. Define nested block relationships (blocks within sections, conditional blocks)
3. Design block grouping for logical composition (collapsible sections, block groups)
4. Specify which blocks are structural vs. content-bearing

### Phase 3: Composition Rules
1. Define which block combinations are valid (block A can coexist with B but not C)
2. Define dependency rules (block B requires block A to be present)
3. Define exclusion rules (block A and block B cannot both be in the same prompt)
4. Define ordering constraints (block A must appear before block B)
5. Define cardinality constraints (min/max occurrences per block type)

### Phase 4: Block Interface Specification
1. For each block type, define: accepted content format, variable placement rules, max length constraints
2. Define block-level validation rules (required fields, format checks)
3. Define cross-block validation rules (variable consistency, content conflicts)
4. Specify block serialization/deserialization format for persistence

### Phase 5: Composition Validation
1. Define structural validation rules (correct hierarchy, no orphan blocks)
2. Define content validation rules (valid format, no empty required blocks)
3. Define cross-reference validation rules (no circular references)
4. Define completeness validation rules (all required sections present)

## Output
- Block definition catalog with types, purposes, and cardinalities
- Block hierarchy specification with ordering rules
- Composition rule set (compatibility, dependency, exclusion, ordering)
- Block interface specifications per type
- Structural, content, and cross-reference validation rules

## Quality Criteria
- Every block type has a clear, single purpose
- Composition rules are complete and non-contradictory
- Validation rules catch all structural inconsistencies
- Block interfaces are precise enough for implementation without ambiguity
- Block hierarchy supports logical prompt construction workflows
