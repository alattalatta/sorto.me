import React from 'react'

import { Anchor } from 'components/basics'
import { URBAN } from 'data/about'

import Root from './Root'
import { DetailHeading, EntryDetailComponent, Works } from './shared'

const Urbanplay: EntryDetailComponent = ({ onShrinkRequest }) => {
  return (
    <Root data={URBAN} onShrinkRequest={onShrinkRequest}>
      <p>
        <strong>URBANPLAY</strong>는 공간 재생과 로컬 콘텐츠 큐레이션 등 도시 콘텐츠 사업을 다룹니다.
      </p>
      <DetailHeading>
        <Anchor href="https://iknowhere.co.kr/">아는동네</Anchor>
      </DetailHeading>
      <Works>
        <li>큐레이션 서비스 신규 개발</li>
        <li>
          <Anchor href="https://collection.iknowhere.co.kr/euljiro">《아는동네, 아는을지로》</Anchor> 컬렉션
        </li>
        <li>기존 Wordpress 서비스, Flask 서버, MySQL 데이터베이스 관리</li>
        <li>기타 외주작업</li>
      </Works>
    </Root>
  )
}

export default Urbanplay
