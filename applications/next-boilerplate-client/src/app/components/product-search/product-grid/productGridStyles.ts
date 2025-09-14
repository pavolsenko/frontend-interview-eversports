import { SxProps, Theme } from '@mui/material'

export const productGridStyles = (theme: Theme): SxProps => ({
  marginTop: theme.spacing(3),
})

export const productGridLoadingStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10%',
}

export const productGridNoResultsStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10%',
}

export const productItemStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  width: '100%',
}

export const productItemImageStyles = (theme: Theme): SxProps => ({
  width: '100%',
  aspectRatio: '1 / 1',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  overflow: 'hidden',
})

export const productItemImageErrorStyles = (theme: Theme): SxProps => ({
  width: '100%',
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
})

export const productItemTextStyles: SxProps = {
  fontSize: '22px',
  lineHeight: '28px',
}

export const productGridFetchMoreStyles = (theme: Theme): SxProps => ({
  marginY: theme.spacing(6),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  '& .MuiButton-root': {
    minWidth: {
      xs: '100%',
      sm: '200px',
    },
    minHeight: '42px',
  },
})
