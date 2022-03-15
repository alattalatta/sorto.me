import { colors } from '@lib/ui/theme.css'
import { recipe } from '@vanilla-extract/recipes'

export const root = recipe({
  base: {
    width: 80,
    border: 'none',
    color: colors.gray7,
    padding: '.25em 0',
    position: 'relative',
    textAlign: 'center',
  },
  variants: {
    clickable: {
      true: {
        cursor: 'help',
      },
    },
    support: {
      yes: { backgroundColor: '#AFF677' },
      no: { backgroundColor: '#C75040', color: colors.gray0 },
      partial: { backgroundColor: '#FFCC47' },
      unknown: { backgroundColor: '#CCCCCC' },
    },
  },
})
