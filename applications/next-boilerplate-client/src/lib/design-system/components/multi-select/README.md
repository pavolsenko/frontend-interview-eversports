# Reusable MultiSelect component

## Design

Since the design system which this component would be coming from
might be a separate library I've placed the component in the `lib`
folder.

-
- this component uses Material UI

Variables from Figma are handled similarly in Material UI and passed
as theme variable to the styling. All custom theme settings
(primary color, typography, border radius, etc.) are configured
in the file `theme.ts` and injected to components using the `useTheme`
hook.

- paddings/margin are defined as multiplies of 4 e.g:
  - `padding: theme.spacing(0)` is padding of 4px
  - `padding: theme.spacing(1)` is padding of 8px
  - `padding: theme.spacing(2)` is padding of 16px etc.
- border radius is defined in the theme as `theme.shape.borderRadius`

### Additions UX updates/decisions

no options - message in the middle of the window - control elements disabled
no search results - message in the middle of the popover

UX challenge - how the select all checkbox should behave

- select all applies only to the
- use isIndeterminat?

as a bonus I've added unit tests using jest
