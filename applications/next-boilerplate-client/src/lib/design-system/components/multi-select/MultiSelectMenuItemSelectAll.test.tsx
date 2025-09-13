import { render, screen, fireEvent } from '@testing-library/react'

import { MultiSelectMenuItemSelectAll } from '@/lib/design-system/components/multi-select/MultiSelectMenuItemSelectAll'

describe('<MultiSelectMenuItemSelectAll/> component:', () => {
  it('should render the select all checkbox', () => {
    render(
      <MultiSelectMenuItemSelectAll onClick={() => {}} isChecked={false} />,
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('should call onClick when the menu item is clicked', () => {
    const onClick = jest.fn()
    render(<MultiSelectMenuItemSelectAll onClick={onClick} isChecked={false} />)
    const menuItem = screen.getByRole('menuitem')
    fireEvent.click(menuItem)
    expect(onClick).toHaveBeenCalled()
  })
})
