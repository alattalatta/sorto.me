import { useRouter } from 'next/router'
import React from 'react'

import { DocMetadata } from 'utils/docs'

import DocFooter from './DocFooter'
import DocHero from './DocHero'
import { DOCS_MDX_COMPONENTS } from './DocsMDX'
import { MDXWrap, MDX_SCOPE } from './MDX'
import TableOfContent from './TableOfContent'
import { Container } from './basics'

import type { Identifier } from '@mdn/browser-compat-data/types'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

type Props = {
  bcd: {
    data: Identifier
    name: string
  } | null
  children: MDXRemoteSerializeResult
  meta: DocMetadata
  slugs: string[]
}

const DocBody: React.VFC<Props> = ({ bcd, children, meta, slugs }) => {
  const router = useRouter()

  return (
    <article>
      <DocHero slugs={slugs}>{meta.title}</DocHero>
      <Container css={{ position: 'relative' }}>
        <TableOfContent key={router.asPath} />
        <MDXWrap components={DOCS_MDX_COMPONENTS} scope={{ ...MDX_SCOPE, bcd }}>
          {children}
        </MDXWrap>
      </Container>
      <DocFooter meta={meta} slugs={slugs} />
    </article>
  )
}

export default DocBody
