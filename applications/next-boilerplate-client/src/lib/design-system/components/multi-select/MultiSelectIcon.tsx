import { IconButton } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface MultiSelectIconProps {
  isOpen: boolean
}

export function MultiSelectIcon(props: Readonly<MultiSelectIconProps>) {
  return (
    <IconButton color="inherit">
      {props.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  )
}
