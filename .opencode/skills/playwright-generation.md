# Skill: Playwright Generation

## Domain
Testing

## Invoked By
Testing Architect Agent

## Purpose
Design and implement Playwright E2E test suites for critical user journeys, following Page Object Model pattern with cross-browser and mobile support.

## Inputs
- User flows from UX/UI Architect
- Acceptance criteria from Product Analyst
- Route tree from Frontend Architect
- Component selectors and interaction patterns

## Process
1. Analyze user flows and identify critical journeys
2. Create Page Object Model classes for each page/module
3. Define fixtures for test data and authentication state
4. Write E2E test scenarios covering:
   - Happy path (primary user journey)
   - Error flows (validation, network errors, not found)
   - Edge cases (empty states, boundary values)
5. Configure Playwright for cross-browser testing (Chromium, Firefox, WebKit)
6. Add mobile viewport testing (iPhone, iPad breakpoints)
7. Integrate accessibility scanning per page
8. Add visual regression tests for critical pages
9. Configure Playwright reporter and CI integration
10. Define test retry strategy for flakiness prevention

## Output
- Page Object Model implementations
- E2E test scenarios
- Playwright configuration (multi-browser, viewports)
- Accessibility scan integration
- Visual regression test configuration
- CI integration configuration

## Quality Criteria
- All critical user journeys are covered by E2E tests
- Page Object Model provides clear, reusable selectors and actions
- Tests run on all three browser engines
- Mobile viewports are tested
- Accessibility scanning is part of every page test
- Tests are deterministic and handle async operations properly
- Visual regression has appropriate threshold configuration
