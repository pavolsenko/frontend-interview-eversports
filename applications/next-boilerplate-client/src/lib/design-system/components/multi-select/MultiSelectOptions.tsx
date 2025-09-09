import React from 'react'
import { Box } from '@mui/material'

import { MultiSelectOption } from '@/lib/design-system/components/multi-select/MultiSelect'
import { MultiSelectMenuItemSelectAll } from '@/lib/design-system/components/multi-select/MultiSelectMenuItemSelectAll'

import { MultiSelectMenuItem } from '@/lib/design-system/components/multi-select/MultiSelectMenuItem'

import {
  multiSelectNoOptionsStyles,
  multiSelectOptionsWrapperStyles,
} from '@/lib/design-system/components/multi-select/multiSelectStyles'

interface MultiSelectOptionsProps {
  options: MultiSelectOption[]
  selectedOptions: string[]
  onItemClick: (id: string) => void
  onSelectMultiple: (ids: string[]) => void
}

export function MultiSelectOptions(props: Readonly<MultiSelectOptionsProps>) {
  if (!props.options.length) {
    return <Box sx={multiSelectNoOptionsStyles}>No options</Box>
  }

  function onSelectAllClick() {
    if (props.selectedOptions.length === props.options.length) {
      props.onSelectMultiple([])
    }

    props.onSelectMultiple(
      props.options.map((option: MultiSelectOption): string => option.id),
    )
  }

  return (
    <Box sx={multiSelectOptionsWrapperStyles}>
      <MultiSelectMenuItemSelectAll
        onClick={onSelectAllClick}
        isChecked={props.selectedOptions.length === props.options.length}
        isIndeterminate={
          props.selectedOptions.length > 0 &&
          props.selectedOptions.length < props.options.length
        }
      />

      {props.options.map((option: MultiSelectOption) => (
        <MultiSelectMenuItem
          key={option.id}
          option={option}
          isChecked={props.selectedOptions.includes(option.id)}
          onItemClick={props.onItemClick}
        />
      ))}
    </Box>
  )
}
