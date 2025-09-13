import { render, screen, fireEvent } from '@testing-library/react'

import MultiSelect, {
  MultiSelectOption,
} from '@/lib/design-system/components/multi-select/MultiSelect'

describe('<MultiSelect/> component:', () => {
  const options: MultiSelectOption[] = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
  ]

  const defaultProps = {
    options,
    selectedOptions: [],
    onSelect: jest.fn(),
    onClear: jest.fn(),
    searchTerm: '',
    onSearch: jest.fn(),
    label: 'Test',
    selectedLabel: 'item',
    selectedLabelMulti: 'items',
  }

  it('should open the popover when the select box is clicked', () => {
    render(<MultiSelect {...defaultProps} />)
    const box = screen.getByText('Test').parentElement!
    fireEvent.click(box)
    expect(screen.getByText('Select All')).toBeInTheDocument()
  })

  it('should call onSelect with selected options when Apply is clicked', () => {
    render(<MultiSelect {...defaultProps} />)
    const box = screen.getByText('Test').parentElement!
    fireEvent.click(box)

    const option1 = screen.getByText('Option 1')
    fireEvent.click(option1)

    const applyButton = screen.getByText('Apply')
    fireEvent.click(applyButton)
    expect(defaultProps.onSelect).toHaveBeenCalledWith(['1'])
  })

  it('should update label correctly for single selection', () => {
    render(<MultiSelect {...defaultProps} selectedOptions={['1']} />)
    expect(screen.getByText('1 item selected')).toBeInTheDocument()
  })

  it('should update label correctly for multiple selections', () => {
    render(<MultiSelect {...defaultProps} selectedOptions={['1', '2']} />)
    expect(screen.getByText('2 items selected')).toBeInTheDocument()
  })
})
