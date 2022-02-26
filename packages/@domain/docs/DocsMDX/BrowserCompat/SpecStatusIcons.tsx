import { styled } from '@lib/ui'
import type { StatusBlock } from '@mdn/browser-compat-data/types'

import { Deprecated, Experimental, NonStandard } from '../StatusIcon'

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
      {!status.standard_track && <NonStandard />}
      {status.deprecated && <Deprecated />}
      {status.experimental && <Experimental />}
    </StatusIconsWrap>
  )
}

export default SpecStatusIcons
