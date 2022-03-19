import { Anchor } from '@lib/ui'
import type { Identifier } from '@mdn/browser-compat-data/types'

import { getSubIdentifierKeys } from '../../utils'
import CompatRow from './CompatRow'
import * as styles from './index.css'

type Props = {
  children?: string
  data?: { data: Identifier; name: string } | null
}

const BrowserCompat: React.VFC<Props> = ({ children, data: dataProp }) => {
  /*
  [note] memo later
  const [loadedData, setLoadedData] = useState<Identifier | undefined | null>(undefined)

  useEffect(() => {
    if (children) {
      void (async () => {
        const bcd = (await import('@mdn/browser-compat-data')) as unknown as CompatData
        setLoadedData(getCompatData(bcd, children))
      })()
    }
  }, [children])
  */

  const data = dataProp?.data
  const name = (() => {
    if (dataProp?.name) {
      return dataProp.name
    }

    if (!children) {
      throw new Error('BrowserCompat needs data name.')
    }

    const keys = children.split('.')
    return keys[keys.length - 1]
  })()

  if (data === undefined) {
    return null
  }

  if (data === null) {
    return (
      <p>
        <code>{children}</code>의 호환성 데이터를 찾을 수 없습니다.
      </p>
    )
  }

  return (
    <figure>
      <CompatRow data={data} name={name} />
      {getSubIdentifierKeys(data).map((key) => (
        <CompatRow key={key} data={data[key]} name={key} recurse={true} />
      ))}
      <figcaption className={styles.caption}>
        MDN <Anchor href="https://github.com/mdn/browser-compat-data">BCD</Anchor>에서 가져오는 데이터입니다.
      </figcaption>
    </figure>
  )
}

export default BrowserCompat
