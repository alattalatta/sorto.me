import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { DocMetadata } from 'utils/docs'

import { Container } from './Container'
import DocFooter from './DocFooter'
import DocTitle from './DocTitle'
import styles from './PostBody.module.scss'
import { MDX_COMPONENTS, MDXWrap } from './mdxCommons'

type Props = {
  children: MdxRemote.Source
  meta: DocMetadata
  slugs: string[]
}

const DocBody: React.VFC<Props> = ({ children, meta, slugs }) => {
  const content = hydrate(children, { components: MDX_COMPONENTS })

  return (
    <article>
      <DocTitle>{meta.title}</DocTitle>
      <Container>
        <MDXWrap className={styles.prismStyler}>{content}</MDXWrap>
      </Container>
      <DocFooter slug={slugs.join('/')} updated={meta.updated} />
    </article>
  )
}

export default DocBody
