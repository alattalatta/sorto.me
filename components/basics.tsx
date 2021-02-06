import { ACCENT_B, ACCENT_R, BASE100, css, styled } from 'utils/styler'
import { PropOf } from 'utils/types'

export const CONTAINER_BORDER_BOX_WIDTH = 1240
export const CONTAINER_PADDING = 40
export const CONTAINER_CONTENT_BOX_WIDTH = CONTAINER_BORDER_BOX_WIDTH - CONTAINER_PADDING * 2

const ANCHOR_HL_ANIMATION = css.keyframes({
  '0%': {
    opacity: 0.5,
    transform: 'scaleX(0.3)',
  },
  '30%': {
    opacity: 1,
  },
  '100%': {
    transform: 'scaleX(1)',
  },
})

const AnchorWrap = styled('a', {
  color: 'inherit',
  display: 'inline-block',
  position: 'relative',
  '&:hover::before': {
    animation: `${ANCHOR_HL_ANIMATION} 300ms cubic-bezier(0.22, 1, 0.36, 1)`,
    animationFillMode: 'forwards',
    backgroundColor: ACCENT_B,
    content: "''",
    position: 'absolute',
    top: -4,
    right: -2,
    bottom: -4,
    left: -2,
    transformOrigin: 'left',
  },
  '&:active': {
    color: BASE100,
    '&::before': {
      backgroundColor: ACCENT_R,
    },
  },
  '& span': {
    position: 'relative',
    zIndex: 1,
  },
})

export const Anchor: React.VFC<PropOf<typeof AnchorWrap>> = ({ children, ...props }) => (
  <AnchorWrap {...props}>
    <span>{children}</span>
  </AnchorWrap>
)

export const AnchorExternal: React.VFC<PropOf<typeof AnchorWrap>> = (props) => (
  <Anchor {...props} target="_blank" rel="noreferrer noopener" />
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
