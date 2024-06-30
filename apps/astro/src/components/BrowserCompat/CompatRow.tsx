import type { BrowserName, Identifier, SupportStatement } from '@mdn/browser-compat-data'
import { resolve } from 'k-popo'
import { Fragment, useEffect, useRef, useState } from 'react'

import CompatCells, { mapOver } from './CompatCells'
import styles from './CompatRow.module.scss'
import SpecStatusIcons from './SpecStatusIcons'
import { NonStandard } from './StatusIcon'
import { getSubIdentifierKeys, supportLabel } from './utils'

type Props = {
  bcd: { data: Identifier; key: string }
  browsers: [BrowserName, string][]
  depth?: number
  recurse?: boolean
}

const CompatRow: React.FC<Props> = ({ bcd: { data: bcd, key }, browsers, depth = 0, recurse }) => {
  const $row = useRef<HTMLTableRowElement | null>(null)
  const $supDetail = useRef<HTMLTableRowElement | null>(null)

  const [supportDetail, setSupportDetailImpl] = useState<readonly [browser: string, support: SupportStatement] | null>(
    null,
  )
  const supportDetailOpen = !!supportDetail
  const setSupportDetail = (browser: BrowserName, support: SupportStatement) => {
    if (supportDetail && browser === supportDetail[0]) {
      return setSupportDetailImpl(null)
    }

    setSupportDetailImpl([browser, support])
  }

  const compat = bcd.__compat

  useEffect(() => {
    if (!supportDetailOpen) {
      return
    }

    const listener = (e: MouseEvent) => {
      if ($row.current && $supDetail.current) {
        const target = e.target as HTMLElement

        if (!$row.current.contains(target) && !$supDetail.current.contains(target)) {
          setSupportDetailImpl(null)
        }
      }
    }
    window.addEventListener('click', listener)

    return () => window.removeEventListener('click', listener)
  }, [supportDetailOpen])

  return (
    <>
      {compat && (
        <tr ref={$row} data-depth={depth}>
          <th>
            {compat?.description ? (
              <span dangerouslySetInnerHTML={{ __html: compat.description }} />
            ) : (
              <code>{key}</code>
            )}
            <SpecStatusIcons status={compat.status} />
          </th>
          <CompatCells browsers={browsers} supportsMap={compat.support} onClick={setSupportDetail} />
        </tr>
      )}
      {supportDetailOpen && (
        <tr ref={$supDetail}>
          {/* browsers + feature name */}
          <td className={styles.supportDetail} colSpan={browsers.length + 1}>
            <dl>
              {mapOver(supportDetail[1], (support, index) => (
                <Fragment key={index}>
                  <dt>{supportLabel(support)}</dt>
                  {support.flags &&
                    mapOver(support.flags, (flag) => (
                      <dd key={flag.name}>
                        <code>{flag.name}</code> 플래그를{' '}
                        {flag.value_to_set && (
                          <>
                            <code>{flag.value_to_set}</code>
                            {resolve('(으)로', flag.value_to_set)?.[1]}
                          </>
                        )}{' '}
                        설정해야 합니다.
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
                  {!support.flags &&
                    !support.alternative_name &&
                    !support.prefix &&
                    mapOver(support.notes, (note, subindex) => (
                      <dd dangerouslySetInnerHTML={{ __html: note || '특이사항 없음.' }} key={subindex} />
                    ))}
                </Fragment>
              ))}
            </dl>
          </td>
        </tr>
      )}
      {recurse
        ? getSubIdentifierKeys(bcd).map((childKey) => (
            <CompatRow
              key={childKey}
              bcd={{ data: bcd[childKey], key: childKey }}
              browsers={browsers}
              depth={depth + 1}
              recurse={true}
            />
          ))
        : null}
    </>
  )
}

export default CompatRow
