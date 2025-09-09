import React from 'react'
import { Box, Button, useTheme } from '@mui/material'

import { multiSelectActionButtonsStyles } from '@/lib/design-system/components/multi-select/multiSelectStyles'

interface MultiSelectMenuItemProps {
  onApplyClick: () => void
  onCancelClick: () => void
}

export function MultiSelectActionButtons(
  props: Readonly<MultiSelectMenuItemProps>,
) {
  const theme = useTheme()

  return (
    <Box sx={multiSelectActionButtonsStyles(theme)}>
      <Button size="small" onClick={props.onCancelClick} color={'inherit'}>
        Cancel
      </Button>
      <Button size="small" variant="contained" onClick={props.onApplyClick}>
        Apply
      </Button>
    </Box>
  )
}
