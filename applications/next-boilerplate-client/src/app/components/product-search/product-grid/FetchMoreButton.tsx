import { Box, Button, CircularProgress, useTheme } from '@mui/material'

import { productGridFetchMoreStyles } from '@/app/components/product-search/product-grid/productGridStyles'

interface FetchMoreButtonProps {
  hasMore: boolean
  isLoading?: boolean
  onMoreClick: () => void
}

export function FetchMoreButton(props: FetchMoreButtonProps) {
  const theme = useTheme()

  if (!props.hasMore) {
    return null
  }

  return (
    <Box sx={productGridFetchMoreStyles(theme)}>
      <Button
        variant={'contained'}
        size={'large'}
        onClick={props.onMoreClick}
        disabled={props.isLoading}
        data-testid={'fetch-more-button'}
      >
        {props.isLoading ? (
          <CircularProgress color={'inherit'} size={18} />
        ) : (
          'Get more'
        )}
      </Button>
    </Box>
  )
}
