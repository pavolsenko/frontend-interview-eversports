import { MultiSelectMenuItemSelectAll } from '@/lib/design-system/components/multi-select/MultiSelectMenuItemSelectAll'
import React, { useState, useRef, MouseEvent } from 'react'
import { Box, Popover, IconButton, Typography, useTheme } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

import { MultiSelectActionButtons } from '@/lib/design-system/components/multi-select/MultiSelectActionButtons'
import { MultiSelectMenuItem } from '@/lib/design-system/components/multi-select/MultiSelectMenuItem'
import { MultiSelectSearch } from '@/lib/design-system/components/multi-select/MultiSelectSearch'

import {
  multiSelectOptionsWrapperStyles,
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
  label: string
  selectedLabel: string
  selectedLabelMulti: string
}

export default function MultiSelect(props: Readonly<MultiSelectProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
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

  function onSelectAllClick() {
    popoverRef.current =
      popoverRef.current.length === props.options.length
        ? []
        : props.options.map((option: MultiSelectOption): string => option.id)
    setSelectedOptions([...popoverRef.current])
  }

  function onApplyClick() {
    props.onSelect(popoverRef.current)
    closePopover()
  }

  function onCancelClick() {
    setSelectedOptions(popoverRef.current)
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

          <Box sx={multiSelectOptionsWrapperStyles}>
            <MultiSelectMenuItemSelectAll
              onClick={onSelectAllClick}
              isChecked={selectedOptions.length === props.options.length}
              isIndeterminate={
                selectedOptions.length > 0 &&
                selectedOptions.length < props.options.length
              }
            />

            {filteredOptions().map((option: MultiSelectOption) => (
              <MultiSelectMenuItem
                key={option.id}
                option={option}
                isChecked={selectedOptions.includes(option.id)}
                onItemClick={onItemClick}
              />
            ))}
          </Box>

          <MultiSelectActionButtons
            onApplyClick={onApplyClick}
            onCancelClick={onCancelClick}
          />
        </Box>
      </Popover>
    </>
  )
}
