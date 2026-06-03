# Skill: Performance Review

## Domain
Code Review

## Invoked By
Code Reviewer Agent

## Purpose
Assess code and bundle performance, identifying unnecessary re-renders, large bundle imports, expensive computations, and memory leaks.

## Inputs
- Source code files
- Component hierarchy
- Zustand store definitions
- Bundle analysis output (if available)

## Process
1. Review React rendering performance:
   - Components without `key` props in lists
   - Unnecessary re-renders (parent re-render affecting children)
   - Missing `React.memo` on expensive components
   - Inline function/object creation in render
2. Review bundle performance:
   - Large library imports (check tree-shaking compatibility)
   - Dynamic imports for code splitting opportunities
   - Unused imports and dead code
3. Review animation performance:
   - Animations triggering layout (not transform/opacity)
   - Missing `will-change` on animated elements
   - Animation cleanup on unmount
4. Review state management performance:
   - Overly broad Zustand subscriptions (selector granularity)
   - Frequent store updates causing cascading re-renders
   - Missing use of `shallow` equality checks
5. Review expensive computations:
   - Missing `useMemo` for derived data
   - Missing `useCallback` for stable callbacks
   - Expensive operations in render functions
6. Check for memory leaks:
   - Event listener cleanup
   - setInterval/setTimeout cleanup
   - Subscription cleanup in useEffect

## Output
- Performance review report with severity levels
- Specific optimization recommendations with code examples
- Rendering performance assessment
- Bundle optimization suggestions

## Quality Criteria
- All identified performance issues have measurable impact
- Recommendations include specific code changes
- Bundle optimization suggestions specify potential size savings
- Re-render issues include component path and frequency
- Memory leak risks have reproduction scenarios
