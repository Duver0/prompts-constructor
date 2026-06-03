# Skill: Anime.js Integration

## Domain
Animation

## Invoked By
Frontend Architect Agent

## Purpose
Design and implement reusable Anime.js animation patterns within React using custom hooks, ensuring declarative, performant, and accessible animations.

## Inputs
- Animation specifications from UX/UI Architect
- Component hierarchy
- Design token motion values

## Process
1. Extract animation specs: trigger, target, property, duration, easing, stagger, timeline
2. Create custom hooks for each animation pattern:
   - `useAnimatePresence` — mount/unmount animations
   - `useAnimateTimeline` — sequenced multi-step animations
   - `useAnimateStagger` — staggered list/children animations
   - `useAnimateScroll` — scroll-triggered animations
3. Create a declarative `<Animated>` component wrapper
4. Ensure animations respect `prefers-reduced-motion` (WCAG)
5. Configure Anime.js timeline for complex sequences
6. Implement animation cleanup on unmount (prevent memory leaks)
7. Define animation variants (similar to Framer Motion variants pattern)
8. Create animation composition utilities (combine, sequence, parallel)

## Output
- Animation hook implementations
- `<Animated>` component with variant support
- Animation timing configuration constants
- Reduced-motion fallback implementations
- Animation cleanup and lifecycle management

## Quality Criteria
- All animations respect `prefers-reduced-motion`
- Animations are implemented as reusable hooks
- Animation cleanup prevents memory leaks
- Animations are performant (use transform/opacity, not layout-triggering props)
- Stagger and timeline animations are declaratively configurable
- No animation library calls directly in component JSX
