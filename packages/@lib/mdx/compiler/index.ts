import { minify } from '@swc/core'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { all } from 'remark-rehype'

import { compile as compileMDX } from './lib/compile'
import { rehypeCodeblockDataAttr } from './rehypeCodeblockDataAttr'
import { remarkDefinitionList } from './remarkDefinitionList'
import { remarkPlugin } from './remarkPlugin'

async function compile(source: string): Promise<string> {
  const compiled = await compileMDX(source, {
    outputFormat: 'function-body',
    rehypePlugins: [rehypeHighlight, rehypeCodeblockDataAttr, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    remarkPlugins: [remarkGfm, remarkDefinitionList, remarkPlugin],
    remarkRehypeOptions: {
      handlers: {
        definitionList: (h, node) => h(node, 'dl', all(h, node)),
        notebox: (h, node) => h(node, 'div', { className: `notebox notebox-${node.severity}` }, all(h, node)),
        term: (h, node) => h(node, 'dt', all(h, node)),
        termDescription: (h, node) => h(node, 'dd', all(h, node)),
      },
    },
  })

  // can't minify it directly since it's a function body without its function declaration, which is syntax error
  //   wrap it in a function declaration so that swc can minify it
  return String((await minify(`(()=>{${compiled}})()`, { compress: true, mangle: true })).code.slice(6, -4))
}

export { compile }
