import Link from 'next/link'
import React, { forwardRef } from 'react'

import { ACCENT_R, BASE100, styled } from 'utils/styler'
import { PropOf } from 'utils/types'

export const CONTAINER_BORDER_BOX_WIDTH = 1240
export const CONTAINER_PADDING = 40
export const CONTAINER_CONTENT_BOX_WIDTH = CONTAINER_BORDER_BOX_WIDTH - CONTAINER_PADDING * 2

const AnchorWrap = styled('a', {
  color: 'inherit',
  display: 'inline-block',
  position: 'relative',
  '&:active': {
    color: BASE100,
    '&::before': {
      backgroundColor: ACCENT_R,
      content: "''",
      position: 'absolute',
      top: -4,
      right: -2,
      bottom: -4,
      left: -2,
    },
  },
  '& span': {
    position: 'relative',
    textDecorationLine: 'inherit',
    zIndex: 1,
  },
})

const AnchorWrapped = forwardRef<HTMLAnchorElement, PropOf<typeof AnchorWrap>>(({ children, ...props }, ref) => (
  <AnchorWrap ref={ref} {...props}>
    <span>{children}</span>
  </AnchorWrap>
))

const AnchorExternal = forwardRef<HTMLAnchorElement, PropOf<typeof Anchor>>((props, ref) => (
  <AnchorWrapped ref={ref} {...props} target="_blank" rel="noreferrer noopener" />
))

/**
 * Automatic anchor. Applies client routing when given an internal link (relative href). Otherwise, uses simple `<a>` tag.
 */
export const Anchor = forwardRef<HTMLAnchorElement, PropOf<typeof AnchorWrap>>(({ href = '', ...props }, ref) => {
  const internal = /^[./]/.test(href)

  if (internal && !process.browser) {
    // can't get absolute url to resolve against
    return <AnchorWrapped ref={ref} href={href} {...props} />
  }

  if (internal) {
    const resolvedURL = new URL(href, location.href)
    return (
      <Link href={resolvedURL}>
        <AnchorWrapped ref={ref} href={href} {...props} />
      </Link>
    )
  }

  return <AnchorExternal ref={ref} href={href} {...props} />
})

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
