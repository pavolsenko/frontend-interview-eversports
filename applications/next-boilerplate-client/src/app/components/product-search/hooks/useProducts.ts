import { gql, useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/app/config/query'
import { Product } from '@/app/app.types'

interface UseProducts {
  data: Product[]
  isLoading: boolean
  isError: boolean
}

export function useProducts(searchTerm: string): UseProducts {
  const PRODUCTS_QUERY = gql`
    query Products($first: Int, $searchTerm: String) {
      products(first: $first, searchTerm: $searchTerm) {
        nodes {
          id
          name
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `

  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: { first: DEFAULT_PAGE_SIZE, searchTerm },
  })

  return {
    data: data?.products?.nodes || [],
    isLoading: loading,
    isError: Boolean(error),
  }
}
