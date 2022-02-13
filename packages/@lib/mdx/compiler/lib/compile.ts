import type { VFile, VFileCompatible } from '@mdx-js/mdx/lib/compile'
import { resolveFileAndOptions } from '@mdx-js/mdx/lib/util/resolve-file-and-options'

import type { ProcessorOptions } from './core'
import { createProcessor } from './core'

export function compile(vfileCompatible: VFileCompatible, compileOptions: ProcessorOptions): Promise<VFile> {
  const { file, options } = resolveFileAndOptions(vfileCompatible, compileOptions)
  return createProcessor(options).process(file)
}
