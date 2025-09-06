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
      <SearchIcon fontSize="small" style={{ marginRight: 8 }} />
      <InputBase
        placeholder="Search"
        value={props.searchTerm}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          props.setSearchTerm(event.target.value)
        }
        fullWidth
      />
    </Box>
  )
}
