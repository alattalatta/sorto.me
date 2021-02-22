import { motion as m, Variants } from 'framer-motion'
import React from 'react'

import { TimelineData } from 'data/about'
import { easeStandard, styled } from 'utils/styler'

import AboutTimelineHeader from './AboutTimelineHeader'
import { NoScreen } from './basics'

const ROOT_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  present: {
    opacity: 1,
    y: 0,
  },
}

const Root = styled(m.article, {
  background: '#fff',
  cursor: 'pointer',
  padding: '16px 24px',
  position: 'absolute',
  top: -40,
  right: 0,
  left: 20,
  '&:hover': {
    background: '$base90',
  },
})

const Wrap = styled('div', {
  display: 'flex',
})

type Props = {
  data: TimelineData
  onClickExpand: () => void
}

const AboutTimelineEntry: React.FC<Props> = ({ data, onClickExpand }) => {
  return (
    <Root
      layoutId={data.id}
      variants={ROOT_VARIANTS}
      transition={easeStandard(0.4)}
      onClick={onClickExpand}
      aria-labelledby={`${data.id}-id`}
    >
      <Wrap>
        <AboutTimelineHeader data={data} />
      </Wrap>
      <NoScreen as="button" type="button" onClick={onClickExpand} aria-haspopup="dialog">
        자세히
      </NoScreen>
    </Root>
  )
}

export default AboutTimelineEntry
