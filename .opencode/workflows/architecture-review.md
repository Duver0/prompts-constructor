# Workflow: Architecture Review

## Trigger
- Quarterly architecture review (scheduled)
- Significant technical debt identified
- Pre-major-release architecture audit
- New architectural pattern consideration
- Security audit requirement

## Agents Involved
1. Orchestrator Agent (facilitate)
2. Architecture Guardian Agent (governance authority, debt register review)
3. Frontend Architect Agent (present and defend)
4. Domain Modeling Agent (domain architecture)
5. UX/UI Architect Agent (UX architecture)
6. Testing Architect Agent (test architecture)
7. DevOps Agent (infrastructure architecture)
8. Code Reviewer Agent (independent assessment)
9. Documentation Agent (record decisions)

## Execution Order

### Phase 1: Preparation (All agents)
1. Each agent reviews their domain for architectural concerns
2. Each agent produces an architecture report for their domain:
   - Current architecture state
   - Known issues and technical debt
   - Improvement recommendations
   - Risk assessment
3. Architecture Guardian prepares technical debt register summary and architecture drift analysis since last review
4. Architecture Guardian produces list of ADR compliance gaps and unaddressed ADR conflicts

### Phase 2: Review Session (Orchestrator-led)
1. Orchestrator convenes review session
2. Architecture Guardian presents technical debt register, drift analysis, and ADR compliance status
3. Each agent presents their domain architecture report
4. Cross-domain impacts are identified and discussed
5. Architecture Guardian provides independent governance assessment with veto recommendations
6. Code Reviewer provides supplementary holistic assessment
7. Conflicts and trade-offs are resolved by Orchestrator (informed by Architecture Guardian's governance position)

### Phase 3: Decision Making (Orchestrator)
1. Orchestrator documents decisions made during review
2. Action items are assigned to responsible agents
3. Prioritization and timeline for improvements
4. Architectural roadmap updated

### Phase 4: Documentation (Documentation Agent)
1. Documentation Agent creates ADRs for new decisions
2. Documentation Agent updates architecture documentation
3. Documentation Agent updates C4 diagrams to reflect changes

### Phase 5: Follow-up (All agents)
1. Assigned agents implement action items
2. Code Reviewer validates implementation of decisions
3. Orchestrator tracks completion of action items

## Deliverables
- Domain architecture reports (per agent)
- Architecture Guardian governance assessment
- Updated technical debt register
- Architecture review summary with decisions
- Action item list with owners and timelines
- New ADRs for architectural decisions
- Updated architecture documentation and diagrams
- Updated architectural roadmap

## Exit Criteria
- All architectural concerns are discussed and documented
- Decisions are made for all open items
- Action items have clear owners and deadlines
- ADRs are created for all decisions
- Architecture documentation is updated
