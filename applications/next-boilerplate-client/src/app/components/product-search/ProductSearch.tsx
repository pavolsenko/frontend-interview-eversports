import { Box, Divider, Grid, useTheme } from '@mui/material'
import { useState } from 'react'

import { Product, Purchase, User } from '@/app/app.types'
import { useProducts } from '@/app/components/product-search/hooks/useProducts'
import { usePurchases } from '@/app/components/product-search/hooks/usePurchases'
import { useUsers } from '@/app/components/product-search/hooks/useUsers'
import { ProductGrid } from '@/app/components/product-search/product-grid/ProductGrid'
import MultiSelect, {
  MultiSelectOption,
} from '@/lib/design-system/components/multi-select/MultiSelect'

import { purchasesSearchWrapperStyles } from '@/app/components/product-search/purchasesSearchStyles'

export function ProductSearch() {
  const theme = useTheme()
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])

  const { data: usersData, isLoading: isLoadingUsers } = useUsers()
  const { data: productsData, isLoading: isLoadingProducts } = useProducts()
  const {
    data,
    hasMore,
    fetchMore,
    isLoading: isLoadingPurchases,
    isFetchingMore,
  } = usePurchases(selectedUserIds, selectedProductIds)

  function onSelectUsers(value: string[]) {
    setSelectedUserIds(value)
  }

  function onSelectProducts(value: string[]) {
    setSelectedProductIds(value)
  }

  return (
    <Box sx={purchasesSearchWrapperStyles(theme)}>
      <Grid container columnSpacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MultiSelect
            label={'Select Product'}
            onSelect={onSelectProducts}
            selectedOptions={selectedProductIds}
            selectedLabel={'product'}
            selectedLabelMulti={'products'}
            isLoading={isLoadingProducts}
            options={productsData?.map(
              (product: Product): MultiSelectOption => ({
                id: product.id,
                name: product.name,
              }),
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MultiSelect
            label={'Select User'}
            onSelect={onSelectUsers}
            selectedOptions={selectedUserIds}
            selectedLabel={'user'}
            selectedLabelMulti={'users'}
            isLoading={isLoadingUsers}
            options={usersData?.map(
              (user: User): MultiSelectOption => ({
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
              }),
            )}
          />
        </Grid>
      </Grid>
      <Divider />

      <ProductGrid
        products={data?.map((purchase: Purchase): Product => purchase.product)}
        hasMore={hasMore}
        isLoading={isLoadingPurchases}
        isFetchingMore={isFetchingMore}
        onMoreClick={fetchMore}
      />
    </Box>
  )
}
