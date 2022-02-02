import React from 'react'

import { styled } from 'utils/styler'

const Root = styled('figure', {
  border: '1px solid',
  borderRadius: '$cornerRadius',
  marginTop: 24,
  marginBottom: 24,
  overflow: 'hidden',
  variants: {
    color: {
      note: {
        backgroundColor: '$base100',
        borderColor: '#B6D5F5',
      },
      warn: {
        backgroundColor: '#fffce8',
        borderColor: '#E5DB97',
      },
      alert: {
        backgroundColor: '#ffeded',
        borderColor: '#de9797',
      },
    },
  },
  defaultVariants: {
    color: 'note',
  },
})

const Caption = styled('figcaption', {
  borderLeft: '8px solid',
  color: '$base40',
  fontSize: 16,
  fontWeight: 700,
  padding: '4px 16px',
  variants: {
    color: {
      note: {
        borderLeftColor: '$accentB',
      },
      warn: {
        borderLeftColor: '$accentY',
      },
      alert: {
        borderLeftColor: '$accentR',
        color: '$accentR',
      },
    },
  },
  defaultVariants: {
    color: 'note',
  },
})

const Body = styled('p', {
  padding: '12px 24px 16px',
  '& > :where(p, ol, ul) + :where(p, ol, ul)': {
    marginTop: 16,
  },
})

const CalloutRoot: React.FC<{ childAs?: 'div' | 'p'; color?: 'warn' | 'alert'; label: React.ReactNode }> = ({
  childAs = 'p',
  children,
  color,
  label,
}) => {
  return (
    <Root color={color}>
      <Caption color={color}>{label}</Caption>
      <Body as={childAs}>{children}</Body>
    </Root>
  )
}

export default CalloutRoot
