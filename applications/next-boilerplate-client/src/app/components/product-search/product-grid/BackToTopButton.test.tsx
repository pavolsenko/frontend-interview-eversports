import { render, screen, fireEvent, act } from '@testing-library/react'

import { BackToTopButton } from '@/app/components/product-search/product-grid/BackToTopButton'

describe('<BackToTopButton/> component:', () => {
  const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value,
    })
    window.dispatchEvent(new Event('scroll'))
  }

  beforeEach(() => {
    setScrollY(0)
  })

  it('should not render the button when scrollY <= 200', () => {
    render(<BackToTopButton />)
    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })

  it('should render the button when scrollY > 200', () => {
    render(<BackToTopButton />)
    act(() => {
      setScrollY(300)
    })
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should call window.scrollTo with smooth behavior when clicked', () => {
    window.scrollTo = jest.fn()
    render(<BackToTopButton />)
    act(() => {
      setScrollY(300)
    })
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
