# Agent Interaction Model

## Interaction Principles

1. **All communication flows through Orchestrator** — No agent invokes another agent directly
2. **Contract-based handoffs** — Every agent-to-agent transfer has a defined contract
3. **Artifact-based delivery** — Agents produce files, not messages
4. **Validation gates** — Each phase has a validation step before proceeding
5. **Parallel execution** — Independent agents may work simultaneously
6. **Conflict resolution** — Orchestrator resolves disagreements between agents
7. **Architecture Guardian precedence** — Architecture Guardian executes before Code Reviewer and has veto authority over any change that violates architecture rules

## Interaction Matrix

| From | To | Artifact | Trigger |
|------|----|----------|---------|
| Orchestrator | Product Analyst | Task: Analyze requirements | New feature/bug |
| Product Analyst | Orchestrator | User stories + AC | Analysis complete |
| Orchestrator | Prompt Engineer | Task: Define prompt domain specs | Stories approved (prompt features) |
| Prompt Engineer | Orchestrator | Prompt domain specs + rules + export specs | Domain specification complete |
| Orchestrator | Domain Modeler | Task: Model domain | Specs approved (informed by Prompt Engineer) |
| Orchestrator | UX/UI Architect | Task: Design UX | Specs approved (informed by Prompt Engineer) |
| Domain Modeler | Orchestrator | Domain model artifacts | Modeling complete |
| UX/UI Architect | Orchestrator | Design artifacts | Design complete |
| Orchestrator | Architecture Guardian | Task: Validate architecture | Design + model + domain specs ready |
| Architecture Guardian | Orchestrator | Assessment + compliance report | Validation complete |
| Orchestrator | Frontend Architect | Task: Implement features | Architecture approved |
| Frontend Architect | Orchestrator | Source code + tests | Implementation complete |
| Orchestrator | Testing Architect | Task: Write tests | Implementation complete |
| Testing Architect | Orchestrator | Test suite + quality gates | Test authoring complete |
| Orchestrator | Code Reviewer | Task: Review code | All artifacts ready (architecture pre-approved) |
| Code Reviewer | Orchestrator | Review report + verdict | Review complete |
| Orchestrator | Documentation Agent | Task: Update docs | Feature complete |
| Documentation Agent | Orchestrator | ADRs + docs + changelog | Documentation complete |
| Orchestrator | DevOps | Task: Build & deploy | Release triggered |
| DevOps | Orchestrator | Build artifacts + deployment | Deploy complete |

## Parallel Execution Paths

### Path A: Specification + Design Phase (sequential then parallel)
```
Orchestrator
  └── Prompt Engineer (prompt domain specs) — sequential before design
        ├── (on complete) → Domain Modeler (entities, rules) — parallel
        └── (on complete) → UX/UI Architect (flows, components) — parallel
```
Prompt Engineer defines domain specifications first. Domain Modeler and UX/UI Architect then work in parallel, both informed by Prompt Engineer's outputs.

### Path B: Validation Phase (sequential — Architecture Guardian → Code Reviewer)
```
Orchestrator
  └── Architecture Guardian (veto authority)
        ├── (on pass) → Code Reviewer → Frontend Architect (rework loop)
        └── (on veto) → responsible agent → re-validation loop
```
Architecture Guardian must pass before Code Reviewer begins. Rework loops route through appropriate agent.

### Path C: Release Gate (sequential)
```
Orchestrator
  └── Architecture Guardian (architecture integrity sign-off)
        ├── (on pass) → Testing → Security → Build → Deploy
        └── (on fail) → blocking issues resolved before proceed
```
Architecture Guardian provides final architecture integrity sign-off during release.

## Error Recovery

| Scenario | Action |
|----------|--------|
| Agent produces invalid output | Orchestrator rejects with explanation, agent retries |
| Agent conflicts | Orchestrator reviews both positions, makes final decision |
| Architecture Guardian veto | Orchestrator routes violations to responsible agent; re-validation loop |
| Agent timeout | Orchestrator retries or falls back to alternative approach |
| Quality gate failure | Orchestrator routes to responsible agent for fixes |
| ADR conflict detected | Architecture Guardian blocks; Orchestrator initiates ADR change process |
| Prompt domain spec incomplete | Orchestrator routes back to Prompt Engineer for completion before Domain Modeler begins |
| Export spec out of date | Orchestrator invokes Prompt Engineer for provider compatibility update |
| Specification ambiguity | Orchestrator requests clarification from user (via question tool) |
