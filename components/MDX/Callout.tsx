import React from 'react'

import { styled, BASE100, CORNER_RADIUS, ACCENT_B, BASE40, ACCENT_Y, ACCENT_R } from 'utils/styler'

import { AnchorExternal } from '../basics'
import { INLINE_CODE_STYLES } from './shared'

const CalloutContainer = styled('figure', {
  backgroundColor: BASE100,
  borderRadius: CORNER_RADIUS,
  margin: '32px 0',
  overflow: 'hidden',
  '& code': INLINE_CODE_STYLES,
  variants: {
    color: {
      warn: {
        backgroundColor: '#FFFCE8',
      },
      alert: {
        backgroundColor: '#FFEDED',
      },
    },
  },
})

const CalloutCaption = styled('figcaption', {
  borderLeft: `8px solid ${ACCENT_B}`,
  color: BASE40,
  fontWeight: 700,
  padding: '12px 24px 12px 16px',
  variants: {
    color: {
      warn: {
        borderLeftColor: ACCENT_Y,
      },
      alert: {
        backgroundColor: ACCENT_R,
        color: ACCENT_R,
      },
    },
  },
})

const CalloutBody = styled('div', {
  lineHeight: 1.65,
  margin: 0,
  padding: '12px 24px 24px',
  '& > p': {
    margin: 0,
  },
  '& > p + p': {
    marginTop: 16,
  },
})

const CalloutCiteWrap = styled('cite', {
  fontStyle: 'normal',
})

export const CalloutCite: React.VFC<{ children: string; href: string }> = ({ children, href }) => {
  return (
    <CalloutCiteWrap>
      <AnchorExternal href={href}>{children}</AnchorExternal>
    </CalloutCiteWrap>
  )
}

const Callout: React.FC<{ childAs?: React.ElementType; color?: 'warn' | 'alert'; label: React.ReactNode }> = ({
  childAs = 'p',
  children,
  color,
  label,
}) => (
  <CalloutContainer color={color}>
    <CalloutCaption color={color}>{label}</CalloutCaption>
    <CalloutBody as={childAs}>{children}</CalloutBody>
  </CalloutContainer>
)

export default Callout
