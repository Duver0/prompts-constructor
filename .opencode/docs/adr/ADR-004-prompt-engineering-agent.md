# ADR-004: Prompt Engineering Agent

## Status
Accepted

## Context
The Prompt Architect platform is fundamentally a prompt engineering tool, yet the agent ecosystem had no dedicated domain authority for prompt architecture, composition, validation, versioning, optimization, and export. 

The Domain Modeler Agent was responsible for formalizing all domain entities into TypeScript, but had no upstream source of prompt-engineering-specific domain knowledge. This created several risks:

1. **Domain knowledge gap** — Prompt engineering has unique concepts (blocks, variables, templates, provider-specific formatting) that are not generic DDD patterns. The Domain Modeler could formalize types but lacked prompt engineering expertise to define correct domain semantics.
2. **Export complexity** — Each AI provider (ChatGPT, Claude, Gemini, OpenRouter) has different formatting, capabilities, and context limits. No agent was responsible for maintaining provider compatibility specifications.
3. **Quality standards gap** — Prompt quality evaluation (clarity, ambiguity, redundancy, instruction conflicts) is a specialized skill distinct from code quality review.
4. **Template system ownership** — Reusable prompt templates across categories (Coding, Architecture, Marketing, etc.) required domain-specific design expertise.
5. **Validation rules gap** — Prompt validation (circular references, empty blocks, variable consistency) requires prompt-engineering knowledge, not just generic validation.

## Decision
We will add a dedicated **Prompt Engineer Agent** to the agent ecosystem with:
- Exclusive ownership of the prompt engineering domain model and all prompt-related business rules
- Authority over prompt architecture, block hierarchy, composition rules, quality standards, and export specifications
- Execution position after Product Analyst (stories complete) but before Domain Modeler (domain formalization) and UX/UI Architect (UI design)
- No code generation authority — outputs are domain specifications, not implementation code

The agent fills the gap between "what users need" (Product Analyst) and "how the domain is formalized" (Domain Modeler) / "how the UI lets users interact" (UX/UI Architect).

## Options Considered

### Option 1: Prompt Engineer Agent (selected)
- **Pros**: Dedicated domain expertise, clear ownership of prompt-specific concepts, fills the Product Analyst → Domain Modeler gap, provider compatibility maintained by one authority, quality standards have a clear owner
- **Cons**: Additional agent, requires coordination with Domain Modeler (overlapping responsibility boundary), needs provider-specific knowledge maintenance

### Option 2: Extend Domain Modeler Agent
- **Pros**: No new agent, single source of domain truth
- **Cons**: Domain Modeler is a generic DDD specialist — lacks prompt-engineering-specific expertise, provider compatibility is outside typical DDD scope, prompt quality evaluation is a distinct skill from domain modeling, template system design is product design not entity design

### Option 3: Extend Product Analyst Agent
- **Pros**: Product Analyst already works with requirements
- **Cons**: Product Analyst focuses on user needs not domain model internals, prompt architecture (block hierarchy, composition rules) is technical domain design not requirements analysis, export specification requires provider-specific technical knowledge

## Consequences

### Positive
- Prompt engineering domain has a dedicated authority with specialized expertise
- Provider compatibility matrix is maintained by a single responsible agent
- Prompt quality standards have clear ownership and can evolve independently
- Template system design is separated from both requirements analysis and UI design
- Domain Modeler receives precise prompt-specific domain specifications to formalize
- UX/UI Architect receives prompt structure context before designing the prompt builder UI
- Export specifications are complete, accurate, and maintained per provider

### Negative
- Coordination overhead between Prompt Engineer and Domain Modeler (overlapping boundary)
- Prompt Engineer must stay current with AI provider API changes
- Additional agent in the workflow adds a dependency step before Domain Modeler and UX/UI can begin
- Provider-specific knowledge may require external research and updates

## Mitigations
- Clear handoff contract defined between Prompt Engineer and Domain Modeler: Prompt Engineer produces specifications, Domain Modeler produces TypeScript entities
- Provider compatibility review triggered when provider APIs change (invocation rule)
- Prompt Engineer's outputs are treated as domain specifications, not code — reducing ambiguity in handoffs
- Provider documentation sources documented in export specifications for update traceability

## Related ADRs
- ADR-001: Technology Stack (establishes the platform this agent specifies prompts for)
- ADR-003: Architecture Guardian Agent (governance agent that will validate Prompt Engineer's domain specifications against ADRs)
