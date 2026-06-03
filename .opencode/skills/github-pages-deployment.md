# Skill: GitHub Pages Deployment

## Domain
DevOps

## Invoked By
DevOps Agent

## Purpose
Configure and automate static site deployment to GitHub Pages with proper routing, asset handling, and SPA fallback support.

## Inputs
- Vite build configuration
- GitHub repository settings
- SPA routing requirements

## Process
1. Configure Vite for GitHub Pages:
   - Set `base` path to repository name (or custom domain)
   - Enable relative asset paths
2. Configure SPA fallback (404.html → index.html for client-side routing)
3. Create `.nojekyll` file to disable Jekyll processing
4. Configure GitHub Pages source in repository settings (GitHub Actions)
5. Design deployment workflow:
   - Build production artifacts
   - Upload as GitHub Pages artifact
   - Deploy using `actions/deploy-pages`
6. Configure custom domain (if applicable) via CNAME file
7. Set up 404 page for SPA routing
8. Configure cache headers for static assets
9. Test deployment in staging environment (deployment preview)
10. Document rollback procedure

## Output
- Vite GitHub Pages configuration
- SPA fallback (404.html)
- .nojekyll file
- GitHub Pages deployment workflow YAML
- CNAME file (if custom domain)
- Cache header configuration

## Quality Criteria
- SPA client-side routing works after page refresh
- All asset paths are correct on production
- Build is reproducible across CI environments
- Deployment completes in < 3 minutes
- Rollback can be performed by re-deploying previous artifact
- 404 page provides navigation back to working app
