/* Copied from @mdx-js/core.js */

import type { ProcessorOptions as ProcessorOptions_ } from '@mdx-js/mdx'
import { nodeTypes } from '@mdx-js/mdx'
import { recmaDocument } from '@mdx-js/mdx/lib/plugin/recma-document'
import { recmaJsxBuild } from '@mdx-js/mdx/lib/plugin/recma-jsx-build'
import { recmaJsxRewrite } from '@mdx-js/mdx/lib/plugin/recma-jsx-rewrite'
import { recmaStringify } from '@mdx-js/mdx/lib/plugin/recma-stringify'
import { rehypeRecma } from '@mdx-js/mdx/lib/plugin/rehype-recma'
import { rehypeRemoveRaw } from '@mdx-js/mdx/lib/plugin/rehype-remove-raw'
import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import type { Options as RemarkRehypeOptions } from 'remark-rehype'
import type { Processor } from 'unified'
import { unified } from 'unified'

const removedOptions = ['filepath', 'compilers', 'hastPlugins', 'mdPlugins', 'skipExport', 'wrapExport']

export type ProcessorOptions = ProcessorOptions_ & { remarkRehypeOptions?: RemarkRehypeOptions }

/**
 * Pipeline to:
 *
 * 1. Parse MDX (serialized markdown with embedded JSX, ESM, and  expressions)
 * 2. Transform through remark (mdast), rehype (hast), and recma (esast)
 * 3. Serialize as JavaScript
 */
export function createProcessor(options: ProcessorOptions = {}): Processor {
  const {
    development = process.env.NODE_ENV === 'development',
    jsx,
    format,
    outputFormat,
    providerImportSource,
    recmaPlugins,
    rehypePlugins,
    remarkPlugins,
    remarkRehypeOptions = {},
    SourceMapGenerator,
    ...rest
  } = options
  let index = -1

  while (++index < removedOptions.length) {
    const key = removedOptions[index]
    if (key in options) {
      throw new Error(
        '`options.' +
          key +
          '` is no longer supported. Please see <https://mdxjs.com/migrating/v2/> for more information',
      )
    }
  }

  // @ts-expect-error runtime exception for disallowed field here, which is
  // allowed in `compile`.
  if (format === 'detect') {
    throw new Error(
      "Incorrect `format: 'detect'`: `createProcessor` can support either `md` or `mdx`; it does not support detecting the format",
    )
  }

  const pipeline = unified().use(remarkParse)

  if (format !== 'md') {
    pipeline.use(remarkMdx)
  }

  pipeline
    .use(remarkMarkAndUnravel)
    .use(remarkPlugins || [])
    .use(remarkRehype, {
      ...remarkRehypeOptions,
      allowDangerousHtml: true,
      passThrough: [...(remarkRehypeOptions.passThrough || []), ...nodeTypes],
    })
    .use(rehypePlugins || [])

  if (format === 'md') {
    pipeline.use(rehypeRemoveRaw)
  }

  pipeline
    .use(rehypeRecma)
    .use(recmaDocument, { ...rest, outputFormat })
    .use(recmaJsxRewrite, { development, providerImportSource, outputFormat })

  if (!jsx) {
    pipeline.use(recmaJsxBuild, { outputFormat })
  }

  pipeline.use(recmaStringify, { SourceMapGenerator }).use(recmaPlugins || [])

  return pipeline
}
