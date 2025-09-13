import { render, screen } from '@testing-library/react'

import { ProductItem } from '@/app/components/product-search/product-grid/ProductItem'

describe('<ProductItem/> component:', () => {
  it('should render a product', () => {
    render(
      <ProductItem
        product={{ id: 'random-id', name: 'some product', imageUrl: '' }}
      />,
    )

    const component = screen.getByText('some product')
    expect(component).toBeInTheDocument()
  })
})
