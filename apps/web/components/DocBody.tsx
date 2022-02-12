import type { DocMetadata } from '@app/docs'
import { useMDXRenderer } from '@app/mdx'
import { DocumentBody, Footer, ScrollBack, FIXED_STRIP_HEIGHT, styled, Title } from '@app/ui'
import type { Identifier } from '@mdn/browser-compat-data/types'
import { motion as m } from 'framer-motion'
import React from 'react'

import { easeStandard } from 'utils/styler'

import { DOCS_MDX_COMPONENTS } from './DocsMDX'

type Props = {
  bcd: {
    data: Identifier
    name: string
  } | null
  breadcrumbs: (readonly [title: string, path: string])[]
  compiledSource: string
  meta: DocMetadata
}

const Root = styled('main', {
  maxWidth: `${982 / 16}rem`,
  margin: '0 auto',
  padding: `0 1rem ${FIXED_STRIP_HEIGHT}rem`,
  paddingBottom: `calc(env(safe-area-inset-bottom) + ${FIXED_STRIP_HEIGHT}rem)`,
})

const Body = styled(m.div, {
  marginTop: '1.5rem',
})

const ScrollBack982 = styled(ScrollBack, {
  maxWidth: `${982 / 16}rem`,
})

const DocBody: React.VFC<Props> = ({ bcd, breadcrumbs, compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <Root>
      <Title breadcrumbs={breadcrumbs} title={meta.title} />
      <Body
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.2,
          opacity: easeStandard(0.25),
          y: easeStandard(0.5),
        }}
      >
        <DocumentBody>
          <Content bcd={bcd} components={DOCS_MDX_COMPONENTS} />
        </DocumentBody>
      </Body>
      <Footer mdnSlug={meta.slug} updated={new Date(meta.updated)} />
      <ScrollBack982 />
    </Root>
  )
}

export default DocBody
