# Skill: Component Design

## Domain
Frontend Architecture

## Invoked By
Frontend Architect Agent

## Purpose
Design and implement React components following accessibility-first, mobile-first responsive design from UX/UI Architect specifications.

## Inputs
- Component hierarchy and specs from UX/UI Architect
- Design tokens (colors, typography, spacing, elevation)
- Animation patterns (from animejs-integration skill)
- Accessibility specifications

## Process
1. Design component interface (props, state, events)
2. Implement component structure with semantic HTML
3. Apply TailwindCSS classes from design tokens
4. Implement responsive variants (mobile-first breakpoints)
5. Add accessibility: ARIA roles, labels, keyboard handlers, focus management
6. Implement state-specific renders (loading, empty, error, success)
7. Integrate animation hooks for mount/update/unmount
8. Add event handlers with proper cleanup
9. Create Component Story for documentation (if requested)
10. Implement component tests (render, interaction, accessibility)

## Output
- TypeScript React component implementation
- Responsive CSS (TailwindCSS classes)
- Accessibility attributes and keyboard handlers
- Animation integration
- Component tests

## Quality Criteria
- Semantic HTML elements used correctly
- All interactive elements are keyboard accessible
- Focus management follows a logical tab order
- ARIA attributes match component role and state
- Mobile-first responsive design (min-width breakpoints)
- Component renders correctly in all states (loading, empty, error, edge cases)
- Props interface is explicit and well-typed
- Component is pure (same props → same output, no side effects in render)
