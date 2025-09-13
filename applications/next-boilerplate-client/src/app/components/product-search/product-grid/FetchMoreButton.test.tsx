import { fireEvent, render, screen } from '@testing-library/react'

import { FetchMoreButton } from '@/app/components/product-search/product-grid/FetchMoreButton'

describe('<FetchMoreButton /> component:', () => {
  it('should render fetch more button', () => {
    render(<FetchMoreButton hasMore={true} onMoreClick={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render no button when no more results', () => {
    render(<FetchMoreButton hasMore={false} onMoreClick={() => {}} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render a loading indicator', () => {
    render(
      <FetchMoreButton
        hasMore={true}
        isLoading={true}
        onMoreClick={() => {}}
      />,
    )
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should trigger a click event', () => {
    const onClick = jest.fn()
    render(<FetchMoreButton hasMore={true} onMoreClick={onClick} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })
})
