import { ChangeEvent } from 'react'
import { Box, InputBase, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { multiSelectItemStyles } from '@/lib/design-system/components/multi-select/multiSelectStyles'

interface MultiSelectSearchProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

export function MultiSelectSearch(props: Readonly<MultiSelectSearchProps>) {
  const theme = useTheme()

  return (
    <Box sx={multiSelectItemStyles(theme, true)}>
      <SearchIcon fontSize="small" style={{ marginLeft: '10px' }} />
      <InputBase
        placeholder="Search"
        value={props.searchTerm}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          props.setSearchTerm(event.target.value)
        }
        sx={{ marginLeft: '20px' }}
        fullWidth
      />
    </Box>
  )
}
