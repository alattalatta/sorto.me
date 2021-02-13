import { BrowserNames, Identifier, SupportStatement } from '@mdn/browser-compat-data/types'
import React, { useState } from 'react'

import { mapOver } from 'utils/array'
import { getSubIdentifierKeys } from 'utils/docs/browserCompat'
import { styled } from 'utils/styler'

import CompatCell from './CompatCell'
import SpecStatusIcons from './SpecStatusIcons'
import { Cell, DOUBLE_BORDER } from './shared'

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

const Row = styled('tr', {
  '& td:nthChild(6)': DOUBLE_BORDER,
})

const RowHeaderCell = styled(Cell, {
  width: 180,
  height: 45,
  padding: 8,
})

const RowNameWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
})

const SupportDetail = styled('div', {
  maxWidth: 720,
  display: 'flex',
  alignItems: 'center',
  marginRight: 'auto',
  marginLeft: 'auto',
})

const SupportDetailDescriptions = styled('dd', {
  marginLeft: 16,
})

type Props = {
  data: Identifier
  name: string
  recurse?: boolean
}

const CompatRow: React.VFC<Props> = ({ data, name, recurse }) => {
  const [supportDetail, setSupportDetail] = useState<SupportStatement | null>(null)

  const compat = data.__compat

  if (!compat) {
    return null
  }

  const toggleSupportDetail = (value: SupportStatement): void => {
    setSupportDetail(supportDetail === value ? null : value)
  }

  const base = (
    <>
      <Row>
        <RowHeaderCell as="th" border="doubleRight" scope="row">
          <RowNameWrap>
            {compat.description ? (
              <span dangerouslySetInnerHTML={{ __html: compat.description }} />
            ) : (
              <code>{name}</code>
            )}
            <SpecStatusIcons status={compat.status} />
          </RowNameWrap>
        </RowHeaderCell>
        {BROWSER_KEYS.map((key) => (
          <CompatCell
            key={key}
            as="td"
            data={compat.support[key]}
            opened={compat.support[key] === supportDetail}
            onClick={toggleSupportDetail}
          />
        ))}
      </Row>
      {supportDetail && (
        <tr>
          <td colSpan={10}>
            <dl>
              {mapOver(supportDetail, (support, index) => (
                <SupportDetail key={index}>
                  <CompatCell as="dt" type="standalone" data={support} />
                  <SupportDetailDescriptions>
                    {mapOver(support.notes, (note, index) => (
                      <p key={index} dangerouslySetInnerHTML={{ __html: note || '특이사항 없음' }} />
                    ))}
                  </SupportDetailDescriptions>
                </SupportDetail>
              ))}
            </dl>
          </td>
        </tr>
      )}
    </>
  )

  const children = recurse
    ? getSubIdentifierKeys(data).map((key) => {
        const childName = `${name}.${key}`
        return <CompatRow key={childName} data={data[key]} name={childName} recurse={true} />
      })
    : null

  return !children?.length ? (
    base
  ) : (
    <>
      {base}
      {children}
    </>
  )
}

export default CompatRow
