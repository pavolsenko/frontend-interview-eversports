import { gql, useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/app/config/query'
import { Product } from '@/app/app.types'

interface UseProducts {
  data: Product[]
  isLoading: boolean
}

export function useProducts(): UseProducts {
  const PRODUCTS_QUERY = gql`
    query Products($first: Int) {
      products(first: $first) {
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

  const { data, loading } = useQuery(PRODUCTS_QUERY, {
    variables: { first: DEFAULT_PAGE_SIZE },
  })

  return {
    data: data?.products?.nodes || [],
    isLoading: loading,
  }
}
