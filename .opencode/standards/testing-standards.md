# Testing Standards

## Test Pyramid

```
      ╱╲
     ╱ E2E ╲          ← 5-10% — Playwright critical journeys
    ╱────────╲
   ╱Integration╲       ← 20-30% — Feature workflows, store + component
  ╱──────────────╲
 ╱   Unit Tests    ╲    ← 60-70% — Domain model, utilities, hooks
╱────────────────────╲
```

## Coverage Requirements
- **Unit tests**: >= 80% line coverage, >= 70% branch coverage
- **Integration tests**: >= 70% line coverage for feature workflows
- **E2E tests**: All critical user journeys, all acceptance criteria

## Test Types

### Unit Tests (Vitest)
- Pure functions (domain rules, validators, utilities)
- Zustand stores (state transitions, actions)
- Custom hooks (behavioral testing with renderHook)
- Value objects (equality, construction, validation)
- No mocks for pure functions; mock infrastructure boundaries

### Component Tests (Vitest + RTL)
- Render each component in all states (normal, loading, empty, error)
- Verify accessibility (jest-axe or vitest-axe)
- Test user interactions (click, type, drag)
- Mock only store and hook dependencies
- Test responsive behavior with viewport mocks

### Integration Tests (Vitest + RTL)
- Feature workflows spanning multiple components
- Store-to-component data flow
- Navigation and routing scenarios
- Real stores with mock infrastructure

### E2E Tests (Playwright)
- Complete user journeys (create prompt, version, export)
- Cross-browser: Chromium, Firefox, WebKit
- Mobile viewport testing (375px, 768px, 1024px)
- Accessibility scan per page
- Visual regression testing

## Test Naming
- `ComponentName.test.tsx` for component tests
- `useHookName.test.ts` for hook tests
- `storeName.test.ts` for store tests
- `entityName.test.ts` for domain tests
- `feature-name.e2e.ts` for E2E tests

## Test Structure (AAA)
```
describe('ComponentName', () => {
  describe('when initializing', () => {
    it('renders the default state', () => { ... })
  })
  describe('when user interacts', () => {
    it('handles click event', () => { ... })
  })
})
```

## Mock Strategy
- **Domain layer**: No mocks (pure functions tested directly)
- **Application layer**: Mock repository interfaces
- **Presentation layer**: Mock stores and hooks
- **Infrastructure layer**: Mock browser APIs (localStorage, IndexedDB)
