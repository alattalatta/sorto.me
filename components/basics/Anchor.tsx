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
 * Automatic anchor. Applies client routing when given an internal link (relative href). Otherwise, uses simple `<a>` tag.
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

    const internal = /^[./]/.test(href)

    if (internal && !process.browser) {
      // can't get absolute url to resolve against
      return <a ref={ref} href={href} {...props} />
    }

    if (internal) {
      const resolvedURL = new URL(href, location.href)
      return (
        <Link href={resolvedURL}>
          <a ref={ref} href={href} {...props}>
            {children}
          </a>
        </Link>
      )
    }

    return <AnchorExternal ref={ref} href={href} {...props} />
  },
)

export default Anchor
