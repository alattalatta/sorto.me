import { SimpleSupportStatement, SupportStatement, VersionValue } from '@mdn/browser-compat-data/types'

import { styled } from 'utils/styler'

import { Cell, DOUBLE_BORDER } from './shared'

type SupportStatus = 'unknown' | 'yes' | 'no' | 'added' | 'removed'

const CompatCellBody = styled(Cell, {
  width: '9%',
  '&:nth-child(6)': {
    borderRight: DOUBLE_BORDER,
  },
  '&:nth-child(7)': {
    borderLeft: DOUBLE_BORDER,
  },
  variants: {
    support: {
      yes: { backgroundColor: '#ebf8e1' },
      no: { backgroundColor: '#ffbdbd' },
      partial: { backgroundColor: '#ffe2ae' },
      unknown: { backgroundColor: '#ddd' },
    },
  },
})

type Props = {
  data: SupportStatement | undefined
  onClick?: (data: SupportStatement) => void
}

const CompatCell: React.VFC<Props> = ({ data, onClick }) => {
  const clickable = data && (Array.isArray(data) || data.notes)
  const label = `${labelFrom(data)}${clickable ? '*' : ''}`

  const handleClick = (): void => {
    if (!clickable) {
      return
    }

    onClick?.(data as SupportStatement)
  }

  if (Array.isArray(data)) {
    const head = data[0]
    return (
      <CompatCellBody support={variantFrom(head)} onClick={handleClick}>
        {label}
      </CompatCellBody>
    )
  }

  return (
    <CompatCellBody support={variantFrom(data)} onClick={handleClick}>
      {label}
    </CompatCellBody>
  )
}

export default CompatCell

function labelFrom(statement: SupportStatement | undefined): string {
  if (!statement) {
    return '?'
  }

  const head = Array.isArray(statement) ? statement[0] : statement
  const status = determineStatus(head)

  switch (status) {
    case 'removed': {
      const versionAddedLabel = versionString(head.version_added)
      return `${versionAddedLabel} ~ ${head.version_removed}`
    }
    case 'unknown':
      return '?'
    case 'yes':
      return '지원'
    case 'no':
      return '미지원'
    case 'added':
      return versionString(head.version_added)
  }
}

function variantFrom(statement: SimpleSupportStatement | undefined): 'yes' | 'no' | 'partial' | 'unknown' {
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

function versionString(version: VersionValue): string {
  if (typeof version === 'string') {
    return version
  }

  return '?'
}

function determineStatus(statement: SimpleSupportStatement): SupportStatus {
  if (statement.version_removed) {
    return 'removed'
  }

  if (statement.version_added === null) {
    return 'unknown'
  }

  if (statement.version_added === true) {
    return 'yes'
  }

  if (!statement.version_added) {
    return 'no'
  }

  return 'added'
}
