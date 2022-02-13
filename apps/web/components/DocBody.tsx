import type { DocMetadata } from '@contents/docs'
import { useMDXRenderer } from '@lib/mdx'
import { DocumentBody, Footer, styled, Title } from '@lib/ui'
import type { Identifier } from '@mdn/browser-compat-data/types'

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

const Body = styled('div', {
  marginTop: '2rem',
})

const DocBody: React.VFC<Props> = ({ bcd, breadcrumbs, compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <main>
      <Title breadcrumbs={breadcrumbs} title={meta.title} />
      <Body>
        <DocumentBody>
          <Content bcd={bcd} components={DOCS_MDX_COMPONENTS} />
        </DocumentBody>
      </Body>
      <Footer mdnSlug={meta.slug} updated={new Date(meta.updated)} />
    </main>
  )
}

export default DocBody
