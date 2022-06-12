import type { BrowserName, Identifier, SupportStatement } from '@mdn/browser-compat-data/types'
import { resolve } from 'k-popo'
import { Fragment, useState } from 'react'

import { getSubIdentifierKeys, supportLabel, mapOver } from '../../utils'
import { NonStandard } from '../StatusIcon'
import CompatCell from './CompatCell'
import * as styles from './CompatRow.css'
import SpecStatusIcons from './SpecStatusIcons'

type Props = {
  data: Identifier
  name: string
  recurse?: boolean
}

const DESKTOP_KEYS: [BrowserName, string][] = [
  ['ie', 'IE'],
  ['edge', 'Edge'],
  ['chrome', 'Chrome'],
  ['safari', 'Safari'],
  ['firefox', 'Firefox'],
]
const MOBILE_KEYS: [BrowserName, string][] = [
  ['safari_ios', 'iOS\nSafari'],
  ['webview_android', 'Android\nWebView'],
  ['chrome_android', 'Android\nChrome'],
  ['firefox_android', 'Android\nFirefox'],
  ['samsunginternet_android', 'Samsung\nInternet'],
]

const CompatRow: React.FC<Props> = ({ data, name, recurse }) => {
  const [supportDetail, setSupportDetail] = useState<[BrowserName, SupportStatement] | null>(null)

  const compat = data.__compat
  if (!compat) {
    return null
  }

  const toggleSupportDetail = (browserName: BrowserName, value: SupportStatement): void => {
    if (supportDetail && supportDetail[0] === browserName && supportDetail[1] === value) {
      setSupportDetail(null)
    } else {
      setSupportDetail([browserName, value])
    }
  }

  const children = recurse
    ? getSubIdentifierKeys(data).map((key) => <CompatRow key={key} data={data[key]} name={key} recurse={true} />)
    : null

  const supportDetailBrowserDisplayName =
    supportDetail?.[0] &&
    (DESKTOP_KEYS.find(([key]) => key === supportDetail[0])?.[1] ??
      MOBILE_KEYS.find(([key]) => key === supportDetail[0])?.[1])

  const Root = recurse ? 'details' : 'div'

  return (
    <Root className={styles.root}>
      {recurse && (
        <summary className={styles.summary}>
          {compat.description ? <span dangerouslySetInnerHTML={{ __html: compat.description }} /> : <code>{name}</code>}
          <SpecStatusIcons status={compat.status} />
        </summary>
      )}
      <div className={styles.body}>
        <div className={styles.tableContainer}>
          <table className={`${styles.table} jsx`}>
            <thead>
              <tr>
                {DESKTOP_KEYS.map(([key, display]) => (
                  <th key={key} className={styles.browserName}>
                    {display}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {DESKTOP_KEYS.map(([key]) => (
                  <CompatCell key={key} browserName={key} data={compat.support[key]} onClick={toggleSupportDetail} />
                ))}
              </tr>
            </tbody>
          </table>
          <table className={`${styles.table} jsx`}>
            <thead>
              <tr>
                {MOBILE_KEYS.map(([key, display]) => (
                  <th key={key} className={styles.browserName}>
                    {display}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {MOBILE_KEYS.map(([key]) => (
                  <CompatCell key={key} browserName={key} data={compat.support[key]} onClick={toggleSupportDetail} />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {supportDetail && (
          <dl>
            {mapOver(supportDetail[1], (support, index) => (
              <Fragment key={index}>
                <dt>
                  {supportDetailBrowserDisplayName} {supportLabel(support)}
                </dt>
                {support.flags &&
                  mapOver(support.flags, (flag) => (
                    <dd>
                      <p>
                        <code>{flag.name}</code> 플래그를{' '}
                        {flag.value_to_set && (
                          <>
                            <code>{flag.value_to_set}</code>
                            {resolve('(으)로', flag.value_to_set)?.[1]}
                          </>
                        )}{' '}
                        설정해야 합니다.
                      </p>
                    </dd>
                  ))}
                {support.alternative_name && (
                  <dd>
                    <NonStandard /> 다른 이름 사용: <code>{support.alternative_name}</code>
                  </dd>
                )}
                {support.prefix && (
                  <dd>
                    <NonStandard /> 공급자 프리픽스 필요: <code>{support.prefix}</code>
                  </dd>
                )}
                {mapOver(support.notes, (note, subindex) => (
                  <dd key={subindex}>
                    <p dangerouslySetInnerHTML={{ __html: note || '특이사항 없음.' }} />
                  </dd>
                ))}
              </Fragment>
            ))}
          </dl>
        )}
        {children && <div className={styles.childrenWrap}>{children}</div>}
      </div>
    </Root>
  )
}

export default CompatRow
