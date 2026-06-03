# Review Policy

## Scope of Review
Every review must assess:
1. **Architecture compliance**: Clean Architecture layers, SOLID principles
2. **Code quality**: Readability, maintainability, naming, complexity
3. **TypeScript strictness**: No `any`, proper generics, type safety
4. **Testing quality**: Meaningful assertions, coverage, isolation
5. **Accessibility**: ARIA attributes, keyboard navigation, focus management
6. **Performance**: Unnecessary re-renders, bundle size, expensive operations
7. **Security**: XSS prevention, injection risks, secrets exposure
8. **Standards compliance**: Coding standards, naming conventions, file organization

## Severity Levels
| Severity | Definition | Action Required |
|----------|------------|----------------|
| Blocker | Violates architecture or security | Must fix before merge |
| Critical | Major quality or correctness issue | Must fix before merge |
| Major | Significant standards violation | Should fix before merge |
| Minor | Style or minor convention issue | Suggestion, optional |
| Info | Observation or improvement idea | No action required |

## Review Process
1. Code Reviewer Agent receives source code and test files
2. Agent performs automated analysis against standards
3. Agent produces review report with per-file findings
4. Agent assigns compliance score and quality verdict
5. Orchestrator reviews the review report
6. Issues are resolved by the responsible agent
7. Re-review if blocker/critical issues were identified
8. Approval granted when quality verdict is `pass`

## SLA
- Standard review: < 5 minutes (automated)
- Re-review: < 2 minutes
