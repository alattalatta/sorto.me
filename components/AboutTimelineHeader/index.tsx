import { motion as m } from 'framer-motion'
import React from 'react'

import { TimelineData } from 'data/about'
import { easeStandard, styled } from 'utils/styler'

import Period from './Period'

const Header = styled(m.header, {})

export const Name = styled('h2', {
  fontFamily: '$sans',
  fontSize: 24,
})

export const Body = styled(m.div, {
  fontSize: 20,
  marginTop: 20,
})

type Props = {
  asHeaderElement?: boolean
  data: TimelineData
}

const AboutTimelineHeader: React.VFC<Props> = ({ asHeaderElement, data }) => {
  return (
    <Header as={asHeaderElement ? m.header : m.div} layoutId={`${data.id}-header`} transition={easeStandard(0.4)}>
      <Name id={asHeaderElement ? `${data.id}-header-id` : `${data.id}-id`}>{data.name}</Name>
      <Period from={data.from} to={data.to} />
      <Body>
        <p>{data.position}</p>
      </Body>
    </Header>
  )
}

export default AboutTimelineHeader
