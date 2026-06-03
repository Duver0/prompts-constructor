# ADR-003: Architecture Guardian Agent

## Status
Accepted

## Context
The ASDD multi-agent ecosystem had 9 agents (1 Orchestrator + 8 specialists) with code quality enforcement delegated entirely to the Code Reviewer Agent. However, several systemic risks were unaddressed:

1. **No pre-implementation architecture validation** — Design and domain model approval had no formal architecture governance step before implementation began.
2. **Code Reviewer scope overload** — Code Reviewer was responsible for both code quality and architecture enforcement, creating a single-point-of-failure for architecture integrity.
3. **No veto mechanism** — No agent had explicit authority to block proposals on architectural grounds alone.
4. **No technical debt tracking** — Despite standards documents, no agent was responsible for proactively monitoring and recording technical debt.
5. **ADR drift risk** — No agent was specifically tasked with validating implementation proposals against existing ADRs.
6. **No temporal architecture perspective** — No agent was responsible for assessing long-term maintainability impact of short-term decisions.

## Decision
We will add a dedicated **Architecture Guardian Agent** to the agent ecosystem with:
- Exclusive responsibility for architecture validation across SOLID, Clean Architecture, DDD, ADRs, and coding standards
- Veto authority over any proposal that violates architecture rules
- Mandatory gate before Code Reviewer Agent in all workflows
- Responsibility for maintaining a technical debt register with severity ratings
- No code generation or implementation authority (pure governance agent)

The agent sits between design/planning agents (Product Analyst, UX/UI Architect, Domain Modeler) and implementation agents (Frontend Architect) in the execution order.

## Options Considered

### Option 1: Architecture Guardian Agent (selected)
- **Pros**: Dedicated focus, clear veto authority, no role conflict, technical debt tracking, ADR enforcement, pre-implementation validation
- **Cons**: Additional agent to maintain, additional workflow gate (adds latency), requires integration into all workflows

### Option 2: Extend Code Reviewer Agent
- **Pros**: No new agent, no workflow changes
- **Cons**: Code Reviewer already responsible for code quality, testing, security, performance — scope overload reduces effectiveness, no pre-implementation validation, no dedicated technical debt tracking

### Option 3: Extend Orchestrator Agent
- **Pros**: Orchestrator already has architectural integrity responsibility per spec
- **Cons**: Orchestrator needs to remain product/process-focused; combining governance with execution creates conflict of interest; Orchestrator lacks bandwidth for detailed per-change architecture review

## Consequences

### Positive
- Architecture validation occurs before implementation cost is incurred
- Code Reviewer can focus on code quality, testing, security, and performance
- Technical debt is systematically tracked and prioritized
- ADR compliance is proactively enforced
- Veto authority provides clear architectural governance
- Long-term maintainability has a dedicated advocate

### Negative
- Additional gate in the workflow adds validation latency
- False positives (incorrect vetoes) could slow delivery
- Requires careful calibration to avoid blocking legitimate architectural evolution
- Orchestrator must manage Architecture Guardian integration as an additional coordination responsibility

## Mitigations
- Architecture Guardian assessment targets minutes (not hours) for standard proposals
- False positive rate tracked and reviewed in quarterly architecture reviews
- Veto can be overridden via formal ADR process (ADR-003 itself documents this path)
- Architecture Guardian participates in architecture reviews to calibrate thresholds

## Related ADRs
- ADR-001: Technology Stack (establishes the technical foundation the Guardian enforces)
- ADR-002: Clean Architecture (establishes the architectural style the Guardian enforces)
