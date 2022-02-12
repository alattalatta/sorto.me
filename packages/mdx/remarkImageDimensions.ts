import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const remarkImageDimensions: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, 'image', (image) => {
      const [alt, width, height] = image.alt?.split(';') || ''

      image.alt = alt
      const data = image.data || (image.data = {})

      data.hProperties = {
        ...((image.data?.hProperties as object) || {}),
        width,
        height,
      }
    })
  }
}

export { remarkImageDimensions }
