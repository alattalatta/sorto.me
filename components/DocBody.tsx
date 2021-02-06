import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { DocMetadata } from 'utils/docs'

import DocFooter from './DocFooter'
import DocHero from './DocHero'
import { MDX_COMPONENTS, MDXWrap } from './MDX'
import styles from './PostBody.module.scss'
import { Container } from './basics'

type Props = {
  children: MdxRemote.Source
  meta: DocMetadata
  slugs: string[]
}

const DocBody: React.VFC<Props> = ({ children, meta, slugs }) => {
  const content = hydrate(children, { components: MDX_COMPONENTS })

  return (
    <article>
      <DocHero>{meta.title}</DocHero>
      <Container>
        <MDXWrap className={styles.prismStyler}>{content}</MDXWrap>
      </Container>
      <DocFooter slug={slugs.join('/')} updated={meta.updated} />
    </article>
  )
}

export default DocBody
