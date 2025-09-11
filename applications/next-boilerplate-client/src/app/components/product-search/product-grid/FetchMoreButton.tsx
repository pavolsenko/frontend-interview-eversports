import { Box, Button, CircularProgress } from '@mui/material'

interface FetchMoreButtonProps {
  hasMore: boolean
  isLoading?: boolean
  onMoreClick: () => void
}

export function FetchMoreButton(props: FetchMoreButtonProps) {
  if (!props.hasMore) {
    return null
  }

  return (
    <Box>
      <Button
        variant={'contained'}
        size={'large'}
        onClick={props.onMoreClick}
        disabled={props.isLoading}
      >
        {props.isLoading ? (
          <CircularProgress color={'inherit'} size={24} />
        ) : (
          'Get more'
        )}
      </Button>
    </Box>
  )
}
