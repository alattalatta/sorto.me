import { styled } from '@lib/ui'
import type { BrowserNames, SimpleSupportStatement, SupportStatement } from '@mdn/browser-compat-data/types'

import { determineStatus, supportLabel } from '../../utils'
import { NonStandard } from '../StatusIcon'

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
      no: { backgroundColor: '#C75040', color: '$bg' },
      partial: { backgroundColor: '#FFCC47' },
      unknown: { backgroundColor: '#CCCCCC' },
    },
  },
})

type Props = {
  browserName: BrowserNames
  data: SupportStatement | undefined
  onClick?: (browserName: BrowserNames, notes: SupportStatement) => void
}

const CompatCell: React.VFC<Props> = ({ browserName, data, onClick }) => {
  const hasNotes = Boolean(data && (Array.isArray(data) || data.alternative_name || data.flags || data.notes))

  const head = Array.isArray(data) ? data[0] : data

  return (
    <CompatCellBody
      clickable={hasNotes}
      support={variantOf(head)}
      title={hasNotes ? '클릭해서 자세한 정보 확인' : undefined}
      onClick={() => hasNotes && onClick?.(browserName, data as SupportStatement)}
    >
      {supportLabel(data)}
      {hasNotes && '*'}
      {head?.alternative_name && <NonStandard title="비표준 이름을 사용합니다." />}
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
