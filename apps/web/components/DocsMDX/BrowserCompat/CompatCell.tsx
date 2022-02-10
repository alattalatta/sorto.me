import type { SimpleSupportStatement, SupportStatement } from '@mdn/browser-compat-data/types'
import React from 'react'

import { determineStatus, supportLabel } from 'utils/docs/browserCompat'
import { styled } from 'utils/styler'

const CompatCellBody = styled('td', {
  width: 80,
  border: 'none',
  padding: '.25em 0',
  position: 'relative',
  textAlign: 'center',
  variants: {
    clickable: {
      true: {
        cursor: 'help',
      },
    },
    support: {
      yes: { backgroundColor: '#AFF677' },
      no: { backgroundColor: '#C75040', color: '#fff' },
      partial: { backgroundColor: '#FFCC47' },
      unknown: { backgroundColor: '#CCCCCC' },
    },
  },
})

type Props = {
  browserName: string
  data: SupportStatement | undefined
  onClick?: (browserName: string, notes: SupportStatement) => void
  opened?: boolean
}

const CompatCell: React.VFC<Props & Pick<React.ComponentPropsWithoutRef<typeof CompatCellBody>, 'support'>> = ({
  browserName,
  data,
  opened,
  onClick,
  ...props
}) => {
  const hasNotes = Boolean(data && (Array.isArray(data) || data.notes))
  const label = `${supportLabel(data)}${hasNotes ? '*' : ''}`

  const head = Array.isArray(data) ? data[0] : data

  return (
    <CompatCellBody
      {...props}
      clickable={hasNotes}
      support={variantOf(head)}
      title={hasNotes ? '클릭해서 자세한 정보 확인' : undefined}
      onClick={() => hasNotes && onClick?.(browserName, data)}
    >
      {label}
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
