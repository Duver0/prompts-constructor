# Pre-Commit Checklist

Before making a commit, verify:

## Code Quality
- [ ] TypeScript compiles with zero errors (`bun run typecheck`)
- [ ] Lint passes with zero warnings (`bun run lint`)
- [ ] No `any` types introduced
- [ ] All new code has explicit return types
- [ ] No debug code, console.log, or commented-out code
- [ ] Import order follows standards

## Testing
- [ ] Unit tests pass (`bun run test:unit`)
- [ ] New code has corresponding tests
- [ ] Tests cover all states (loading, empty, error, edge cases)

## Standards
- [ ] File naming follows conventions
- [ ] Component follows accessibility requirements
- [ ] Mobile-first responsive classes applied
- [ ] No hardcoded strings (use constants where appropriate)

## Commit Message
- [ ] Follows conventional commits format
- [ ] References issue/ticket number if applicable
- [ ] Description clearly states what and why
