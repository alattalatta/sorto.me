import * as noScreen from '@lib/ui/noScreen.css'

import { useCodeBlockGroup } from '../useCodeBlockGroup'
import LiveCode from './LiveCode'
import * as styles from './LiveExample.css'

type Props = {
  height?: number
  name: string
}

const LiveExample: React.VFC<Props> = ({ height = 240, name }) => {
  const codes = useCodeBlockGroup(name)

  return (
    <figure>
      <figcaption className={noScreen.root}>실행 결과</figcaption>
      <div className={styles.root} style={{ height: `${height}px` }}>
        <LiveCode codes={codes} height={height} />
      </div>
    </figure>
  )
}

export default LiveExample
