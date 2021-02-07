import { CompatStatement, SimpleSupportStatement, SupportStatement } from '@mdn/browser-compat-data/types'
import { BrowserNames, Identifier } from '@mdn/browser-compat-data/types'
import { useEffect, useState } from 'react'

import { getCompatData } from 'utils/docs/browserCompat'

import Callout from './Callout'

const BROWSER_KEYS: BrowserNames[] = [
  'ie',
  'safari',
  'chrome',
  'edge',
  'firefox',
  'safari_ios',
  'webview_android',
  'chrome_android',
  'firefox_android',
]

const CompatCell: React.VFC<{ data: SupportStatement | undefined }> = ({ data }) => {
  if (!data) {
    return <td>?</td>
  }

  if (Array.isArray(data)) {
    const head = data[0]
    return <td>{label(head)}</td>
  }

  return <td>{label(data)}</td>

  function label(s: SimpleSupportStatement): string {
    if (!s.version_added) {
      return '미지원'
    }
    return s.version_added === true ? '지원' : s.version_added
  }
}

const CompatRow: React.VFC<{ data: CompatStatement | undefined; name: string }> = ({ data, name }) => {
  if (!data) {
    return null
  }

  return (
    <tr>
      {data.description ? (
        <td dangerouslySetInnerHTML={{ __html: data.description }} />
      ) : (
        <td>
          <code>{name}</code>
        </td>
      )}
      {BROWSER_KEYS.map((key) => (
        <CompatCell key={key} data={data.support[key]} />
      ))}
    </tr>
  )
}

const BrowserCompat: React.VFC<{ children: string }> = ({ children }) => {
  const [loadedData, setLoadedData] = useState<Identifier | undefined | null>(undefined)

  const keys = children.split('.')

  useEffect(() => {
    ;(async () => {
      setLoadedData(await getCompatData(keys))
    })()
  }, [keys])

  if (loadedData === undefined) {
    return null
  }

  if (loadedData === null) {
    return (
      <Callout color="alert" label="브라우저 호환성 데이터 없음">
        <code>{children}</code>의 호환성 데이터를 찾을 수 없습니다.
      </Callout>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <td />
          <td>Internet Explorer</td>
          <td>Safari</td>
          <td>Google Chrome</td>
          <td>Edge</td>
          <td>Firefox</td>
          <td>iOS Safari</td>
          <td>Android WebView</td>
          <td>Chrome</td>
          <td>Firefox</td>
        </tr>
      </thead>
      <tbody>
        <CompatRow data={loadedData.__compat} name={keys[keys.length - 1]} />
        {getSubKeys(loadedData).map((key) => (
          <CompatRow key={key} data={loadedData[key].__compat} name={key} />
        ))}
      </tbody>
    </table>
  )

  function getSubKeys(data: Identifier): string[] {
    return Object.keys(data).filter((key) => key !== '__compat')
  }
}

export default BrowserCompat
