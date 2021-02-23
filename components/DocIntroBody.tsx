import React from 'react'

import { styled } from 'utils/styler'

import { Anchor, Container as ContainerBase } from './basics'

const Container = styled(ContainerBase, {
  lineHeight: 1.75,
  '& > * + *': {
    marginTop: 24,
  },
})

const H1 = styled('h1', {
  fontFamily: '$sans',
  fontSize: 36,
})

const H2 = styled('h2', {
  fontFamily: '$sans',
  fontSize: 24,
})

const DocIntroBody: React.VFC = () => {
  return (
    <article>
      <Container>
        <H1>Docs</H1>
        <p>
          Docs는 <Anchor href="https://developer.mozilla.org/en-US/">MDN Web Docs</Anchor>의 콘텐츠 중 일부를 한국어로
          옮겨오려는 시도입니다.
        </p>
        <H2>왜?</H2>
        <p>
          Mozilla Corporation의 대규모 인력 감축은 MDN에도 큰 영향을 줬습니다. 구형 인프라 개선 및 비용 절감을 위해{' '}
          <Anchor href="https://github.com/mdn/kuma">기존의 위키</Anchor> 형식을 포기하고{' '}
          <Anchor href="https://github.com/mdn/yari">정적 페이지 서빙</Anchor>을 선택했는데, 그 과정에서 대부분의 현지화
          자료 역시 동결됐습니다.
        </p>
        <p>
          별도 저장소를 사용하는, 동결 해제 예정인 "티어 1" 언어는 중국어 간체/번체, 프랑스어, 일본어 네 개에
          불과합니다. 한국어는 나머지 언어로 이루어진 "티어 2"로, 참여 인원이 한정됐으므로 동결 해제 계획이 없습니다.
          그리고, 곧 티어 2 언어는 기존의 번역본조차 노출되지 않을 예정입니다.
        </p>
        <p>
          Docs에서는 갈 곳 잃은 기존 한국어 번역본을 개선하고, 낡은 자료는 업데이트해서 제공할 생각입니다. JavaScript
          자료는 다양한 곳에서 많이 찾을 수 있으므로, 상대적으로 취약한 HTML 및 CSS 참고서에 집중하려고 합니다.
        </p>
        <H2>페이지 목록</H2>
        <ul>
          <li>
            <Anchor href="/docs/search">검색하기</Anchor>
          </li>
          <li>
            <Anchor href="/docs/Web/HTML/Element">HTML 요소 참고서</Anchor>
          </li>
        </ul>
      </Container>
    </article>
  )
}

export default DocIntroBody
