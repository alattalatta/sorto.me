import { FixedStrip, styled } from '@app/ui'

import { Anchor } from './basics'

const Body = styled('div', {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontWeight: 600,
  padding: '0 1.5em',
})

const Link = styled(Anchor, {
  color: 'inherit',
  textDecoration: 'none',
})

const DocNav: React.VFC = () => {
  return (
    <FixedStrip position="top">
      <Body>
        <Link href="/">sorto.me</Link>
        <Link href="/search">검색</Link>
      </Body>
    </FixedStrip>
  )
}

export { DocNav }
