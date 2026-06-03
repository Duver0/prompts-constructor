# Skill: Architecture Validation

## Domain
Architecture Governance

## Invoked By
Architecture Guardian Agent

## Purpose
Perform systematic architecture validation of proposed code changes against SOLID principles, Clean Architecture layers, Domain-Driven Design patterns, ADRs, and coding standards. Produce assessment, compliance report, and risk analysis with veto capability.

## Inputs
- Feature specifications and user stories
- Approved ADRs and architecture documentation
- Source code diffs / pull requests
- Refactor proposals
- Dependency change proposals
- Coding standards and governance documents
- Technical debt register

## Process

### Phase 1: Context Acquisition
1. Load all relevant ADRs and architecture documents
2. Load applicable standards (coding, testing, branching, DoD)
3. Load technical debt register for existing entries
4. Understand proposal scope (new feature, refactor, dependency change)

### Phase 2: SOLID Validation
1. **SRP**: For each module/class, identify its responsibility. Flag if >1 concern exists.
2. **OCP**: Identify extension points. Flag if modification is required instead of extension.
3. **LSP**: Examine subtype relationships. Flag if subtype alters base contract invariants.
4. **ISP**: Examine interface surface area. Flag if consumers depend on methods they don't use.
5. **DIP**: Trace dependency graphs. Flag if high-level modules import low-level concrete implementations.

### Phase 3: Clean Architecture Validation
1. Verify dependency direction: domain ← application ← presentation → infrastructure
2. Flag domain layer imports of framework/infrastructure code
3. Flag presentation layer containing business logic or domain rules
4. Flag infrastructure layer referencing UI components or routing
5. Flag circular dependency chains

### Phase 4: DDD Tactical Pattern Validation
1. Verify aggregate consistency boundaries are respected
2. Flag value object mutability (should be immutable)
3. Flag entity identity violations (equality by reference vs. by ID)
4. Verify repository interfaces are domain abstractions, not infrastructure contracts
5. Flag domain events used outside domain layer

### Phase 5: ADR Compliance Validation
1. For each approved ADR, check if proposal aligns with the decision
2. Flag any deviation from approved ADRs
3. If deviation found, verify new ADR is proposed alongside the change
4. Flag changes that silently override ADRs without documentation

### Phase 6: Feature Boundary Validation
1. Verify no cross-feature imports between independent feature modules
2. Flag shared utilities that create implicit coupling
3. Verify public API surfaces (barrel exports) are minimal and intentional
4. Flag feature modules accessing internals of other feature modules

### Phase 7: Dependency Governance
1. Review new dependency proposals for necessity and alternatives
2. Check dependency licensing compatibility
3. Assess bundle size impact of new dependencies
4. Flag dependency that duplicates existing functionality
5. Flag runtime dependency when build-time alternative exists

### Phase 8: Technical Debt Assessment
1. Review proposed changes for architectural shortcuts
2. Flag temporary workarounds without associated follow-up issues
3. Identify duplication risks introduced by the proposal
4. Update technical debt register with new entries

### Phase 9: Report Generation
1. Compile architecture assessment with status and risk level
2. Generate compliance report (passed/failed checks per principle)
3. Generate risk analysis (short-term, long-term, maintainability)
4. Issue verdict: approved | conditional (with required actions) | vetoed

## Output
- Architecture assessment (status, risk, violations, recommendations)
- Architecture compliance report (per-principle check results)
- Architecture risk analysis (temporal impact assessment)
- Technical debt register update

## Quality Criteria
- Every violation cites the specific rule or principle violated
- Vetoes include clear remediation guidance
- False positive rate < 5% (validated against resolved reviews)
- ADR conflicts are caught before code is written
- Dependency governance prevents unnecessary library additions
- Technical debt entriesenable prioritization and tracking
- Assessment is produced before Code Reviewer Agent begins work
