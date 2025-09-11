import { useState } from 'react'
import Image from 'next/image'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'
import { Box } from '@mui/material'

interface ProductImageProps {
  imageUrl?: string
  alt: string
}

export function ProductImage(props: ProductImageProps) {
  const [hasError, setHasError] = useState(false)

  if (!props.imageUrl || hasError) {
    return (
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'black',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <BrokenImageIcon fontSize="large" />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '1 / 1',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
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
