# Definition of Done

A feature or user story is considered **Done** when all of the following are satisfied:

## Functional
- [ ] All acceptance criteria are met
- [ ] All edge cases are handled (empty, error, loading, boundary states)
- [ ] Feature works on all target browsers (Chrome, Firefox, Safari)
- [ ] Feature works on all target viewports (mobile, tablet, desktop)
- [ ] Keyboard navigation is fully functional
- [ ] Screen reader compatibility verified

## Code Quality
- [ ] TypeScript strict mode passes with zero errors
- [ ] Lint passes with zero warnings
- [ ] Coding standards are followed
- [ ] Clean Architecture layers are respected
- [ ] SOLID principles are applied
- [ ] No blocker or critical code review findings

## Testing
- [ ] Unit tests written and passing (>= 80% coverage)
- [ ] Component tests written for all states
- [ ] Integration tests written for feature workflows
- [ ] E2E tests written for critical journey
- [ ] Accessibility tests pass
- [ ] No flaky tests

## Documentation
- [ ] Component API is documented (if public)
- [ ] ADR created if architectural decision was made
- [ ] User-facing changes noted for changelog

## DevOps
- [ ] CI pipeline passes all stages
- [ ] Build produces no errors
- [ ] Bundle size within budget
- [ ] Deployed to GitHub Pages (if release)

## Governance
- [ ] PR approved by Code Reviewer Agent
- [ ] Branch is up to date with target
- [ ] Squash merged with conventional commit
- [ ] Feature branch deleted
