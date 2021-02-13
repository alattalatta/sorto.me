import { styled, StyleSheet } from 'utils/styler'

export const DOUBLE_BORDER: StyleSheet = {
  borderRight: '3px double',
  borderRightColor: '$base60',
}

export const Cell = styled('td', {
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
