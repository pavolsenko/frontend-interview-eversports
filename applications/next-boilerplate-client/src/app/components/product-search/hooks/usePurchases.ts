import { gql, useQuery } from '@apollo/client'

import { Purchase } from '@/app/app.types'
import { DEFAULT_PAGE_SIZE } from '@/app/config/query'

interface UsePurchases {
  data: Purchase[]
  isLoading: boolean
  totalCount: number
}

export function usePurchases(
  userIds: string[],
  productIds: string[],
  page: number,
): UsePurchases {
  const PURCHASES_QUERY = gql`
    query Purchases($first: Int, $productIds: [ID!], $userIds: [ID!]) {
      purchases(first: $first, productIds: $productIds, userIds: $userIds) {
        nodes {
          id
          date
          user {
            id
            firstName
            lastName
          }
          product {
            id
            name
            imageUrl
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
    }
  `

  const { data, loading } = useQuery(PURCHASES_QUERY, {
    variables: {
      first: DEFAULT_PAGE_SIZE,
      after: page * DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: 'cache-and-network',
  })

  return {
    data: data?.purchases?.nodes || [],
    isLoading: loading,
    totalCount: data?.totalCount,
  }
}
