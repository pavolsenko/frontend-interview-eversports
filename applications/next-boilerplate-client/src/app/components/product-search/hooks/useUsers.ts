import { gql, useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/app/config/query'
import { User } from '@/app/app.types'

interface UseUsers {
  data: User[]
  isLoading: boolean
  isError: boolean
}

export function useUsers(searchTerm: string): UseUsers {
  const USERS_QUERY = gql`
    query Users($first: Int, $searchTerm: String) {
      users(first: $first, searchTerm: $searchTerm) {
        nodes {
          id
          firstName
          lastName
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

  const { data, loading, error } = useQuery(USERS_QUERY, {
    variables: { first: DEFAULT_PAGE_SIZE, searchTerm },
  })

  return {
    data: data?.users?.nodes || [],
    isLoading: loading,
    isError: Boolean(error),
  }
}
