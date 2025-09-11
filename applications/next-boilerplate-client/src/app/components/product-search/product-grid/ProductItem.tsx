import { Product } from '@/app/app.types'
import { ProductImage } from '@/app/components/product-search/product-grid/ProductImage'
import { Box, Typography } from '@mui/material'

interface ProductItemProps {
  product: Product
}

export function ProductItem(props: Readonly<ProductItemProps>) {
  return (
    <Box
      key={props.product.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
      }}
    >
      <ProductImage
        imageUrl={props.product.imageUrl}
        alt={props.product.name}
      />
      <Typography variant="body1">{props.product.name}</Typography>
    </Box>
  )
}
