import type { BrowserName, Identifier } from '@mdn/browser-compat-data'

import CompatRow from './CompatRow'
import { getSubIdentifierKeys } from './utils'

type Props = {
  bcd: { data: Identifier; key: string }
  className?: string
  desktopBrowsers: [BrowserName, string][]
  mobileBrowsers: [BrowserName, string][]
}

const CompatTable: React.FC<Props> = ({ bcd, desktopBrowsers, mobileBrowsers, ...props }) => {
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
          <th rowSpan={desktopBrowsers.length} />
          <th className="sep" colSpan={3} rowSpan={2}>
            데스크톱
          </th>
          <th colSpan={mobileBrowsers.length}>모바일</th>
        </tr>
        <tr>
          <th colSpan={2}>iOS</th>
          <th colSpan={4}>Android</th>
        </tr>
        <tr>
          {desktopBrowsers.map(([key, name], index) => (
            <th key={key} className={desktopBrowsers.length === index + 1 ? 'sep' : undefined}>
              {name}
            </th>
          ))}
          {mobileBrowsers.map(([key, name]) => (
            <th key={key}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <CompatRow bcd={bcd} desktopBrowsers={desktopBrowsers} mobileBrowsers={mobileBrowsers} />
        {getSubIdentifierKeys(bcd.data)
          .filter((key) => Boolean(bcd.data[key]))
          .map((key) => (
            <CompatRow
              key={key}
              bcd={{ data: bcd.data[key], key }}
              desktopBrowsers={desktopBrowsers}
              mobileBrowsers={mobileBrowsers}
              recurse
            />
          ))}
      </tbody>
    </table>
  )
}

export default CompatTable
