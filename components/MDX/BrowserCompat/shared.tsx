import { styled, StyleSheet } from 'utils/styler'

export const DOUBLE_BORDER: StyleSheet = {
  borderRight: '3px double $base60',
}

export const Cell = styled('td', {
  background: '$base100',
  border: `1px solid`,
  borderColor: '$base70',
  variants: {
    border: {
      doubleRight: DOUBLE_BORDER,
    },
  },
})

export const Icon = styled('img', {
  width: 16,
  display: 'block',
})
