import React from 'react'

import { Anchor } from 'components/basics'
import { styled } from 'utils/styler'

const Root = styled('cite', {
  fontStyle: 'normal',
})

const CalloutCite: React.VFC<{ children: string; href: string }> = ({ children, href }) => {
  return (
    <Root>
      <Anchor href={href}>{children}</Anchor>
    </Root>
  )
}

export default CalloutCite
