import { Product } from '@/app/app.types'
import { ProductImage } from '@/app/components/product-search/product-grid/ProductImage'
import { Box } from '@mui/material'

interface ProductItemProps {
  product: Product
}

export function ProductItem(props: Readonly<ProductItemProps>) {
  return (
    <Box key={props.product.id}>
      <ProductImage
        imageUrl={props.product.imageUrl}
        alt={props.product.name}
      />
      {props.product.name}
    </Box>
  )
}
