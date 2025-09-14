# Reusable MultiSelect Component

A customizable and responsive MultiSelect component built with **Material UI**. This component is designed to be easily integrated into projects while maintaining a consistent design system.

---

## Design

- The component lives in the `lib` folder, since the design system would typically come from a separate library.
- Styling is handled with **Material UI**, using theme variables to stay consistent with the Figma design.
- All custom theme settings (primary color, typography, border radius, etc.) are defined in `theme.ts` and injected into components using the `useTheme` hook.

### Theme conventions

- **Spacing** is defined in multiples of 4:
  - `theme.spacing(0)` → 4px
  - `theme.spacing(1)` → 8px
  - `theme.spacing(2)` → 16px
- **Border radius** is defined in the theme as `theme.shape.borderRadius`

### Responsiveness

The component leverages Material UI’s responsive grid system. Example:

```tsx
<Grid
  size={{
    xs: 12,
    md: 6,
    lg: 3,
    xl: 2,
  }}
>
  <ProductItem product={product} />
</Grid>
```

## UX decisions and behavior

- **No options available**  
  Display a message in the center of the window and disable control elements.

- **No search results**  
  Display a message in the center of the popover.

- **Broken images**  
  Broken images are replaced with an icon.

### Select all behavior

- "Select all" applies only to the currently displayed items.
- `isIndeterminate` is used to reflect partial selections.

### Pagination

- Default page size: **24 items**
- This number divides evenly into a uniform grid across common screen sizes.

## Bonus features

- Unit tests added using Jest
- ARIA labels added to icon buttons that do not have visible labels for improved accessibility
- Back to top button on search results
