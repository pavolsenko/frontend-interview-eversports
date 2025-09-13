import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

import { Purchase } from '@/app/app.types'
import { DEFAULT_PAGE_SIZE } from '@/app/config/query'

interface UsePurchases {
  data: Purchase[]
  isLoading: boolean
  hasMore: boolean
  fetchMore: () => Promise<void>
  isFetchingMore: boolean
}

export function usePurchases(
  userIds: string[],
  productIds: string[],
): UsePurchases {
  const [isFetching, setIsFetching] = useState(false)

  const PURCHASES_QUERY = gql`
    query Purchases(
      $first: Int
      $after: String
      $productIds: [ID!]
      $userIds: [ID!]
    ) {
      purchases(
        first: $first
        after: $after
        productIds: $productIds
        userIds: $userIds
      ) {
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

  const { data, loading, fetchMore } = useQuery(PURCHASES_QUERY, {
    variables: { first: DEFAULT_PAGE_SIZE, userIds, productIds },
    fetchPolicy: 'cache-and-network',
  })

  async function fetchNext() {
    if (!data?.purchases.pageInfo?.hasNextPage) {
      return
    }

    setIsFetching(true)
    await fetchMore({
      variables: {
        first: DEFAULT_PAGE_SIZE,
        after: data.purchases.pageInfo.endCursor,
        userIds,
        productIds,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }

        return {
          purchases: {
            __typename: 'PurchaseConnection',
            nodes: [
              ...previousResult.purchases.nodes,
              ...fetchMoreResult.purchases.nodes,
            ],
            pageInfo: fetchMoreResult.purchases.pageInfo,
          },
        }
      },
    })
    setIsFetching(false)
  }

  return {
    data: data?.purchases.nodes || [],
    isLoading: loading,
    isFetchingMore: isFetching,
    hasMore: data?.purchases.pageInfo?.hasNextPage || false,
    fetchMore: fetchNext,
  }
}
