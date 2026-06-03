# Skill: Security Review

## Domain
Code Review

## Invoked By
Code Reviewer Agent

## Purpose
Perform security vulnerability assessment on source code, focusing on XSS prevention, injection risks, dependency vulnerabilities, and secrets exposure.

## Inputs
- Source code files
- Dependency manifest (package.json, bun.lock)
- Configuration files
- Previous security review reports

## Process
1. Scan for XSS vulnerabilities:
   - `dangerouslySetInnerHTML` usage without sanitization
   - User input rendered without encoding
   - URL input validation
2. Scan for injection vulnerabilities:
   - Dynamic `eval()` or `new Function()` usage
   - Dynamic imports from user-influenced paths
   - CSS injection via style attributes
3. Audit dependency vulnerabilities:
   - Run `bun audit` / `npm audit` equivalent
   - Flag outdated packages with known CVEs
   - Check for supply chain risks (unmaintained packages)
4. Check for secrets exposure:
   - Hardcoded API keys, tokens, passwords
   - .env files committed
   - Secrets in source code comments
5. Verify CSP (Content Security Policy) configuration
6. Check localStorage/IndexedDB for sensitive data storage
7. Validate CORS and external resource loading

## Output
- Security vulnerability report with severity levels
- Dependency vulnerability audit
- Remediation recommendations per finding
- Security compliance score

## Quality Criteria
- All XSS vectors are identified and mitigated
- No hardcoded secrets in codebase
- Dependency vulnerabilities are documented with remediation version
- CSP configuration is validated
- Sensitive data handling follows best practices
