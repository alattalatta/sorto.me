import Link from 'next/link'
import React, { forwardRef } from 'react'

import { styled } from 'utils/styler'

const DisabledAnchor = styled('a', {
  cursor: 'not-allowed',
  opacity: 0.6,
})

const AnchorExternal = forwardRef<HTMLAnchorElement, Omit<JSX.IntrinsicElements['a'], 'ref'>>((props, ref) => (
  <a ref={ref} {...props} target="_blank" rel="noreferrer noopener" />
))

type Props = {
  disabled?: boolean
} & Omit<JSX.IntrinsicElements['a'], 'ref'>
/**
 * Automatic anchor.
 *
 * Applies client routing when given an internal link (relative href) which contains no fragment (to prevent inaccurate scroll position).
 * Otherwise, uses simple `<a>` tag.
 */
const Anchor = forwardRef<HTMLAnchorElement, Props>(
  ({ children, disabled, href = '', ...props }, ref: React.Ref<HTMLAnchorElement>) => {
    if (disabled) {
      return (
        <DisabledAnchor ref={ref} title="사용 불가" aria-disabled={true} {...props}>
          {children}
        </DisabledAnchor>
      )
    }

    // am I pointing to a specific fragment within this page?
    const fragmentOnly = href.startsWith('#')
    if (fragmentOnly) {
      return (
        <a ref={ref} href={href} {...props}>
          {children}
        </a>
      )
    }

    // am I pointing within Sorto.me?
    const internal = /^[./]/.test(href)
    if (internal) {
      const fragment = href.includes('#')
      // server: no url to resolve against
      // fragment: do not use <Link> for better scroll position
      if (!process.browser || fragment) {
        return (
          <a ref={ref} href={href} {...props}>
            {children}
          </a>
        )
      }

      const resolvedURL = new URL(href, location.href)
      return (
        <Link href={resolvedURL}>
          <a ref={ref} href={href} {...props}>
            {children}
          </a>
        </Link>
      )
    }

    return (
      <AnchorExternal ref={ref} href={href} {...props}>
        {children}
      </AnchorExternal>
    )
  },
)

export default Anchor
