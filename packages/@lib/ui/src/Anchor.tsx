import Link from 'next/link'
import { forwardRef } from 'react'

/**
 * Automatic anchor.
 *
 * Applies client routing when given an internal link (relative href) which contains no fragment (to prevent inaccurate scroll position).
 * Otherwise, uses simple `<a>` tag.
 */
const Anchor = forwardRef<HTMLAnchorElement, JSX.IntrinsicElements['a']>(({ children, href = '', ...props }, ref) => {
  // am I pointing to a specific fragment within this page?
  const fragmentOnly = href.startsWith('#')
  if (fragmentOnly) {
    return (
      <a ref={ref} href={href} {...props}>
        {children}
      </a>
    )
  }

  // am I pointing within the app?
  const internal = /^[./]/.test(href)
  if (internal) {
    const fragment = href.includes('#')
    // server: no url to resolve against
    // fragment: do not use <Link> for better scroll position
    if (typeof window === 'undefined' || fragment) {
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
    <a ref={ref} href={href} rel="noreferrer noopener" target="_blank" {...props}>
      {children}
    </a>
  )
})
Anchor.displayName = 'Anchor'

export { Anchor }
