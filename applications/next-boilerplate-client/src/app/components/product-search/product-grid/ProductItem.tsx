import { Box, Typography } from '@mui/material'

import { Product } from '@/app/app.types'
import { ProductImage } from '@/app/components/product-search/product-grid/ProductImage'

import {
  productItemStyles,
  productItemTextStyles,
} from '@/app/components/product-search/product-grid/productGridStyles'

interface ProductItemProps {
  product: Product
}

export function ProductItem(props: Readonly<ProductItemProps>) {
  return (
    <Box key={props.product.id} sx={productItemStyles}>
      <ProductImage
        imageUrl={props.product.imageUrl}
        alt={props.product.name}
      />
      <Typography variant="body1" sx={productItemTextStyles}>
        {props.product.name}
      </Typography>
    </Box>
  )
}
