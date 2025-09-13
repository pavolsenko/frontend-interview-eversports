import React from 'react'
import { Box, CircularProgress } from '@mui/material'

import { MultiSelectOption } from '@/lib/design-system/components/multi-select/MultiSelect'
import { MultiSelectMenuItemSelectAll } from '@/lib/design-system/components/multi-select/MultiSelectMenuItemSelectAll'

import { MultiSelectMenuItem } from '@/lib/design-system/components/multi-select/MultiSelectMenuItem'

import {
  multiSelectNoOptionsStyles,
  multiSelectOptionsWrapperStyles,
} from '@/lib/design-system/components/multi-select/multiSelectStyles'

interface MultiSelectOptionsProps {
  options?: MultiSelectOption[]
  selectedOptions?: string[]
  onItemClick: (id: string) => void
  onSelectAllClick: () => void
  isLoading?: boolean
}

export function MultiSelectOptions(props: Readonly<MultiSelectOptionsProps>) {
  function isChecked(): boolean {
    if (!props.options || !props.selectedOptions) {
      return false
    }

    return props.selectedOptions?.length === props.options.length
  }

  function isIndeterminate(): boolean {
    if (!props.options || !props.selectedOptions) {
      return false
    }

    return (
      props.selectedOptions.length > 0 &&
      props.selectedOptions.length < props.options.length
    )
  }

  if (props.isLoading) {
    return (
      <Box sx={multiSelectNoOptionsStyles}>
        <CircularProgress color={'inherit'} size={24} />
      </Box>
    )
  }

  if (!props.options?.length) {
    return <Box sx={multiSelectNoOptionsStyles}>No options</Box>
  }

  return (
    <Box sx={multiSelectOptionsWrapperStyles}>
      <MultiSelectMenuItemSelectAll
        onClick={props.onSelectAllClick}
        isChecked={isChecked()}
        isIndeterminate={isIndeterminate()}
      />

      {props.options.map((option: MultiSelectOption) => (
        <MultiSelectMenuItem
          key={option.id}
          option={option}
          isChecked={props.selectedOptions?.includes(option.id)}
          onItemClick={() => props.onItemClick(option.id)}
        />
      ))}
    </Box>
  )
}
