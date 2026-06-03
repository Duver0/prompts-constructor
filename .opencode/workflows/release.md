# Workflow: Release

## Trigger
- Feature complete milestone reached
- Scheduled release date
- Critical bug fix needs deployment
- Orchestrator initiates release process

## Agents Involved
1. Orchestrator Agent (coordinate release)
2. Architecture Guardian Agent (architecture integrity verification)
3. Testing Architect Agent (release validation)
4. DevOps Agent (build and deploy)
5. Code Reviewer Agent (final audit)
6. Documentation Agent (release notes)
7. Product Analyst Agent (feature verification)

## Execution Order

### Phase 1: Release Planning (Orchestrator)
1. Orchestrator reviews completed features against release criteria
2. Orchestrator determines version bump (MAJOR/MINOR/PATCH)
3. Orchestrator creates release branch: `release/v<version>`
4. Orchestrator assigns tasks to agents

### Phase 2: Architecture Integrity Verification (Architecture Guardian)
1. Architecture Guardian performs final architecture integrity scan across all new code
2. Architecture Guardian validates no architectural drift occurred during the release cycle
3. Architecture Guardian reviews technical debt register for critical items
4. Architecture Guardian produces release architecture sign-off
5. If vetoed → blocking issues must be resolved before release proceeds

### Phase 3: Feature Verification (Product Analyst)
1. Product Analyst verifies all planned features are complete
2. Product Analyst validates acceptance criteria are met
3. Product Analyst confirms no open blocking issues

### Phase 4: Release Validation (Testing Architect)
1. Testing Architect runs full test suite on release branch
2. Testing Architect runs E2E tests across all browsers
3. Testing Architect performs accessibility audit
4. Testing Architect runs Lighthouse CI for performance budgets
5. Testing Architect validates coverage thresholds

### Phase 5: Security Audit (Code Reviewer)
1. Code Reviewer runs dependency vulnerability audit
2. Code Reviewer performs security review of new code
3. Code Reviewer checks for secrets exposure
4. Code Reviewer issues security compliance verdict

### Phase 6: Build & Deploy (DevOps)
1. DevOps Agent runs production build
2. DevOps Agent validates build artifacts (integrity, size)
3. DevOps Agent deploys to GitHub Pages
4. DevOps Agent verifies deployment (smoke test)
5. DevOps Agent creates git tag

### Phase 7: Documentation (Documentation Agent)
1. Documentation Agent generates changelog
2. Documentation Agent updates release notes
3. Documentation Agent archives ADRs for the release

### Phase 8: Release Finalization (Orchestrator)
1. Orchestrator verifies all deliverables
2. Orchestrator approves release as complete
3. Orchestrator notifies user of successful release

## Deliverables
- Architecture integrity sign-off (Architecture Guardian)
- Production build with validated artifacts
- GitHub Pages deployment
- Git tag (`v<version>`)
- Changelog and release notes
- Post-release validation report

## Exit Criteria
- Architecture Guardian sign-off (no architectural drift)
- All CI/CD pipeline stages pass
- Coverage thresholds met
- Performance budgets met
- Accessibility audit passes
- Security audit passes (zero critical vulnerabilities)
- Deployment verified with smoke tests
- Release branch merged to `main` and `develop`
- Release tag created and pushed
- Changelog published
