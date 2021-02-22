import { motion as m, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useToggleState } from 'hooks/useToggleState'
import { easeStandard, styled } from 'utils/styler'

import { Anchor, NoScreen } from './basics'

const BODY_VARIANTS: Variants = {
  closed: {
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: easeStandard(0.15),
    transitionEnd: {
      visibility: 'hidden',
    },
  },
  opened: {
    clipPath: 'inset(0% 0% 0% 0%)',
    visibility: 'visible',
    transition: easeStandard(0.2),
  },
}

const Root = styled('aside', {
  width: 282,
  float: 'right',
  fontFamily: '$sans',
  marginLeft: 8,
  position: 'relative',
  when: {
    narrow: {
      float: 'none',
      marginLeft: 'auto',
    },
  },
})

const Opener = styled('button', {
  width: '100%',
  background: '$base70',
  border: 0,
  borderRadius: '$cornerRadius',
  cursor: 'pointer',
  padding: '8px 16px',
})

const Body = styled(m.nav, {
  width: '100%',
  background: '#fff',
  border: '4px solid $base70',
  borderRadius: '$cornerRadius',
  padding: 16,
  position: 'absolute',
  top: '100%',
  left: 0,
  transform: 'translateY(8px)',
  zIndex: 8,
})

const NavList = styled('ul', {
  listStyle: 'none',
  padding: 0,
  '& > li + li': {
    marginTop: 8,
  },
})

const Heading = styled(Anchor, {
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

const TableOfContent: React.VFC = () => {
  const [opened, toggleOpened] = useToggleState(false)
  const [headings, setHeadings] = useState<(readonly [number, string, string])[]>([])

  useEffect(() => {
    if (opened) {
      const hs = Array.from(
        document.querySelector('main')?.querySelectorAll('h1[id], h2[id]:not([id="toc-heading"]), h3[id], h4[id]') ||
          [],
      ).map((el) => [Number(el.tagName.slice(1)), (el.textContent || '').slice(0, -1), el.id] as const)
      setHeadings(hs)
    }
  }, [opened])

  return (
    <Root>
      <Opener onClick={toggleOpened} aria-controls="toc" aria-haspopup="menu" aria-expanded={opened}>
        목차 {opened ? '닫기' : '열기'}
      </Opener>
      <Body
        id="toc"
        variants={BODY_VARIANTS}
        initial="closed"
        animate={opened ? 'opened' : 'closed'}
        aria-labelledby="toc-heading"
      >
        <NoScreen as="h2" id="toc-heading">
          목차
        </NoScreen>
        <NavList>
          {headings.map(([level, text, id]) => (
            <li key={id}>
              <Heading css={{ paddingLeft: `${(level - 2) * 16}px` }} href={`#${id}`} onClick={toggleOpened}>
                {text}
              </Heading>
            </li>
          ))}
        </NavList>
      </Body>
    </Root>
  )
}

export default TableOfContent
