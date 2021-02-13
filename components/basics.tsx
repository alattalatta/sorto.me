import Link from 'next/link'
import React, { forwardRef } from 'react'

import { styled } from 'utils/styler'

export const CONTAINER_BORDER_BOX_WIDTH = 1240
export const CONTAINER_PADDING = 40
export const CONTAINER_CONTENT_BOX_WIDTH = CONTAINER_BORDER_BOX_WIDTH - CONTAINER_PADDING * 2

const AnchorExternal = forwardRef<HTMLAnchorElement, Omit<JSX.IntrinsicElements['a'], 'ref'>>((props, ref) => (
  <a ref={ref} {...props} target="_blank" rel="noreferrer noopener" />
))

/**
 * Automatic anchor. Applies client routing when given an internal link (relative href). Otherwise, uses simple `<a>` tag.
 */
export const Anchor = forwardRef<HTMLAnchorElement, Omit<JSX.IntrinsicElements['a'], 'ref'>>(
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

export const Container = styled('div', {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: CONTAINER_BORDER_BOX_WIDTH,
  paddingLeft: CONTAINER_PADDING,
  paddingRight: CONTAINER_PADDING,
  width: '100%',
})

export const NoScreen = styled('span', {
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: 1,
  margin: 0,
  padding: 0,
  position: 'absolute',
  width: 1,
  zIndex: -9,
})
