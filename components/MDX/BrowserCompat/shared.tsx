import { styled, BASE70, BASE60 } from 'utils/styler'

export const DOUBLE_BORDER = `3px double ${BASE60}`

export const Cell = styled('td', {
  border: `1px solid ${BASE70}`,
  padding: 12,
  variants: {
    border: {
      doubleLeft: {
        borderLeft: DOUBLE_BORDER,
      },
      doubleRight: {
        borderRight: DOUBLE_BORDER,
      },
    },
  },
})

export const HeaderCell = styled(Cell, {
  padding: 16,
  verticalAlign: 'bottom',
})

export const Icon = styled('img', {
  width: 16,
  display: 'block',
})
