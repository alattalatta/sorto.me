import * as noScreen from '@lib/ui/noScreen.css'

import { useCodeBlockGroup } from '../useCodeBlockGroup'
import LiveCode from './LiveCode'
import * as styles from './LiveExample.css'

type Props = {
  height?: number
  light?: boolean
  name: string
}

const LiveExample: React.FC<Props> = ({ height = 240, light, name }) => {
  const codes = useCodeBlockGroup(name)

  return (
    <figure className={styles.root}>
      <figcaption className={noScreen.root}>실행 결과</figcaption>
      <div className={styles.wrap} style={{ height: `${height / 16}rem` }}>
        <LiveCode codes={codes} height={height} light={light} />
      </div>
    </figure>
  )
}

export default LiveExample
