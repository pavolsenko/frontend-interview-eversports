import { useState, MouseEvent } from 'react'
import { Box, Popover, Typography, useTheme } from '@mui/material'

import { MultiSelectIcon } from '@/lib/design-system/components/multi-select/MultiSelectIcon'
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
  selectedOptions: string[]
  onSelect: (selectedValues: string[]) => void
  onClear: () => void
  searchTerm: string
  onSearch: (searchTerm: string) => void
  label: string
  selectedLabel: string
  selectedLabelMulti: string
  isLoading?: boolean
}

export default function MultiSelect(props: Readonly<MultiSelectProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [popoverWidth, setPopoverWidth] = useState<number>(0)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    props.selectedOptions,
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const theme = useTheme()

  function openPopover(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
    setPopoverWidth(
      Math.round(event.currentTarget.getBoundingClientRect().width),
    )
  }

  function closePopover() {
    setAnchorEl(null)
    setIsOpen(false)
  }

  function onItemClick(id: string) {
    setSelectedOptions((previousOptions: string[]): string[] =>
      previousOptions.includes(id)
        ? previousOptions.filter((option: string): boolean => option !== id)
        : [...previousOptions, id],
    )
  }

  function onSelectAllClick() {
    if (!props.options) {
      return
    }

    if (props.options.length === selectedOptions.length) {
      setSelectedOptions([])
      return
    }

    setSelectedOptions(
      props.options.map((option: MultiSelectOption): string => option.id),
    )
  }

  function onApplyClick() {
    props.onSelect(selectedOptions)
    closePopover()
  }

  function onCancelClick() {
    setSelectedOptions(props.selectedOptions)
    closePopover()
  }

  function getLabel() {
    if (!props.selectedOptions.length) {
      return props.label
    }

    return `${props.selectedOptions.length} ${
      props.selectedOptions.length === 1
        ? props.selectedLabel
        : props.selectedLabelMulti
    } selected`
  }

  function onClearClick(event: MouseEvent<HTMLElement>) {
    event.preventDefault()
    event.stopPropagation()
    setSelectedOptions([])
    props.onClear()
  }

  return (
    <>
      <Box>
        {props.selectedLabelMulti[0].toUpperCase() +
          props.selectedLabelMulti.slice(1)}
      </Box>

      <Box
        onClick={openPopover}
        sx={multiSelectStyles(theme, isOpen)}
        aria-haspopup={'listbox'}
        aria-expanded={isOpen}
      >
        <Typography variant={'body2'}>{getLabel()}</Typography>
        <MultiSelectIcon
          label={props.label}
          isOpen={Boolean(anchorEl)}
          isClearable={props.selectedOptions.length > 0}
          onClearClick={onClearClick}
        />
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onCancelClick}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: { sx: multiSelectPopoverStyles(theme, popoverWidth) },
        }}
      >
        <MultiSelectSearch
          searchTerm={props.searchTerm}
          setSearchTerm={props.onSearch}
        />

        <MultiSelectOptions
          options={props.options}
          selectedOptions={selectedOptions}
          onItemClick={onItemClick}
          onSelectAllClick={onSelectAllClick}
          isLoading={props.isLoading}
        />

        <MultiSelectActionButtons
          onApplyClick={onApplyClick}
          onCancelClick={onCancelClick}
        />
      </Popover>
    </>
  )
}
