import { ChangeEvent, useState, useEffect } from 'react'
import { Box, InputBase, IconButton, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import { multiSelectItemStyles } from '@/lib/design-system/components/multi-select/multiSelectStyles'

interface MultiSelectSearchProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

export function MultiSelectSearch(props: Readonly<MultiSelectSearchProps>) {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState<string>(props.searchTerm)

  useEffect(() => {
    const handler = setTimeout(() => {
      props.setSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm, props])

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function onClear() {
    setSearchTerm('')
    props.setSearchTerm('')
  }

  return (
    <Box sx={multiSelectItemStyles(theme, true)}>
      <SearchIcon fontSize="small" style={{ marginLeft: '10px' }} />
      <InputBase
        placeholder="Search"
        value={searchTerm}
        onChange={onChange}
        sx={{ marginLeft: '20px' }}
        fullWidth
      />
      {searchTerm ? (
        <IconButton onClick={onClear} aria-label="Clear search">
          <CloseIcon />
        </IconButton>
      ) : null}
    </Box>
  )
}
