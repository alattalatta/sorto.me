import React from 'react'

import { Anchor } from 'components/basics'
import { YANOLJA } from 'data/about'

import Root from './Root'
import { DetailHeading, EntryDetailComponent, Works } from './shared'

const Yanolja: EntryDetailComponent = ({ onShrinkRequest }) => {
  return (
    <Root data={YANOLJA} onShrinkRequest={onShrinkRequest}>
      <p>
        <strong>야놀자</strong>는 숙박, 레저, 교통 등의 상품을 제공하는 OTA 서비스 업체입니다.
      </p>
      <DetailHeading>
        <Anchor href="https://www.yanolja.com/">야놀자 웹</Anchor>
      </DetailHeading>
      <Works>
        <li>회원가입, 레저, 검색 등 비즈니스 도메인</li>
        <li>디자인 시스템</li>
        <li>빌드 파이프라인</li>
        <li>정적 분석 자동화</li>
      </Works>
      <DetailHeading>기타</DetailHeading>
      <Works>
        <li>국내 숙소 상품 사이트맵 자동 생성</li>
        <li>Facebook Dynamic Ads 피드 파일 자동 생성</li>
      </Works>
    </Root>
  )
}

export default Yanolja
