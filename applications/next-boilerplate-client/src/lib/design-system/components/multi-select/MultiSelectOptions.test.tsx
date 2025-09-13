import { render, screen, fireEvent } from '@testing-library/react'

import { MultiSelectOptions } from '@/lib/design-system/components/multi-select/MultiSelectOptions'

describe('MultiSelectOptions', () => {
  const options = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
  ]

  it('should render loading state', () => {
    render(
      <MultiSelectOptions
        isLoading={true}
        onItemClick={() => {}}
        onSelectAllClick={() => {}}
      />,
    )
    const spinner = screen.getByRole('progressbar')
    expect(spinner).toBeInTheDocument()
  })

  it('should render no options message when options are empty', () => {
    render(
      <MultiSelectOptions
        options={[]}
        onItemClick={() => {}}
        onSelectAllClick={() => {}}
      />,
    )
    expect(screen.getByText('No options')).toBeInTheDocument()
  })

  it('should render all options', () => {
    render(
      <MultiSelectOptions
        options={options}
        selectedOptions={[]}
        onItemClick={() => {}}
        onSelectAllClick={() => {}}
      />,
    )

    options.forEach((option) => {
      const el = screen.getByTestId(`option-${option.id}`)
      expect(el).toBeInTheDocument()
      expect(el).toHaveTextContent(option.name)
    })
  })

  it('should call onSelectAllClick when select all clicked', () => {
    const onSelectAllClick = jest.fn()
    render(
      <MultiSelectOptions
        options={options}
        selectedOptions={[]}
        onItemClick={() => {}}
        onSelectAllClick={onSelectAllClick}
      />,
    )

    fireEvent.click(screen.getByTestId('select-all-checkbox'))
    expect(onSelectAllClick).toHaveBeenCalled()
  })

  it('should call onItemClick when an option is clicked', () => {
    const onItemClick = jest.fn()
    render(
      <MultiSelectOptions
        options={options}
        selectedOptions={[]}
        onItemClick={onItemClick}
        onSelectAllClick={() => {}}
      />,
    )

    fireEvent.click(screen.getByTestId('option-1'))
    expect(onItemClick).toHaveBeenCalled()
  })
})
