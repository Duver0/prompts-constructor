# Skill: Prompt Quality Evaluation

## Domain
Prompt Engineering

## Invoked By
Prompt Engineer Agent

## Purpose
Evaluate prompt quality across multiple dimensions — clarity, ambiguity, redundancy, instruction conflicts, missing context, output reliability — producing quality scores and actionable optimization recommendations.

## Inputs
- Prompt structure and content (blocks, variables, composition)
- Prompt domain specifications (validation rules, block definitions)
- Quality standard requirements

## Process

### Phase 1: Structural Quality Assessment
1. Evaluate block completeness (all required blocks present)
2. Evaluate block ordering (correct hierarchy and sequence)
3. Evaluate composition validity (no rule violations)
4. Evaluate variable completeness (all required variables defined)
5. Assign structural quality score (1-10)

### Phase 2: Content Quality Assessment
1. Evaluate clarity: Are instructions specific and unambiguous?
2. Evaluate conciseness: Is content free of redundancy and fluff?
3. Evaluate conflicts: Are there contradictory instructions?
4. Evaluate context sufficiency: Is enough background provided?
5. Evaluate example quality: Are examples representative and clear?
6. Assign content quality score (1-10)

### Phase 3: Provider Compatibility Assessment
1. Evaluate format compatibility with target provider
2. Evaluate context window fit (token usage vs. limit)
3. Evaluate feature compatibility (no unsupported features used)
4. Assign provider compatibility score (1-10)

### Phase 4: Optimization Recommendation
1. For each quality shortfall, generate specific improvement recommendation:
   - Ambiguous instruction → suggest rewording with specificity heuristics
   - Missing context → identify which context block is needed
   - Redundant content → flag duplication with location references
   - Instruction conflict → identify conflicting pairs with resolution suggestion
   - Token overuse → suggest compression strategies per block

### Phase 5: Quality Report Generation
1. Compile scores into an overall quality rating
2. Categorize issues by severity (info, warning, critical)
3. Order improvements by impact (high → low)
4. Generate final quality report with actionable recommendations

## Output
- Structural quality score with sub-dimension breakdown
- Content quality score with sub-dimension breakdown
- Provider compatibility score with sub-dimension breakdown
- Overall quality rating with categorization
- Optimization recommendation catalog (per-issue, severity, impact)
- Improvement priority order

## Quality Criteria
- Quality scores are consistent and reproducible for the same prompt
- Each issue includes a clear remediation suggestion
- Severity ratings map to concrete impact on output quality
- Optimization recommendations are actionable (not generic)
- Provider compatibility assessment considers all active providers
