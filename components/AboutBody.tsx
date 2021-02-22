import { AnimatePresence, AnimateSharedLayout, motion as m, Variants } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { TIMELINE, TimelineID } from 'data/about'
import { makeScrollLocker } from 'utils/element'
import { styled } from 'utils/styler'

import AboutTimelineEntry from './AboutTimelineEntry'
import Urbanplay from './AboutTimelineEntryDetails/Urbanplay'
import Woowa from './AboutTimelineEntryDetails/Woowa'
import Yanolja from './AboutTimelineEntryDetails/Yanolja'
import { Break, Container as ContainerBase, NoScreen } from './basics'

const TIMELINE_VARIANTS: Variants = {
  initial: {
    opacity: 0,
  },
  present: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: 'beforeChildren',
    },
  },
}

const Container = styled(ContainerBase, {
  paddingBottom: 172,
  userSelect: 'none',
  '& abbr': {
    cursor: 'text',
  },
})

const Columns = styled('div', {
  display: 'flex',
  marginRight: -24,
  marginLeft: -24,
  when: {
    broad: {
      display: 'block',
      marginRight: 0,
      marginLeft: 0,
    },
  },
})

const Column = styled('section', {
  paddingRight: 24,
  paddingLeft: 24,
  when: {
    broad: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
})
const ColumnNarrow = styled(Column, {
  width: '33%',
  when: {
    broad: {
      width: '100%',
    },
  },
})
const ColumnWide = styled(Column, {
  flexGrow: 1,
  when: {
    broad: {
      marginTop: 72,
    },
  },
})

const Name = styled('h1', {
  fontFamily: '$sans',
  fontSize: 48,
})

const Description = styled('p', {
  fontSize: 24,
  lineHeight: 1.4,
  marginTop: 20,
})

const Timeline = styled(m.div, {
  listStyle: 'none',
  paddingTop: 32,
  paddingLeft: 16,
  position: 'relative',
  '&::before': {
    content: "''",
    width: 1,
    background: '$base70',
    position: 'absolute',
    top: 32,
    bottom: 0,
    left: 19,
  },
})

const Poser = styled('div', {
  height: 8,
  position: 'relative',
  '&::before': {
    content: "''",
    width: 8,
    height: 8,
    background: '$base60',
    borderRadius: '50%',
    display: 'block',
  },
  '& + &': {
    marginTop: 200,
  },
})

const AboutBody: React.VFC = () => {
  const [expanded, setExpanded] = useState<TimelineID | null>(null)

  const expansionHandler = (id: TimelineID) => (): void => {
    setExpanded(expanded === id ? null : id)
  }

  const shrink = (): void => setExpanded(null)

  const activeDetail = (() => {
    switch (expanded) {
      case 'Woowa':
        return <Woowa onShrinkRequest={shrink} />
      case 'Yanolja':
        return <Yanolja onShrinkRequest={shrink} />
      case 'URBAN':
        return <Urbanplay onShrinkRequest={shrink} />
    }
  })()

  const scrollLock = makeScrollLocker()
  useEffect(() => {
    scrollLock(!!expanded)

    return () => {
      scrollLock(false)
    }
  }, [expanded])

  return (
    <Container as="article">
      <Columns>
        <ColumnNarrow>
          <Name>alattalatta</Name>
          <Description>
            I'm a Web front-end developer
            <Break />
            at Woowa Brothers Corp.
            <Break />
            since 2020-12.
          </Description>
        </ColumnNarrow>
        <ColumnWide>
          <NoScreen as="h1">Timeline</NoScreen>
          <Timeline variants={TIMELINE_VARIANTS} initial="initial" animate="present">
            <AnimateSharedLayout type="crossfade">
              {TIMELINE.map((data) => (
                <Poser key={data.id}>
                  <AboutTimelineEntry data={data} onClickExpand={expansionHandler(data.id)} />
                </Poser>
              ))}
              <AnimatePresence>{activeDetail}</AnimatePresence>
            </AnimateSharedLayout>
          </Timeline>
        </ColumnWide>
      </Columns>
    </Container>
  )
}

export default AboutBody
