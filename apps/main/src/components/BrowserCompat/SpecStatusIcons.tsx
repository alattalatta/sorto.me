import type { StatusBlock } from '@mdn/browser-compat-data'

import { Deprecated, Experimental, NonStandard } from './StatusIcon'

const SpecStatusIcons: React.FC<{ status: StatusBlock | undefined }> = ({ status }) => {
  if (!status) {
    return null
  }

  return (
    <span>
      {!status.standard_track && <NonStandard />}
      {status.deprecated && <Deprecated />}
      {status.experimental && <Experimental />}
    </span>
  )
}

export default SpecStatusIcons
