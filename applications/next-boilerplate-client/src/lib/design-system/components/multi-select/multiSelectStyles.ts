import { SxProps, Theme } from '@mui/material'

const MENU_ITEM_HEIGHT = 44

export const multiSelectStyles = (theme: Theme, isOpen: boolean): SxProps => ({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '370px',
  height: MENU_ITEM_HEIGHT,

  paddingLeft: theme.spacing(2),
  margin: theme.spacing(2),

  border:
    '1px solid ' +
    (isOpen ? theme.palette.secondary.main : theme.palette.grey[300]),
  borderRadius: theme.shape.borderRadius,

  color: isOpen ? theme.palette.secondary.main : theme.palette.grey[800],
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
})

export const multiSelectPopoverStyles = (
  theme: Theme,
  popoverWidth: number,
): SxProps => ({
  width: popoverWidth,
  maxWidth: '100%',
  boxShadow: '0px 8px 16px 0px #14141429',
  marginTop: theme.spacing(1),
})

export const multiSelectItemStyles = (
  theme: Theme,
  hasBorderBottom?: boolean,
): SxProps => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: MENU_ITEM_HEIGHT,
  paddingX: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  borderBottom: hasBorderBottom
    ? '1px solid ' + theme.palette.grey[300]
    : 'none',
})

export const multiSelectOptionsWrapperStyles: SxProps = {
  height: 6 * MENU_ITEM_HEIGHT,
  overflow: 'auto',
}

export const multiSelectActionButtonsStyles = (theme: Theme): SxProps => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '48px',
  borderTop: '1px solid ' + theme.palette.grey[300],
  paddingX: theme.spacing(2),
})

export const multiSelectNoOptionsStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 6 * MENU_ITEM_HEIGHT,
}

export const multiSelectItemTextStyles = (theme: Theme): SxProps => ({
  paddingLeft: theme.spacing(1),
})
