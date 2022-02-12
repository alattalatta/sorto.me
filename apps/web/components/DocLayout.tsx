import { FIXED_STRIP_HEIGHT } from '@app/ui'
import { styled } from '@stitches/react'

import { DocNav } from './DocNav'

const Body = styled('div', {
  marginTop: `${FIXED_STRIP_HEIGHT + 1.5}em`,
})

const DocLayout: React.FC = ({ children }) => {
  return (
    <>
      <DocNav />
      <Body>{children}</Body>
    </>
  )
}

export { DocLayout }
