import type { StatusBlock } from '@mdn/browser-compat-data/types'

import { Deprecated, Experimental, NonStandard } from '../StatusIcon'
import * as styles from './SpecStatusIcons.css'

const SpecStatusIcons: React.VFC<{ status: StatusBlock | undefined }> = ({ status }) => {
  if (!status) {
    return null
  }

  return (
    <span className={styles.minimal}>
      {!status.standard_track && <NonStandard />}
      {status.deprecated && <Deprecated />}
      {status.experimental && <Experimental />}
    </span>
  )
}

export default SpecStatusIcons
