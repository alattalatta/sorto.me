import React from 'react'

import { styled } from 'utils/styler'

import { Anchor } from '../basics'
import { INLINE_CODE_STYLES } from './shared'

const CalloutContainer = styled('figure', {
  backgroundColor: '$base100',
  borderRadius: '$cornerRadius',
  marginTop: 24,
  marginBottom: 24,
  overflow: 'hidden',
  '& code': INLINE_CODE_STYLES,
  '& ul, & ol': {
    marginTop: 16,
  },
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
  borderLeft: '8px solid $accentB',
  color: '$base40',
  fontWeight: 700,
  padding: '12px 24px 12px 16px',
  variants: {
    color: {
      warn: {
        borderLeftColor: '$accentY',
      },
      alert: {
        borderLeftColor: '$accentR',
        color: '$accentR',
      },
    },
  },
})

const CalloutBody = styled('div', {
  lineHeight: 1.65,
  padding: '12px 24px 24px',
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
      <Anchor href={href}>{children}</Anchor>
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
