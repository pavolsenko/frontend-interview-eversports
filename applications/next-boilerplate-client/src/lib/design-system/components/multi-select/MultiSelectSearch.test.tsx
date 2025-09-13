import { render, screen, fireEvent, act } from '@testing-library/react'

import { MultiSelectSearch } from '@/lib/design-system/components/multi-select/MultiSelectSearch'

jest.useFakeTimers()

describe('<MultiSelectSearch /> component:', () => {
  const setSearchTermMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the search input with initial value', () => {
    render(
      <MultiSelectSearch
        searchTerm={'initial'}
        setSearchTerm={setSearchTermMock}
      />,
    )
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('initial')
  })

  it('should update input value when typing', () => {
    render(
      <MultiSelectSearch searchTerm={''} setSearchTerm={setSearchTermMock} />,
    )
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'apple' } })
    expect(input.value).toBe('apple')
  })

  it('should call setSearchTerm after debounce', () => {
    render(
      <MultiSelectSearch searchTerm={''} setSearchTerm={setSearchTermMock} />,
    )
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'banana' } })

    expect(setSearchTermMock).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(setSearchTermMock).toHaveBeenCalledWith('banana')
  })

  it('should update parent searchTerm correctly after multiple changes', () => {
    render(
      <MultiSelectSearch searchTerm="" setSearchTerm={setSearchTermMock} />,
    )
    const input = screen.getByPlaceholderText('Search')

    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.change(input, { target: { value: 'ap' } })
    fireEvent.change(input, { target: { value: 'app' } })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(setSearchTermMock).toHaveBeenCalledTimes(1)
    expect(setSearchTermMock).toHaveBeenCalledWith('app')
  })
})
