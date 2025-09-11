import { gql, useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/app/config/query'
import { User } from '@/app/app.types'

interface UseUsers {
  data: User[]
  isLoading: boolean
}

export function useUsers(): UseUsers {
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

  const { data, loading } = useQuery(USERS_QUERY, {
    variables: { first: DEFAULT_PAGE_SIZE },
  })

  return {
    data: data?.users?.nodes || [],
    isLoading: loading,
  }
}
