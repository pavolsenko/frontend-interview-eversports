'use client'

import { ThemeProvider } from '@mui/material'

import { theme } from '@/lib/design-system/theme/theme'

import { PurchasesSearch } from '@/app/components/product-search/PurchasesSearch'

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <PurchasesSearch />
    </ThemeProvider>
  )
}
