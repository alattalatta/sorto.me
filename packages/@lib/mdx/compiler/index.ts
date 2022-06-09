/// <reference types="../mdast" />
/// <reference types="../unist-util-visit" />

import rehypeHighlight from '@mapbox/rehype-prism'
import { compile as compileMDX } from '@mdx-js/mdx'
import type { DefinitionList, Notebox, Term, TermDescription } from 'mdast'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { all } from 'remark-rehype'

import { remarkPlugin } from '../remarkPlugin'
import { rehypeCodeblockDataAttr } from './rehypeCodeblockDataAttr'
import { rehypeWrapTable } from './rehypeWrapTable'
import { remarkDefinitionList } from './remarkDefinitionList'

async function compile(source: string): Promise<string> {
  const compiled = await compileMDX(source, {
    outputFormat: 'function-body',
    rehypePlugins: [
      rehypeHighlight,
      rehypeCodeblockDataAttr,
      rehypeWrapTable,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
    remarkPlugins: [remarkGfm, remarkDefinitionList, remarkPlugin],
    remarkRehypeOptions: {
      handlers: {
        definitionList: (h, node: DefinitionList) => h(node, 'dl', all(h, node)),
        notebox: (h, node: Notebox) => h(node, 'div', { className: `notebox notebox-${node.severity}` }, all(h, node)),
        term: (h, node: Term) => h(node, 'dt', all(h, node)),
        termDescription: (h, node: TermDescription) => h(node, 'dd', all(h, node)),
      },
    },
  })

  return compiled.toString()
}

export { compile }
