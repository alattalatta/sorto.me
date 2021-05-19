import { SimpleSupportStatement, SupportStatement } from '@mdn/browser-compat-data/types'
import React from 'react'

import { NoScreen } from 'components/basics'
import { determineStatus, supportLabel } from 'utils/docs/browserCompat'
import { styled } from 'utils/styler'

const CompatCellBody = styled('div', {
  width: 90,
  height: 45,
  border: `1px solid`,
  borderColor: '$base70',
  flexShrink: 0,
  position: 'relative',
  variants: {
    opened: {
      yes: {
        '&::before': {
          content: "''",
          borderRight: '13px solid transparent',
          borderBottom: '9px solid',
          borderBottomColor: '$base70',
          borderLeft: '13px solid transparent',
          marginRight: 'auto',
          marginLeft: 'auto',
          position: 'absolute',
          bottom: -1,
          left: 5,
        },
        '&::after': {
          content: "''",
          borderRight: '12px solid transparent',
          borderBottom: '8px solid',
          borderBottomColor: '$base100',
          borderLeft: '12px solid transparent',
          marginRight: 'auto',
          marginLeft: 'auto',
          position: 'absolute',
          bottom: -1,
          left: 6,
        },
      },
    },
    support: {
      yes: { backgroundColor: '#ebf8e1' },
      no: { backgroundColor: '#ffbdbd' },
      partial: { backgroundColor: '#ffe2ae' },
      unknown: { backgroundColor: '#ddd' },
    },
    type: {
      standalone: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
})

type Props = {
  as?: React.ElementType
  data: SupportStatement | undefined
  opened?: boolean
  onClick?: (data: SupportStatement) => void
}

const CompatCell: React.VFC<Props & Pick<React.ComponentPropsWithoutRef<typeof CompatCellBody>, 'support' | 'type'>> =
  ({ as = 'div', data, opened, onClick, ...props }) => {
    const clickable = data && (Array.isArray(data) || data.notes) && onClick
    const label = `${supportLabel(data)}${clickable ? '*' : ''}`

    const handleClick = (): void => {
      if (!clickable) {
        return
      }

      onClick?.(data as SupportStatement)
    }

    const head = Array.isArray(data) ? data[0] : data

    return (
      <CompatCellBody
        {...props}
        // can't infer properly
        as={as as keyof JSX.IntrinsicElements}
        css={{ cursor: clickable ? 'pointer' : 'normal' }}
        opened={opened ? 'yes' : undefined}
        support={variantOf(head)}
        onClick={handleClick}
      >
        {label}
        {clickable && (
          <NoScreen as="button" type="button" onClick={handleClick} aria-expanded={opened}>
            {opened ? '호환성 상세정보 닫기' : '호환성 상세정보 열기'}
          </NoScreen>
        )}
      </CompatCellBody>
    )
  }

export default CompatCell

function variantOf(statement: SimpleSupportStatement | undefined): 'yes' | 'no' | 'partial' | 'unknown' {
  if (!statement) {
    return 'unknown'
  }

  const status = determineStatus(statement)

  switch (status) {
    case 'removed':
    case 'no':
      return 'no'
    case 'unknown':
      return 'unknown'
    case 'added':
    case 'yes':
      return statement.partial_implementation ? 'partial' : 'yes'
  }
}
