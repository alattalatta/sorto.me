import { compile as compileMDX } from '@mdx-js/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { rehypeCodeblockDataAttr } from './rehypeCodeblockDataAttr'
import { rehypeDefinitionList } from './rehypeDefinitionList'

async function compile(source: string): Promise<string> {
  const compiled = await compileMDX(source, {
    outputFormat: 'function-body',
    rehypePlugins: [
      rehypeHighlight,
      rehypeCodeblockDataAttr,
      rehypeSlug,
      () =>
        rehypeAutolinkHeadings({
          behavior: 'wrap',
        }),
    ],
    remarkPlugins: [remarkGfm, rehypeDefinitionList],
  })

  return String(compiled)
}

export { compile }
