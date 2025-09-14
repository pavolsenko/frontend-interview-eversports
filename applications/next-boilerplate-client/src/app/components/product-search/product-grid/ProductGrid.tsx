import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'

import { Product } from '@/app/app.types'
import { FetchMoreButton } from '@/app/components/product-search/product-grid/FetchMoreButton'
import { ProductItem } from '@/app/components/product-search/product-grid/ProductItem'

import {
  productGridLoadingStyles,
  productGridNoResultsStyles,
  productGridStyles,
} from '@/app/components/product-search/product-grid/productGridStyles'
import { BackToTopButton } from '@/app/components/product-search/product-grid/BackToTopButton'

interface ProductGridProps {
  products: Product[]
  hasMore: boolean
  onMoreClick: () => void
  isLoading?: boolean
  isFetchingMore?: boolean
}

export function ProductGrid(props: Readonly<ProductGridProps>) {
  const theme = useTheme()

  if (props.isLoading) {
    return (
      <Box sx={productGridLoadingStyles}>
        <CircularProgress />
      </Box>
    )
  }

  if (props.products.length === 0) {
    return (
      <Box sx={productGridNoResultsStyles}>
        <Typography variant={'h4'}>No results</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={productGridStyles(theme)}
      aria-busy={props.isFetchingMore ? 'true' : 'false'}
    >
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

      <BackToTopButton />
    </Box>
  )
}
