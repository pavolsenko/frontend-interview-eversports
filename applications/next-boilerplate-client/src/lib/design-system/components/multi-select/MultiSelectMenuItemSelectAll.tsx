import { Checkbox, ListItemText, MenuItem, useTheme } from '@mui/material'
import React from 'react'

import { multiSelectItemStyles } from '@/lib/design-system/components/multi-select/multiSelectStyles'

interface MultiSelectMenuItemSelectAllProps {
  onClick: () => void
  isChecked: boolean
  isIndeterminate?: boolean
}

export function MultiSelectMenuItemSelectAll(
  props: Readonly<MultiSelectMenuItemSelectAllProps>,
) {
  const theme = useTheme()

  return (
    <MenuItem onClick={props.onClick} sx={multiSelectItemStyles(theme, true)}>
      <Checkbox
        checked={props.isChecked}
        indeterminate={props.isIndeterminate}
      />
      <ListItemText primary="Select All" />
    </MenuItem>
  )
}
