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

export function ProductImage(props: Readonly<ProductImageProps>) {
  const [hasError, setHasError] = useState<boolean>(false)
  const theme = useTheme()

  if (!props.imageUrl || hasError) {
    return (
      <Box
        sx={productItemImageErrorStyles(theme)}
        data-testid={'broken-image-icon'}
      >
        <BrokenImageIcon />
      </Box>
    )
  }

  return (
    <Box sx={productItemImageStyles(theme)}>
      <Image
        src={props.imageUrl}
        alt={props.alt}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        onError={() => setHasError(true)}
      />
    </Box>
  )
}
