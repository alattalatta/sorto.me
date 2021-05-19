import { useEffect, useRef, useState } from 'react'

import { useToggleState } from 'hooks/useToggleState'
import { styled } from 'utils/styler'

import { Anchor } from './basics'

const Root = styled('nav', {
  width: 'calc(50vw - 640px)',
  height: '100%',
  background: '#fff',
  borderRight: '4px solid transparent',
  paddingLeft: 24,
  position: 'absolute',
  top: 0,
  right: '100%',
  zIndex: 9,
  '@wide': {
    width: 240,
    paddingRight: 40,
    left: 24,
  },
  variants: {
    opened: {
      true: {
        '@wide': {
          borderRightColor: '$base40',
          transform: 'translateX(0)',
          transition: 'border-color 500ms ease, transform 500ms ease',
        },
      },
      false: {
        '@wide': {
          transform: 'translateX(-100%)',
          transition: 'transform 500ms ease',
        },
      },
    },
  },
})

const OpenerWrap = styled('div', {
  height: '100%',
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
})

const Opener = styled('button', {
  background: '#fff',
  border: 'none',
  borderBottom: '4px solid $base40',
  cursor: 'pointer',
  display: 'none',
  fontSize: 14,
  fontWeight: 700,
  marginTop: 128,
  padding: '0 0 4px',
  position: 'sticky',
  top: 162,
  left: '100%',
  transform: 'rotate(-90deg) translateY(-100%) translateY(4px)',
  transformOrigin: 'top right',
  '@wide': {
    display: 'block',
  },
})

const Body = styled('div', {
  maxHeight: 'calc(100vh - 96px)', // top 32 + bottom 64
  position: 'sticky',
  top: 32,
})

const TOCHeading = styled('h2', {
  marginTop: 16,
})

const Headings = styled('ul', {
  listStyle: 'none',
  marginTop: 16,
  overflow: 'auto',
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
  const el = useRef<HTMLElement>(null)

  const [headings, setHeadings] = useState<(readonly [level: number, text: string, id: string])[]>([])
  const [opened, toggleOpened, setOpened] = useToggleState(false)

  useEffect(() => {
    const hs = Array.from(
      document.querySelector('main')?.querySelectorAll('h2[id]:not([id="toc-heading"]), h3[id]') || [],
    ).map(
      (el) =>
        [
          Number(el.tagName.slice(1)),
          (el.textContent || '').slice(0, -1), // shoud slice (0, -1) to exclude "#"
          el.id,
        ] as const,
    )
    setHeadings(hs)
  }, [])

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      if (!el.current?.contains(event.target as HTMLElement)) {
        setOpened(false)
      }
    }

    if (opened) {
      window.addEventListener('click', handleWindowClick)
    }

    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  }, [opened])

  // screen readers have their own indexes
  return (
    <Root ref={el} opened={opened} aria-hidden>
      <OpenerWrap>
        <Opener onClick={toggleOpened}>{opened ? '목차닫기' : '목차열기'}</Opener>
      </OpenerWrap>
      <Body>
        <TOCHeading>목차</TOCHeading>
        <Headings>
          {headings.map(([level, text, id]) => (
            <li key={id}>
              <Heading
                css={{ fontSize: `${1 - (level - 2) * 0.2}em`, paddingLeft: `${(level - 2) * 8}px` }}
                href={`#${id}`}
                onClick={toggleOpened}
              >
                {text}
              </Heading>
            </li>
          ))}
        </Headings>
      </Body>
    </Root>
  )
}

export default TableOfContent
