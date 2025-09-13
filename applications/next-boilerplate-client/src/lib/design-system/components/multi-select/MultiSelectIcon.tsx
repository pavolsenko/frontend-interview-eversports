import { MouseEvent } from 'react'
import { Box, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface MultiSelectIconProps {
  isOpen: boolean
  isClearable: boolean
  onClearClick: (event: MouseEvent<HTMLElement>) => void
}

export function MultiSelectIcon(props: Readonly<MultiSelectIconProps>) {
  return (
    <Box>
      {props.isClearable ? (
        <IconButton onClick={props.onClearClick}>
          <ClearIcon />
        </IconButton>
      ) : null}
      <IconButton color="inherit">
        {props.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>
  )
}
