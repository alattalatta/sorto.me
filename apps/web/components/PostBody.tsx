import type { PostMetadata } from '@contents/posts'
import { useMDXRenderer } from '@lib/mdx'
import { Anchor, DocumentBody, Footer, Post, ScrollBack, styled } from '@lib/ui'
import { m } from 'framer-motion'

import { easeStandard } from 'utils/styler'

type Props = {
  compiledSource: string
  meta: PostMetadata
}

const Root = styled('article', {
  maxWidth: `${768 / 16}rem`,
  margin: '0 auto',
})

const Body = styled(m.div, {
  marginTop: '1.5rem',
})

const ScrollBack768 = styled(ScrollBack, {
  maxWidth: `${768 / 16}rem`,
})

const PostBody: React.VFC<Props> = ({ compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)
  return (
    <Root>
      <Post as="header" image={meta.image} title={meta.title} written={new Date(meta.created)} />
      <Body
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.25,
          opacity: easeStandard(0.25),
          y: easeStandard(0.5),
        }}
      >
        <DocumentBody>
          <Content
            components={{
              a: Anchor,
            }}
          />
        </DocumentBody>
      </Body>
      <Footer updated={new Date(meta.updated)} />
      <ScrollBack768 />
    </Root>
  )
}

export default PostBody
