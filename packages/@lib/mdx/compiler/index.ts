import { compile as compileMDX } from '@mdx-js/mdx'
import { minify } from '@swc/core'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { rehypeCodeblockDataAttr } from './rehypeCodeblockDataAttr'
import { rehypeTermID } from './rehypeTermID'
import { remarkCallout } from './remarkCallout'
import { remarkDefinitionList } from './remarkDefinitionList'
import { remarkHeadingLevel } from './remarkHeadingLevel'
import { remarkImageDimensions } from './remarkImageDimensions'

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
    remarkPlugins: [remarkGfm, remarkCallout, remarkDefinitionList, remarkHeadingLevel, remarkImageDimensions],
  })

  return String((await minify(`(()=>{${compiled}})()`, { compress: true, mangle: true })).code.slice(6, -4))
}

export { compile }
