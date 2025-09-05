import React, { useState, useRef } from 'react'
import {
  Box,
  TextField,
  Popover,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  InputBase,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export interface MultiSelectOption {
  name: string
  id: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  onSelect: (selectedValues: string[]) => void
  label: string
}

export default function MultiSelect(props: Readonly<MultiSelectProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const popoverRef = useRef<string[]>([])

  function openPopover(event: React.MouseEvent<HTMLElement>) {
    popoverRef.current = selected
    setAnchorEl(event.currentTarget)
  }

  function closePopover() {
    setAnchorEl(null)
  }

  function toggleItem(id: string) {
    popoverRef.current = popoverRef.current.includes(id)
      ? popoverRef.current.filter((i) => i !== id)
      : [...popoverRef.current, id]
    setSelected([...popoverRef.current])
  }

  function selectAll() {
    popoverRef.current =
      popoverRef.current.length === props.options.length
        ? []
        : props.options.map((o) => o.id)
    setSelected([...popoverRef.current])
  }

  function applySelection() {
    props.onSelect(popoverRef.current)
    closePopover()
  }

  function cancelSelection() {
    setSelected(popoverRef.current)
    closePopover()
  }

  function filteredOptions() {
    return props.options.filter((option) =>
      option.name.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return (
    <>
      <TextField
        value={selected.length ? `${selected.length} Selected` : ''}
        placeholder={props.label}
        onClick={openPopover}
        fullWidth
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <IconButton
                size="small"
                onClick={anchorEl ? closePopover : openPopover}
              >
                {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            ),
          },
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={cancelSelection}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box p={1} width={250}>
          <Box display="flex" alignItems="center" mb={1}>
            <SearchIcon fontSize="small" style={{ marginRight: 8 }} />
            <InputBase
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </Box>
          <MenuItem onClick={selectAll}>
            <Checkbox
              checked={selected.length === props.options.length}
              indeterminate={
                selected.length > 0 && selected.length < props.options.length
              }
            />
            <ListItemText primary="Select All" />
          </MenuItem>

          {filteredOptions().map((option) => (
            <MenuItem key={option.id} onClick={() => toggleItem(option.id)}>
              <Checkbox checked={selected.includes(option.id)} />
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}

          <Box display="flex" justifyContent="space-between" mt={1}>
            <Button size="small" onClick={cancelSelection}>
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={applySelection}>
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  )
}
