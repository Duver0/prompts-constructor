# Release Criteria

## Versioning
- Follow [Semantic Versioning 2.0.0](https://semver.org/)
- Format: `MAJOR.MINOR.PATCH`
- MAJOR: breaking UI/UX or data model changes
- MINOR: new features, non-breaking
- PATCH: bug fixes, performance improvements

## Pre-Release Checklist

### Quality Gates
- [ ] All CI pipeline stages pass (typecheck, lint, unit, integration, E2E, build)
- [ ] Unit test coverage >= 80%
- [ ] Integration test coverage >= 70%
- [ ] E2E tests pass for all critical journeys
- [ ] Code Reviewer Agent: pass verdict
- [ ] No blocker or critical issues open

### Performance
- [ ] Lighthouse score >= 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Bundle size within budget (JS < 300KB gzipped, CSS < 50KB gzipped)
- [ ] No known performance regressions

### Accessibility
- [ ] WCAG 2.1 AA compliance verified
- [ ] axe-core scan passes with zero critical violations
- [ ] Keyboard navigation verified on all pages
- [ ] Screen reader compatibility verified

### Security
- [ ] No known vulnerabilities in dependencies (npm audit pass)
- [ ] No secrets exposed in codebase
- [ ] No XSS vulnerabilities in user-generated content rendering

### Documentation
- [ ] CHANGELOG.md updated with release notes
- [ ] ADRs created for new architectural decisions
- [ ] Version number updated in package.json

### Release Process
1. Create release branch: `release/v<version>` from `develop`
2. Run full CI pipeline on release branch
3. Create annotated git tag: `git tag -a v<version> -m "<message>"`
4. GitHub Actions builds and deploys to GitHub Pages
5. Verify production deployment
6. Merge release branch to `main` and `develop`
7. Delete release branch
8. Announce release

## Rollback
- Git revert the release tag
- Re-run CI/CD to deploy previous version
- Notify team of rollback with reason
