import { gql, useQuery } from '@apollo/client'

import { Purchase } from '@/app/app.types'
import { DEFAULT_PAGE_SIZE } from '@/app/config/query'

interface UsePurchases {
  data: Purchase[] | undefined
  isLoading: boolean
}

export function usePurchases(
  userIds: string[],
  productIds: string[],
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
      }
    }
  `

  const { data, loading } = useQuery(PURCHASES_QUERY, {
    variables: { first: DEFAULT_PAGE_SIZE, userIds, productIds },
  })

  return {
    data: data?.purchases?.nodes || [],
    isLoading: loading,
  }
}
