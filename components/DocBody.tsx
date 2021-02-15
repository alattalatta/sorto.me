import { MdxRemote } from 'next-mdx-remote/types'
import { useRouter } from 'next/router'
import React from 'react'

import { DocMetadata } from 'utils/docs'

import DocFooter from './DocFooter'
import DocHero from './DocHero'
import { MDX_COMPONENTS, MDXWrap } from './MDX'
import TableOfContent from './TableOfContent'
import { Container } from './basics'

type Props = {
  children: MdxRemote.Source
  meta: DocMetadata
  slugs: string[]
}

const DocBody: React.VFC<Props> = ({ children, meta, slugs }) => {
  const router = useRouter()
  console.log(router)

  return (
    <article>
      <DocHero slugs={slugs}>{meta.title}</DocHero>
      <Container>
        <TableOfContent key={router.asPath} />
        <MDXWrap components={MDX_COMPONENTS}>{children}</MDXWrap>
      </Container>
      <DocFooter meta={meta} slugs={slugs} />
    </article>
  )
}

export default DocBody
