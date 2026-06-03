# Pre-Release Checklist

## Quality Gates
- [ ] All CI pipeline stages pass (typecheck, lint, unit, integration, E2E, build)
- [ ] Unit test coverage >= 80%
- [ ] Integration test coverage >= 70%
- [ ] E2E tests pass for all critical journeys
- [ ] Code Reviewer Agent: pass verdict
- [ ] No blocker or critical issues open

## Performance
- [ ] Lighthouse score >= 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Bundle size within budget (JS < 300KB gzipped, CSS < 50KB gzipped)
- [ ] No performance regressions from previous release

## Accessibility
- [ ] WCAG 2.1 AA compliance verified
- [ ] axe-core scan passes with zero critical violations
- [ ] Keyboard navigation verified on all pages
- [ ] Screen reader compatibility verified

## Security
- [ ] No known vulnerabilities (`bun audit` passes)
- [ ] No secrets exposed in codebase
- [ ] CSP headers configured correctly

## Documentation
- [ ] CHANGELOG.md updated
- [ ] All ADRs created for new decisions
- [ ] Version number updated (package.json)
- [ ] Release notes drafted

## Deployment
- [ ] Release branch created
- [ ] Git tag created and pushed
- [ ] Production build validated
- [ ] Deployment smoke test passes
- [ ] Rollback plan documented
