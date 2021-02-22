import { motion as m } from 'framer-motion'
import React from 'react'

import { TimelineData } from 'data/about'
import { styled } from 'utils/styler'

import AboutTimelineHeader from './AboutTimelineHeader'
import { NoScreen } from './basics'

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
    <Root layoutId={data.id} onClick={onClickExpand} aria-labelledby={`${data.id}-id`}>
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
