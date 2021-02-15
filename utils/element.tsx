import React, { isValidElement } from 'react'

/**
 * Similar to `Node#textContent`, Returns the given `ReactNode`'s children as a text content.
 *
 * As it doesn't really render the node, it can't return non-`children` props and hardcoded texts within custom components.
 *
 * @example
 * const e = <h1>Foo <span>Bar</span></h1>
 * getTextContent(e) // 'Foo Bar'
 *
 * const Foo: React.FC = ({ children }) => <span>Foo {children}</span>
 * const x = <Foo>Bar</Foo>
 * getTextContent(x) // 'Bar', can't get hardcoded text 'Foo'
 */
export function childrenToText(node: React.ReactNode): string {
  // why no generic type inference duh
  return React.Children.toArray(node).reduce<string>((acc, cur) => {
    if (typeof cur === 'string' || typeof cur === 'number') {
      return acc + String(cur)
    }

    if (isValidElement(cur)) {
      return acc + childrenToText(cur.props.children)
    }

    // skip Array.isArray()

    /* istanbul ignore next */
    return acc
    // remove from coverage as Children.toArray() filters invalid things
  }, '')
}

/**
 * Sanitize a string to be used with `id` attribute.
 */
export function sanitizeID(text: string): string {
  return text
    .trim()
    .replace(/[\s\n]+/g, '-')
    .replace(/[!@#$%^&*()=+~`'"/\\?.,<>[\]|{}]/g, '')
}
