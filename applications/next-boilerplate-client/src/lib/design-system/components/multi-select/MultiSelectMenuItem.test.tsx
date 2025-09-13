import { render, screen, fireEvent } from '@testing-library/react'

import { MultiSelectMenuItem } from '@/lib/design-system/components/multi-select/MultiSelectMenuItem'

describe('<MultiSelectMenuItem/> component:', () => {
  const option = { id: '1', name: 'Option 1' }

  it('should render the option name', () => {
    render(<MultiSelectMenuItem option={option} onItemClick={() => {}} />)
    const item = screen.getByTestId(`option-${option.id}`)
    expect(item).toBeInTheDocument()
    expect(item).toHaveTextContent(option.name)
  })

  it('should render checkbox as unchecked by default', () => {
    render(<MultiSelectMenuItem option={option} onItemClick={() => {}} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should render checkbox as checked when isChecked is true', () => {
    render(
      <MultiSelectMenuItem option={option} isChecked onItemClick={() => {}} />,
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should call onItemClick when menu item is clicked', () => {
    const onItemClick = jest.fn()
    render(<MultiSelectMenuItem option={option} onItemClick={onItemClick} />)
    const item = screen.getByTestId(`option-${option.id}`)
    fireEvent.click(item)
    expect(onItemClick).toHaveBeenCalled()
    expect(onItemClick).toHaveBeenCalledWith(option.id)
  })
})
