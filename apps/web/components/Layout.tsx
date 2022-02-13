import { css, FixedStrip, FIXED_STRIP_HEIGHT, ScrollBack } from '@lib/ui'
import { styled } from '@stitches/react'

import { Anchor } from './basics'

type Props = {
  bottomStrip?: boolean
  topStrip?: boolean
  width?: number
}

const Body = styled('div', {
  maxWidth: `${982 / 16}em`,
  margin: '0 auto',
  padding: '0 1em',
  variants: {
    bottomStrip: {
      true: {
        marginBottom: `${FIXED_STRIP_HEIGHT}em`,
      },
    },
    topStrip: {
      true: {
        marginTop: `${FIXED_STRIP_HEIGHT + 1.5}em`,
      },
    },
  },
})

const TopStripBody = styled('div', {
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

const Layout: React.FC<Props> = ({ children, bottomStrip = true, topStrip = true, width = 982 }) => {
  const maxWidth = `${width / 16}em`

  return (
    <>
      {topStrip && (
        <FixedStrip css={{ maxWidth }} position="top">
          <TopStripBody>
            <Link href="/">sorto.me</Link>
            <Link href="/search">검색</Link>
          </TopStripBody>
        </FixedStrip>
      )}
      <Body bottomStrip={bottomStrip} css={{ maxWidth }} topStrip={topStrip}>
        {children}
      </Body>
      {bottomStrip && <ScrollBack className={css({ maxWidth })()} />}
    </>
  )
}

export { Layout }
