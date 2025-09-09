'use client'

import { gql, useQuery } from '@apollo/client'
import { ThemeProvider } from '@mui/material'

import { theme } from '@/lib/design-system/theme/theme'
import ProductSearch from '@/app/components/ProductSearch'

const PRODUCTS_QUERY = gql`
  query Products($first: Int) {
    products(first: $first) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        name
      }
    }
  }
`

const USERS_QUERY = gql`
  query Users($first: Int) {
    users(first: $first) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`

export default function Home() {
  const { data: productsData } = useQuery(PRODUCTS_QUERY, {
    variables: { first: 10 },
  })

  const { data: usersData } = useQuery(USERS_QUERY, {
    variables: { first: 10 },
  })

  if (!usersData || !productsData) {
    return 'No data'
  }

  return (
    <ThemeProvider theme={theme}>
      <ProductSearch
        products={productsData?.products.nodes}
        users={usersData?.users.nodes}
      />
    </ThemeProvider>
  )
}
