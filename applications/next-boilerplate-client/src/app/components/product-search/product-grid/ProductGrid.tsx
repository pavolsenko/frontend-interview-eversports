import { Box, CircularProgress, Grid } from '@mui/material'

import { Product } from '@/app/app.types'
import { FetchMoreButton } from '@/app/components/product-search/product-grid/FetchMoreButton'
import { ProductItem } from '@/app/components/product-search/product-grid/ProductItem'

interface ProductGridProps {
  products: Product[] | undefined
  hasMore: boolean
  onMoreClick: () => void
  isLoading?: boolean
  isFetchingMore?: boolean
}

export function ProductGrid(props: Readonly<ProductGridProps>) {
  if (props.isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  if (!props.products) {
    return <Box>No results</Box>
  }

  return (
    <>
      <Grid container columnSpacing={2} rowSpacing={2}>
        {props.products.map((product: Product) => (
          <Grid
            key={product.id}
            size={{
              xs: 12,
              md: 6,
              lg: 3,
              xl: 2,
            }}
          >
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
      <FetchMoreButton
        hasMore={props.hasMore}
        isLoading={props.isFetchingMore}
        onMoreClick={props.onMoreClick}
      />
    </>
  )
}
