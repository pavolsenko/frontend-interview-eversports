import Image from 'next/image'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'

interface ProductImageProps {
  imageUrl?: string
  alt: string
}

export function ProductImage(props: ProductImageProps) {
  if (!props.imageUrl) {
    return <BrokenImageIcon />
  }

  return <Image src={props.imageUrl} alt={props.alt} width={500} height={500} />
}
