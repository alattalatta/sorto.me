import React from 'react'

import { Break } from 'components/basics'
import { WOOWA } from 'data/about'

import Root from './Root'
import { DetailHeading, EntryDetailComponent, Works } from './shared'

const Woowa: EntryDetailComponent = ({ onShrinkRequest }) => {
  return (
    <Root data={WOOWA} onShrinkRequest={onShrinkRequest}>
      <p>
        <strong>우아한형제들</strong>은 배달의민족과 만화경 등을 서비스하는 플랫폼 업체입니다.
        <Break />
        B마트는 배달의민족 내에 속한 서비스로, 소량 상품을 주문 즉시 문 앞으로 배송하는 "퀵 커머스"입니다.
      </p>
      <DetailHeading>인앱 웹뷰</DetailHeading>
      <Works>
        <li>쿠폰, 장바구니 등 비즈니스 도메인</li>
        <li>프로젝트 컨벤션</li>
      </Works>
    </Root>
  )
}

export default Woowa
