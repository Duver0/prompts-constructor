# Pull Request Policy

## PR Requirements
- Title follows conventional commits: `type(scope): description`
- Description references the issue/user story
- Description includes summary of changes and testing notes
- Screenshots/videos for UI changes
- Checklist completed (pre-review checklist)

## Size Limits
- Maximum 400 lines changed per PR (excluding tests, config, generated files)
- Single concern per PR (no scope creep)
- Break large features into stacked PRs

## Required Status Checks
- TypeScript type check: pass
- Lint: pass
- Unit tests: pass (coverage >= 80%)
- Integration tests: pass (coverage >= 70%)
- Build: pass
- Code Review Agent: pass

## Review Requirements
- At least one approval from Code Reviewer Agent
- All blocker/critical issues resolved
- No unresolved conversations

## Merge Strategy
- Squash merge to `develop` (or `main` for hotfix)
- Commit message follows conventional commits format
- Linear history maintained
