import React from 'react'

import { Container } from './Container'
import { Anchor } from './basics'

type Props = {
  slug: string
}

const DocFooter: React.VFC<Props> = ({ slug }) => {
  const mdnHref = `https://developer.mozilla.org/ko/docs/${slug}`
  return (
    <footer>
      <Container>
        <p>
          본 문서는 한국어 MDN의 문서를 업데이트한 것입니다. <Anchor href={mdnHref}>(원본 문서)</Anchor>{' '}
          <Anchor href={`${mdnHref}/contributors.txt`}>(기여자)</Anchor>
        </p>
        <p>
          <Anchor href="https://creativecommons.org/licenses/by-sa/2.5/">Licensed under CC-BY-SA 2.5</Anchor>.
        </p>
      </Container>
    </footer>
  )
}

export default DocFooter
