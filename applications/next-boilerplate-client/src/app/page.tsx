'use client'

import { theme } from '@/lib/design-system/theme/theme'
import { gql, useQuery } from '@apollo/client'
import { ThemeProvider } from '@mui/material'
import ExampleProductList from './components/ExampleProductList'

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

export default function Home() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
    variables: { first: 10 },
  })

  if (error) return <p>Error: {error.message}</p>

  return (
    <ThemeProvider theme={theme}>
      <h1 className="text-2xl font-bold">Example Product List</h1>
      {!data || loading ? (
        <p>Loading products...</p>
      ) : (
        <ExampleProductList products={data.products.nodes} />
      )}
    </ThemeProvider>
  )
}
