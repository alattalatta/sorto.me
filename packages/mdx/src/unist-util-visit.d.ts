declare module 'unist-util-visit' {
  import type { Parent, Node } from 'unist'

  type Visitor<T extends Node, U extends Parent> = (node: T, index: number, parent: U) => void

  function visit<R extends Parent, T extends Node, U extends Parent>(root: R, visitor: Visitor<T, U>): void
  function visit<R extends Parent, T extends Node, U extends Parent>(
    root: R,
    type: string,
    visitor: Visitor<T, U>,
  ): void

  export { visit }
}
