import dynamic from 'next/dynamic'

import { LiveCodeProps } from '../LiveCode'
import styles from './styles.module.scss'

const LiveCode = dynamic(() => import('../LiveCode'))

const LiveExample: React.VFC<LiveCodeProps> = ({ height = 240, name, title = '예제' }) => {
  return (
    <figure className={styles.root}>
      <figcaption className={styles.caption}>실행 결과</figcaption>
      <div className={styles.container} style={{ height: `${height}px` }}>
        <div className={styles.resultWrap}>
          <LiveCode height={height} name={name} title={title} />
        </div>
      </div>
    </figure>
  )
}

export default LiveExample
