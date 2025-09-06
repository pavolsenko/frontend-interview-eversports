import React from 'react'
import { Checkbox, ListItemText, MenuItem, useTheme } from '@mui/material'

import { MultiSelectOption } from '@/lib/design-system/components/multi-select/MultiSelect'

import { multiSelectItemStyles } from '@/lib/design-system/components/multi-select/multiSelectStyles'

interface MultiSelectMenuItemProps {
  option: MultiSelectOption
  isChecked: boolean
  onItemClick: (id: string) => void
}

export function MultiSelectMenuItem(props: Readonly<MultiSelectMenuItemProps>) {
  const theme = useTheme()

  return (
    <MenuItem
      onClick={() => props.onItemClick(props.option.id)}
      sx={multiSelectItemStyles(theme)}
    >
      <Checkbox checked={props.isChecked} />
      <ListItemText primary={props.option.name} />
    </MenuItem>
  )
}
