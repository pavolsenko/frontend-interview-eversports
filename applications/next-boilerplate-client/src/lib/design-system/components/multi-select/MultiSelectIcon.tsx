import { MouseEvent } from 'react'
import { Box, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface MultiSelectIconProps {
  label: string
  isOpen: boolean
  isClearable: boolean
  onClearClick: (event: MouseEvent<HTMLElement>) => void
}

export function MultiSelectIcon(props: Readonly<MultiSelectIconProps>) {
  return (
    <Box>
      {props.isClearable ? (
        <IconButton
          color={'inherit'}
          onClick={props.onClearClick}
          aria-label="Clear search"
        >
          <ClearIcon />
        </IconButton>
      ) : null}
      <IconButton
        color={'inherit'}
        aria-label={`Expand ${props.label} search dropdown`}
      >
        {props.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>
  )
}
