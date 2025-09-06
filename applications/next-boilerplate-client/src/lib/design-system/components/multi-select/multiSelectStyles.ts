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

  border:
    '1px solid ' +
    (isOpen ? theme.palette.secondary.main : theme.palette.grey[300]),
  borderRadius: theme.shape.borderRadius,

  color: isOpen ? theme.palette.secondary.main : theme.palette.grey[800],
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
})

export const multiSelectPopoverStyles = (theme: Theme): SxProps => ({
  cursor: 'pointer',
  width: '370px',
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
  paddingY: theme.spacing(1),
})
