# Skill: ADR Creation

## Domain
Documentation

## Invoked By
Documentation Agent

## Purpose
Create Architecture Decision Records (ADRs) using the MADR (Markdown Architectural Decision Records) template format for all significant architectural decisions.

## Inputs
- Decision context and problem statement
- Considered alternatives with pros/cons
- Selected option with rationale
- Consequences of the decision

## Process
1. Identify that a decision qualifies for an ADR (architectural significance, long-lasting impact, not easily reversed)
2. Assign sequential ADR number
3. Write title: "ADR-NNN: <Decision Title>"
4. Document context: What forces are at play? What is the problem?
5. List considered options with brief evaluation
6. State the decision clearly (we have decided to...)
7. Provide rationale for the selected option
8. Document consequences (positive + negative trade-offs)
9. Set status: Proposed → Accepted → Deprecated → Superseded
10. Link to related ADRs
11. Store in `.opencode/docs/adr/`

## Output
- ADR Markdown file following MADR template
- Linkage to related ADRs
- Status tracking

## Quality Criteria
- Context clearly describes the driving forces
- At least two alternatives are considered
- Decision rationale is explicit, not implicit
- Consequences include both benefits and trade-offs
- ADR is stored in the correct location with sequential numbering
- Title clearly identifies the decision scope
