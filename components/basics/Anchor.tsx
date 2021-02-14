import Link from 'next/link'
import React, { forwardRef } from 'react'

const AnchorExternal = forwardRef<HTMLAnchorElement, Omit<JSX.IntrinsicElements['a'], 'ref'>>((props, ref) => (
  <a ref={ref} {...props} target="_blank" rel="noreferrer noopener" />
))

/**
 * Automatic anchor. Applies client routing when given an internal link (relative href). Otherwise, uses simple `<a>` tag.
 */
const Anchor = forwardRef<HTMLAnchorElement, Omit<JSX.IntrinsicElements['a'], 'ref'>>(
  ({ href = '', ...props }, ref: React.Ref<HTMLAnchorElement>) => {
    const internal = /^[./]/.test(href)

    if (internal && !process.browser) {
      // can't get absolute url to resolve against
      return <a ref={ref} href={href} {...props} />
    }

    if (internal) {
      const resolvedURL = new URL(href, location.href)
      return (
        <Link href={resolvedURL}>
          <a ref={ref} href={href} {...props} />
        </Link>
      )
    }

    return <AnchorExternal ref={ref} href={href} {...props} />
  },
)

export default Anchor
