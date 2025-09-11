import { DEFAULT_PAGE_SIZE } from '@/app/config/query'
import { ChangeEvent } from 'react'
import { Box, Grid, Pagination } from '@mui/material'

import { Product } from '@/app/app.types'
import { ProductItem } from '@/app/components/product-search/product-grid/ProductItem'

interface ProductGridProps {
  products: Product[] | undefined
  page: number
  onPageChange: (event: ChangeEvent<unknown>, page: number) => void
  totalCount?: number
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
      <Pagination
        page={props.page}
        count={
          props.totalCount ? Math.ceil(props.totalCount / DEFAULT_PAGE_SIZE) : 1
        }
        variant={'outlined'}
        onChange={props.onPageChange}
      />
    </Box>
  )
}
