import type { StatusBlock } from '@mdn/browser-compat-data/types'
import React from 'react'

import { styled } from 'utils/styler'

import { StatusIcon } from '../StatusIcon'

const StatusIconsWrap = styled('span', {
  minWidth: 1,
  minHeight: 1,
})

const SpecStatusIcons: React.VFC<{ status: StatusBlock | undefined }> = ({ status }) => {
  if (!status) {
    return <StatusIconsWrap />
  }

  return (
    <StatusIconsWrap>
      {!status.standard_track && <StatusIcon status="nonStandard" />}
      {status.deprecated && <StatusIcon status="deprecated" />}
      {status.experimental && <StatusIcon status="experimental" />}
    </StatusIconsWrap>
  )
}

export default SpecStatusIcons
