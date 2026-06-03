# Component Specification: {{COMPONENT_NAME}}

## Purpose
{{PURPOSE_DESCRIPTION}}

## Hierarchy
- **Parent**: {{PARENT_COMPONENT}}
- **Children**: {{CHILD_COMPONENTS}}

## Props Interface
```typescript
interface {{COMPONENT_NAME}}Props {
  {{PROP_DEFINITIONS}}
}
```

## States
| State | Description | Visual |
|-------|-------------|--------|
| Default | {{DEFAULT_STATE_DESC}} | {{DEFAULT_VISUAL}} |
| Loading | {{LOADING_STATE_DESC}} | {{LOADING_VISUAL}} |
| Empty | {{EMPTY_STATE_DESC}} | {{EMPTY_VISUAL}} |
| Error | {{ERROR_STATE_DESC}} | {{ERROR_VISUAL}} |
| Edge | {{EDGE_STATE_DESC}} | {{EDGE_VISUAL}} |

## Accessibility
- **ARIA Role**: {{ARIA_ROLE}}
- **ARIA Labels**: {{ARIA_LABELS}}
- **Keyboard Navigation**: {{KEYBOARD_NAV}}
- **Focus Management**: {{FOCUS_MGMT}}

## Animations
- **Mount**: {{MOUNT_ANIMATION}}
- **Update**: {{UPDATE_ANIMATION}}
- **Unmount**: {{UNMOUNT_ANIMATION}}
- **Interaction**: {{INTERACTION_ANIMATION}}

## Responsive Behavior
- **Mobile (< 640px)**: {{MOBILE_BEHAVIOR}}
- **Tablet (640-1024px)**: {{TABLET_BEHAVIOR}}
- **Desktop (> 1024px)**: {{DESKTOP_BEHAVIOR}}

## Dependencies
{{DEPENDENCIES}}
