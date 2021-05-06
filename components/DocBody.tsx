import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'

import { DocMetadata } from 'utils/docs'

import DocFooter from './DocFooter'
import DocHero from './DocHero'
import Demo from './DocsMDX/Demo'
import LiveExample from './DocsMDX/LiveExample'
import { HTMLAttr, Term, TermLink } from './DocsMDX/Term'
import { MDXWrap, MDX_COMPONENTS } from './MDX'
import TableOfContent from './TableOfContent'
import { Container } from './basics'

type Props = {
  children: MDXRemoteSerializeResult
  meta: DocMetadata
  slugs: string[]
}

const DOCS_MDX_COMPONENTS = Object.freeze({
  ...MDX_COMPONENTS,
  BrowserCompat: dynamic(() => import('./DocsMDX/BrowserCompat')),
  Demo,
  HTMLAttr,
  LiveExample,
  Term,
  TermLink,
})

const DocBody: React.VFC<Props> = ({ children, meta, slugs }) => {
  const router = useRouter()

  return (
    <article>
      <DocHero slugs={slugs}>{meta.title}</DocHero>
      <Container>
        <TableOfContent key={router.asPath} />
        <MDXWrap components={DOCS_MDX_COMPONENTS}>{children}</MDXWrap>
      </Container>
      <DocFooter meta={meta} slugs={slugs} />
    </article>
  )
}

export default DocBody
