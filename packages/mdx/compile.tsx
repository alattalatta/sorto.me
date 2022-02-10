import { compile as compileMDX } from '@mdx-js/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { rehypeCodeblockDataAttr } from './rehypeCodeblockDataAttr'
import { rehypeTermID } from './rehypeTermID'
import { remarkCallout } from './remarkCallout'
import { remarkDefinitionList } from './remarkDefinitionList'

async function compile(source: string): Promise<string> {
  const compiled = await compileMDX(source, {
    outputFormat: 'function-body',
    rehypePlugins: [
      rehypeHighlight,
      rehypeCodeblockDataAttr,
      rehypeSlug,
      rehypeTermID,
      () =>
        rehypeAutolinkHeadings({
          behavior: 'wrap',
        }),
    ],
    remarkPlugins: [remarkGfm, remarkCallout, remarkDefinitionList],
  })

  return String(compiled)
}

export { compile }
