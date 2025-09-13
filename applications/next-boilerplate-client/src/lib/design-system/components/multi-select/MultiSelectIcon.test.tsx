import { render, screen, fireEvent } from '@testing-library/react'

import { MultiSelectIcon } from '@/lib/design-system/components/multi-select/MultiSelectIcon'

describe('<MultiSelectIcon/> component:', () => {
  it('should render clear icon', () => {
    const onClearClick = jest.fn()
    render(
      <MultiSelectIcon
        label={'test'}
        isOpen={false}
        isClearable={true}
        onClearClick={onClearClick}
      />,
    )

    const clearButton = screen.getByLabelText('Clear search')
    expect(clearButton).toBeInTheDocument()
  })

  it('should not render clear icon', () => {
    render(
      <MultiSelectIcon
        label={'test'}
        isOpen={false}
        isClearable={false}
        onClearClick={() => {}}
      />,
    )
    const clearButton = screen.queryByLabelText('Clear search')
    expect(clearButton).not.toBeInTheDocument()
  })

  it('should trigger clear event', () => {
    const onClearClick = jest.fn()
    render(
      <MultiSelectIcon
        label={'test'}
        isOpen={false}
        isClearable={true}
        onClearClick={onClearClick}
      />,
    )
    const clearButton = screen.getByLabelText('Clear search')
    fireEvent.click(clearButton)
    expect(onClearClick).toHaveBeenCalled()
  })

  it('should render expand icon', () => {
    render(
      <MultiSelectIcon
        label={'test'}
        isOpen={false}
        isClearable={false}
        onClearClick={() => {}}
      />,
    )
    const expandButton = screen.getByLabelText('Expand test search dropdown')
    expect(expandButton).toBeInTheDocument()
  })

  it('should render collapse icon', () => {
    render(
      <MultiSelectIcon
        label={'test'}
        isOpen={true}
        isClearable={false}
        onClearClick={() => {}}
      />,
    )
    const expandButton = screen.getByLabelText('Expand test search dropdown')
    expect(expandButton).toBeInTheDocument()
  })
})
