import React, { useState, useRef, MouseEvent } from 'react'
import { Box, Popover, IconButton, Typography, useTheme } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

import { MultiSelectOptions } from '@/lib/design-system/components/multi-select/MultiSelectOptions'
import { MultiSelectActionButtons } from '@/lib/design-system/components/multi-select/MultiSelectActionButtons'
import { MultiSelectSearch } from '@/lib/design-system/components/multi-select/MultiSelectSearch'

import {
  multiSelectPopoverStyles,
  multiSelectStyles,
} from '@/lib/design-system/components/multi-select/multiSelectStyles'

export interface MultiSelectOption {
  name: string
  id: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  onSelect: (selectedValues: string[]) => void
  selectedOptions?: string[]
  label: string
  selectedLabel: string
  selectedLabelMulti: string
}

export default function MultiSelect(props: Readonly<MultiSelectProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    props.selectedOptions || [],
  )
  const [search, setSearch] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const popoverRef = useRef<string[]>([])
  const theme = useTheme()

  function openPopover(event: MouseEvent<HTMLElement>) {
    popoverRef.current = selectedOptions
    setAnchorEl(event.currentTarget)
    setSearch('')
    setIsOpen(true)
  }

  function closePopover() {
    setAnchorEl(null)
    setIsOpen(false)
  }

  function onItemClick(id: string) {
    popoverRef.current = popoverRef.current.includes(id)
      ? popoverRef.current.filter((item: string): boolean => item !== id)
      : [...popoverRef.current, id]
    setSelectedOptions([...popoverRef.current])
  }

  function onSelectMultiple(ids: string[]) {
    setSelectedOptions(ids)
  }

  function onApplyClick() {
    props.onSelect(popoverRef.current)
    closePopover()
  }

  function onCancelClick() {
    setSelectedOptions(props.selectedOptions || [])
    closePopover()
  }

  function filteredOptions() {
    return props.options.filter((option: MultiSelectOption): boolean =>
      option.name.toLowerCase().includes(search.toLowerCase()),
    )
  }

  function getLabel() {
    if (!selectedOptions.length) {
      return props.label
    }

    return `${selectedOptions.length} ${
      selectedOptions.length === 1
        ? props.selectedLabel
        : props.selectedLabelMulti
    } selected`
  }

  return (
    <>
      <Box onClick={openPopover} sx={multiSelectStyles(theme, isOpen)}>
        <Typography variant="body2">{getLabel()}</Typography>
        <IconButton color="inherit">
          {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onCancelClick}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={multiSelectPopoverStyles(theme)}>
          <MultiSelectSearch searchTerm={search} setSearchTerm={setSearch} />

          <MultiSelectOptions
            options={filteredOptions()}
            selectedOptions={selectedOptions}
            onItemClick={onItemClick}
            onSelectMultiple={onSelectMultiple}
          />

          <MultiSelectActionButtons
            onApplyClick={onApplyClick}
            onCancelClick={onCancelClick}
          />
        </Box>
      </Popover>
    </>
  )
}
