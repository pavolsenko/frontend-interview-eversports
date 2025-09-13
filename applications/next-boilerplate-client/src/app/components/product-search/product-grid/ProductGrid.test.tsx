import { render, screen, fireEvent } from '@testing-library/react'

import { Product } from '@/app/app.types'
import { ProductGrid } from '@/app/components/product-search/product-grid/ProductGrid'

describe('<ProductGrid/> component:', () => {
  const mockProducts: Product[] = [
    { id: '1', name: 'Product 1', imageUrl: 'https://picsum.photos/200' },
    { id: '2', name: 'Product 2', imageUrl: 'https://picsum.photos/200' },
  ]

  it('should render a list of products', () => {
    render(
      <ProductGrid
        products={mockProducts}
        hasMore={false}
        onMoreClick={() => {}}
      />,
    )

    mockProducts.forEach((product) => {
      const item = screen.getByTestId(`product-item-${product.id}`)
      expect(item).toBeInTheDocument()
      expect(item).toHaveTextContent(product.name)
    })
  })

  it('should render loading state', () => {
    render(
      <ProductGrid
        products={[]}
        hasMore={false}
        onMoreClick={() => {}}
        isLoading
      />,
    )
    const spinner = screen.getByRole('progressbar')
    expect(spinner).toBeInTheDocument()
  })

  it('should render no results message when no products', () => {
    render(<ProductGrid products={[]} hasMore={false} onMoreClick={() => {}} />)
    const noResults = screen.getByText('No results')
    expect(noResults).toBeInTheDocument()
  })

  it('should render fetch more button and trigger a click', () => {
    const onMoreClick = jest.fn()
    render(
      <ProductGrid
        products={mockProducts}
        hasMore={true}
        onMoreClick={onMoreClick}
      />,
    )

    const button = screen.getByTestId('fetch-more-button')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(onMoreClick).toHaveBeenCalled()
  })

  it('should render fetch more button in loading state', () => {
    render(
      <ProductGrid
        products={mockProducts}
        hasMore={true}
        onMoreClick={() => {}}
        isFetchingMore
      />,
    )
    const button = screen.getByTestId('fetch-more-button')
    expect(button).toBeInTheDocument()
  })
})
