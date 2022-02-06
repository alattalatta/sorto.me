import { compile as compileMDX } from '@mdx-js/mdx'
import rehypeHighlight from 'rehype-highlight'
import type { Plugin } from 'unified'
import { remove } from 'unist-util-remove'

async function compile(source: string): Promise<string> {
  const compiled = await compileMDX(source, {
    outputFormat: 'function-body',
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [removeImportsExportsPlugin],
  })

  return String(compiled)
}

export { compile }

function removeImportsExportsPlugin(): Plugin {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (tree) => remove(tree, 'mdxjsEsm')
}
