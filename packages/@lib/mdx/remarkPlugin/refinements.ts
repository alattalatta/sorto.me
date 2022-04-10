import type { BlockContent, DefinitionContent, List, Paragraph, PhrasingContent, Text } from 'mdast'

const isNodeList = (node: BlockContent | DefinitionContent): node is List => node.type === 'list'
const isNodeParagraph = (node: BlockContent | DefinitionContent): node is Paragraph => node.type === 'paragraph'
const isNodeText = (node: PhrasingContent): node is Text => node.type === 'text'

export { isNodeList, isNodeParagraph, isNodeText }
