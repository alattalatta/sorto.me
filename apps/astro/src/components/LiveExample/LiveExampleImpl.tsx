import styles from './LiveExampleImpl.module.scss'
import LiveCode from '../LiveCode'
import { useCodeBlockGroup } from '../useCodeBlockGroup'

export type LiveExampleImplProps = {
  height?: number
  light?: boolean
  name: string
}

const LiveExampleImpl: React.FC<LiveExampleImplProps> = ({ height = 240, light, name }) => {
  const codes = useCodeBlockGroup(name)

  return (
    <figure className={styles.root}>
      <figcaption className="no-screen">실행 결과</figcaption>
      <div className={styles.wrap} style={{ height: `${height / 16}rem` }}>
        <LiveCode codes={codes} height={height} light={light} />
      </div>
    </figure>
  )
}

export default LiveExampleImpl
