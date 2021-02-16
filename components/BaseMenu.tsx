import { styled } from 'utils/styler'

import { Anchor } from './basics'

export const BaseMenu = styled('ul', {
  listStyle: 'none',
  paddingLeft: 0,
})

export const BaseMenuItem = styled(Anchor, {
  display: 'block',
  fontSize: 36,
  marginTop: 36,
  textDecoration: 'none',
  '&:hover:not([aria-disabled])': {
    textDecoration: 'underline',
  },
})

export default BaseMenu
