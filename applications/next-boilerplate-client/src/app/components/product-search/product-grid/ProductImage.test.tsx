import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ProductImage } from '@/app/components/product-search/product-grid/ProductImage'

describe('<ProductImage /> component:', () => {
  it('should render correctly', () => {
    render(
      <ProductImage
        imageUrl={'https://picsum.photos/200'}
        alt={'test image'}
      />,
    )
    expect(screen.getByAltText('test image')).toBeInTheDocument()
  })

  it('should render no image', async () => {
    render(<ProductImage imageUrl={''} alt={'test image'} />)
    expect(screen.getByTestId('broken-image-icon')).toBeInTheDocument()
  })

  it('should render no image on error', async () => {
    render(
      <ProductImage
        imageUrl={'https://picsum.photos/200'}
        alt={'test image'}
      />,
    )
    const image = screen.getByAltText('test image')
    fireEvent.error(image)
    expect(screen.getByTestId('broken-image-icon')).toBeInTheDocument()
  })
})
