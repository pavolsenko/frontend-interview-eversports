'use client'

import { ThemeProvider } from '@mui/material'

import { theme } from '@/lib/design-system/theme/theme'

import { ProductSearch } from '@/app/components/product-search/ProductSearch'

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <ProductSearch />
    </ThemeProvider>
  )
}
