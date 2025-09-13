import { fireEvent, render, screen } from '@testing-library/react'

import { MultiSelectActionButtons } from '@/lib/design-system/components/multi-select/MultiSelectActionButtons'

describe('<MultiSelectActionButtons /> component:', () => {
  it('should render correctly', () => {
    render(
      <MultiSelectActionButtons
        onApplyClick={() => {}}
        onCancelClick={() => {}}
      />,
    )
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('should trigger events correctly', () => {
    const onApplyClick = jest.fn()
    const onCancelClick = jest.fn()
    render(
      <MultiSelectActionButtons
        onApplyClick={onApplyClick}
        onCancelClick={onCancelClick}
      />,
    )

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[1])
    expect(onApplyClick).toHaveBeenCalled()
    expect(onCancelClick).toHaveBeenCalled()
  })
})
