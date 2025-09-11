import { Box, Grid, Pagination } from '@mui/material'

import { Product } from '@/app/app.types'
import { ProductItem } from '@/app/components/product-search/product-grid/ProductItem'

interface ProductGridProps {
  products: Product[] | undefined
  page: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function ProductGrid(props: Readonly<ProductGridProps>) {
  if (!props.products) {
    return null
  }

  return (
    <Box>
      <Grid container>
        {props.products.map((product: Product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </Grid>
      <Pagination page={props.page} variant={'outlined'} />
    </Box>
  )
}
