import path from 'path'

import { filePath } from '@lib/functions/server'
import * as O from 'fp-ts/lib/Option'
import { identity, pipe } from 'fp-ts/lib/function'
import sizeOf from 'image-size'
import type { Image } from 'mdast'

const __dirname = filePath(import.meta.url)
const projectRoot = path.resolve(__dirname, '../../../..')

const publicPath = (subpath: string): string => path.join(projectRoot, 'apps/main/public', subpath)

function imageCustomSize(image: Image): void {
  const data = image.data || (image.data = {})

  const intrinsicSize = pipe(
    // only for relative images
    /^(https?:)?\/\//.test(image.url) ? O.none : O.some(image.url),
    O.map(publicPath),
    O.map((url) => sizeOf(url)),
    O.chain(({ width, height }) =>
      !width || !height ? O.none : O.some({ width, height, aspectRatio: width / height }),
    ),
    O.fold(() => null, identity),
  )

  const [alt, widthSpecified /*, height */] = image.alt?.split(';') || ''
  image.alt = alt

  const width = Number(widthSpecified) || intrinsicSize?.width
  const height = width && intrinsicSize ? Math.round(width / intrinsicSize.aspectRatio) : undefined

  data.hProperties = {
    ...(data.hProperties as object),
    width,
    height,
  }
}

export { imageCustomSize }
