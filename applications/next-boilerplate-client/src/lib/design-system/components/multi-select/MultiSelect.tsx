import { multiSelectOptionsWrapperStyles } from '@/lib/design-system/components/multi-select/multiSelectStyles'
import React, { useState, useRef } from 'react'
import {
  Box,
  Popover,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  InputBase,
  IconButton,
  Typography,
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
  selectedLabel: string
  selectedLabelMulti: string
}

export default function MultiSelect(props: Readonly<MultiSelectProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const popoverRef = useRef<string[]>([])

  function openPopover(event: React.MouseEvent<HTMLElement>) {
    popoverRef.current = selected
    setAnchorEl(event.currentTarget)
    setSearch('')
  }

  function closePopover() {
    setAnchorEl(null)
  }

  function onItemClick(id: string) {
    popoverRef.current = popoverRef.current.includes(id)
      ? popoverRef.current.filter((i) => i !== id)
      : [...popoverRef.current, id]
    setSelected([...popoverRef.current])
  }

  function onSelectAllClick() {
    popoverRef.current =
      popoverRef.current.length === props.options.length
        ? []
        : props.options.map((o) => o.id)
    setSelected([...popoverRef.current])
  }

  function onApplyClick() {
    props.onSelect(popoverRef.current)
    closePopover()
  }

  function onCancelClick() {
    setSelected(popoverRef.current)
    closePopover()
  }

  function filteredOptions() {
    return props.options.filter((option: MultiSelectOption): boolean =>
      option.name.toLowerCase().includes(search.toLowerCase()),
    )
  }

  function getLabel() {
    if (!selected.length) {
      return props.label
    }

    return `${selected.length} ${
      selected.length === 1 ? props.selectedLabel : props.selectedLabelMulti
    } selected`
  }

  return (
    <>
      <Box
        onClick={openPopover}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        border={1}
        borderColor="grey.400"
        borderRadius={1}
        px={2}
        py={1}
        sx={{ cursor: 'pointer', minHeight: 40 }}
      >
        <Typography variant="body2">{getLabel()}</Typography>
        <IconButton
          size="small"
          onClick={anchorEl ? closePopover : openPopover}
          sx={{ p: 0 }}
        >
          {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onCancelClick}
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
          <Box sx={multiSelectOptionsWrapperStyles}>
            <MenuItem onClick={onSelectAllClick}>
              <Checkbox
                checked={selected.length === props.options.length}
                indeterminate={
                  selected.length > 0 && selected.length < props.options.length
                }
              />
              <ListItemText primary="Select All" />
            </MenuItem>
            {filteredOptions().map((option) => (
              <MenuItem key={option.id} onClick={() => onItemClick(option.id)}>
                <Checkbox checked={selected.includes(option.id)} />
                <ListItemText primary={option.name} />
              </MenuItem>
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Button size="small" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={onApplyClick}>
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  )
}
