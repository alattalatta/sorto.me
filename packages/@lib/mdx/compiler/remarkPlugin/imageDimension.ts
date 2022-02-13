import type { Image } from 'mdast'

function imageDimension(image: Image): void {
  const [alt, width, height] = image.alt?.split(';') || ''

  image.alt = alt
  const data = image.data || (image.data = {})

  data.hProperties = {
    ...((image.data?.hProperties as object) || {}),
    width,
    height,
  }
}

export { imageDimension }
