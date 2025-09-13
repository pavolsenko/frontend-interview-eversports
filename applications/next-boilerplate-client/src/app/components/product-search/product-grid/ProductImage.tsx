import { useState } from 'react'
import Image from 'next/image'
import { Box, useTheme } from '@mui/material'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'

import {
  productItemImageErrorStyles,
  productItemImageStyles,
} from '@/app/components/product-search/product-grid/productGridStyles'

interface ProductImageProps {
  imageUrl?: string
  alt: string
}

export function ProductImage(props: ProductImageProps) {
  const [hasError, setHasError] = useState(false)
  const theme = useTheme()

  if (!props.imageUrl || hasError) {
    return (
      <Box
        sx={productItemImageErrorStyles(theme)}
        data-testid={'broken-image-icon'}
      >
        <BrokenImageIcon fontSize="large" />
      </Box>
    )
  }

  return (
    <Box sx={productItemImageStyles(theme)}>
      <Image
        src={props.imageUrl}
        alt={props.alt}
        fill
        style={{ objectFit: 'cover' }}
        onError={() => setHasError(true)}
      />
    </Box>
  )
}
