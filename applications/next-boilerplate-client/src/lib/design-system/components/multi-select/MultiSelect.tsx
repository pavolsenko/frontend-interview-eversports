import React, { useState, useRef, MouseEvent } from 'react'
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
  options: MultiSelectOption[] | undefined
  onSelect: (selectedValues: string[]) => void
  onSearch: (searchTerm: string) => void
  selectedOptions?: string[]
  label: string
  selectedLabel: string
  selectedLabelMulti: string
  isLoading?: boolean
}

export default function MultiSelect(props: Readonly<MultiSelectProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [popoverWidth, setPopoverWidth] = useState<number>(0)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    props.selectedOptions || [],
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const popoverRef = useRef<string[]>([])
  const theme = useTheme()

  function openPopover(event: MouseEvent<HTMLElement>) {
    if (props.isLoading) {
      return
    }

    popoverRef.current = selectedOptions
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
    popoverRef.current = popoverRef.current.includes(id)
      ? popoverRef.current.filter((item: string): boolean => item !== id)
      : [...popoverRef.current, id]
    setSelectedOptions([...popoverRef.current])
  }

  function onSelectMultiple(ids: string[]) {
    setSelectedOptions([...popoverRef.current, ...ids])
  }

  function onApplyClick() {
    props.onSelect(popoverRef.current)
    closePopover()
  }

  function onCancelClick() {
    setSelectedOptions(props.selectedOptions || [])
    closePopover()
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
      <Box>
        {props.selectedLabelMulti[0].toUpperCase() +
          props.selectedLabelMulti.slice(1)}
      </Box>
      <Box onClick={openPopover} sx={multiSelectStyles(theme, isOpen)}>
        <Typography variant="body2">{getLabel()}</Typography>
        <MultiSelectIcon isOpen={Boolean(anchorEl)} />
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onCancelClick}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: multiSelectPopoverStyles(theme, popoverWidth),
          },
        }}
      >
        <MultiSelectSearch setSearchTerm={props.onSearch} />

        <MultiSelectOptions
          options={props.options || []}
          selectedOptions={selectedOptions}
          onItemClick={onItemClick}
          onSelectMultiple={onSelectMultiple}
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
