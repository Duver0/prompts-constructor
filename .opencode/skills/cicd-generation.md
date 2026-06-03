# Skill: CI/CD Generation

## Domain
DevOps

## Invoked By
DevOps Agent

## Purpose
Design and implement GitHub Actions CI/CD pipelines for automated type checking, linting, testing, building, and deploying to GitHub Pages.

## Inputs
- Build configuration (Vite, TypeScript)
- Test configuration (Vitest, Playwright)
- Deployment target (GitHub Pages)
- Project constraints (Bun runtime)

## Process
1. Design CI pipeline stages:
   - Setup (Bun install, cache)
   - Type check (tsc --noEmit)
   - Lint (ESLint)
   - Unit + integration tests (Vitest)
   - Build (vite build)
   - Artifact validation
2. Design CD pipeline for GitHub Pages deployment:
   - Trigger on push to main / release tag
   - Build production bundle
   - Deploy to GitHub Pages
3. Configure parallelization for independent jobs
4. Set up caching for node_modules and build outputs
5. Add status checks configuration (required for branch protection)
6. Design deployment preview pipeline for pull requests
7. Configure environment-specific variables and secrets
8. Add performance budget enforcement step
9. Design release workflow with versioning and tagging

## Output
- GitHub Actions CI workflow YAML
- GitHub Actions CD workflow YAML
- Deployment preview workflow
- Release workflow
- Cache configuration
- Status check definitions

## Quality Criteria
- Pipeline completes within 10 minutes
- Jobs are parallelized where possible
- Cache hits reduce setup time by >50%
- Deployment is automated with zero manual steps
- All status checks are required for branch protection
- Secrets and environment variables are properly managed
