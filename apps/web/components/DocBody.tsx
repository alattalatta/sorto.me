import type { DocMetadata } from '@contents/docs'
import { useMDXRenderer } from '@lib/mdx'
import { DocumentBody, Footer, styled, Title } from '@lib/ui'
import type { Identifier } from '@mdn/browser-compat-data/types'
import { motion as m } from 'framer-motion'

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

const Body = styled(m.div, {
  marginTop: '1.5rem',
})

const DocBody: React.VFC<Props> = ({ bcd, breadcrumbs, compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <main>
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
    </main>
  )
}

export default DocBody
