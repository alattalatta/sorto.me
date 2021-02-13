import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { DocMetadata } from 'utils/docs'

import DocFooter from './DocFooter'
import DocHero from './DocHero'
import { MDX_COMPONENTS, MDXWrap } from './MDX'
import { Container } from './basics'

type Props = {
  children: MdxRemote.Source
  meta: DocMetadata
  slugs: string[]
}

const DocBody: React.VFC<Props> = ({ children, meta, slugs }) => {
  return (
    <article>
      <DocHero slugs={slugs}>{meta.title}</DocHero>
      <Container>
        <MDXWrap components={MDX_COMPONENTS}>{children}</MDXWrap>
      </Container>
      <DocFooter meta={meta} slugs={slugs} />
    </article>
  )
}

export default DocBody
