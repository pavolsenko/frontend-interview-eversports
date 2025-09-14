import { useState, useEffect } from 'react'
import { Fab, useTheme, Zoom } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { productGridBackToTopStyles } from '@/app/components/product-search/product-grid/productGridStyles'

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Zoom in={isVisible}>
      <Fab
        color={'primary'}
        onClick={scrollToTop}
        aria-label={'Back to top'}
        sx={productGridBackToTopStyles(theme)}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}
