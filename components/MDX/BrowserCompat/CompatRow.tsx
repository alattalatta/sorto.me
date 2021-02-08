import { BrowserNames, Identifier, StatusBlock, SupportStatement } from '@mdn/browser-compat-data/types'
import deprecatedIcon from '@mdn/dinocons/emojis/thumbs-down.svg'
import experimentalIcon from '@mdn/dinocons/general/flask.svg'
import nonStandardIcon from '@mdn/dinocons/notifications/exclamation-triangle.svg'
import React, { useState } from 'react'

import { getSubIdentifierKeys } from 'utils/docs/browserCompat'
import { BASE70, styled } from 'utils/styler'

import CompatCell from './CompatCell'
import { HeaderCell, Icon } from './shared'

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

const NameWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
})

const StatusIconWrap = styled('div', {
  minWidth: 1,
  minHeight: 1,
  display: 'flex',
  flexWrap: 'nowrap',
  marginLeft: 'auto',
})

const IconHelper = styled('abbr', {
  cursor: 'help',
  padding: 2,
  '&:hover': {
    background: BASE70,
  },
})

const StatusIcons: React.VFC<{ status: StatusBlock | undefined }> = ({ status }) => {
  if (!status) {
    return <StatusIconWrap />
  }

  return (
    <StatusIconWrap>
      {!status.standard_track && (
        <IconHelper title="표준 기능이 아님. 크로스 브라우저 지원이 미흡할 수 있습니다.">
          <Icon src={nonStandardIcon} alt="비표준" />
        </IconHelper>
      )}
      {status.deprecated && (
        <IconHelper title="표준 명세에서 폐기. 더 이상 사용하지 않는 것이 좋습니다.">
          <Icon src={deprecatedIcon} alt="폐기" />
        </IconHelper>
      )}
      {status.experimental && (
        <IconHelper title="실험적 기능. 동작이 바뀔 수 있습니다.">
          <Icon src={experimentalIcon} alt="실험적" />
        </IconHelper>
      )}
    </StatusIconWrap>
  )
}

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

  const toggleSupportDetail = (_: SupportStatement): void => {
    // setSupportDetail(supportDetail === data ? null : data)
    setSupportDetail(null)
  }

  const base = (
    <>
      <tr>
        <HeaderCell as="th" border="doubleRight" scope="row">
          <NameWrap>
            {compat.description ? (
              <span dangerouslySetInnerHTML={{ __html: compat.description }} />
            ) : (
              <code>{name}</code>
            )}
            <StatusIcons status={compat.status} />
          </NameWrap>
        </HeaderCell>
        {BROWSER_KEYS.map((key) => (
          <CompatCell key={key} data={compat.support[key]} onClick={toggleSupportDetail} />
        ))}
      </tr>
      {supportDetail && (
        <tr>
          <td colSpan={10}>[TODO]</td>
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
