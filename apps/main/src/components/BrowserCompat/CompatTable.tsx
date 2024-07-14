import type { BrowserName, Identifier } from '@mdn/browser-compat-data'

import CompatRow from './CompatRow'
import { getSubIdentifierKeys } from './utils'

type Props = {
  bcd: { data: Identifier; key: string }
  browsers: [BrowserName, string][]
  className?: string
}

const CompatTable: React.FC<Props> = ({ bcd, browsers, ...props }) => {
  return (
    <table {...props}>
      <caption style={{ textAlign: 'left' }}>
        MDN{' '}
        <a href="https://github.com/mdn/browser-compat-data">
          <code>browser-compat-data</code>
        </a>
      </caption>
      <thead>
        <tr>
          <th />
          {browsers.map(([key, name]) => (
            <th key={key}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <CompatRow bcd={bcd} browsers={browsers} />
        {getSubIdentifierKeys(bcd.data)
          .filter((key) => Boolean(bcd.data[key]))
          .map((key) => (
            <CompatRow key={key} bcd={{ data: bcd.data[key], key }} browsers={browsers} recurse />
          ))}
      </tbody>
    </table>
  )
}

export default CompatTable
