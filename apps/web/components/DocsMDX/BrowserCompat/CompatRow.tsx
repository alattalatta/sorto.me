import { styled } from '@lib/ui'
import type { BrowserNames, Identifier, SupportStatement } from '@mdn/browser-compat-data/types'
import { Fragment, useState } from 'react'

import { mapOver } from 'utils/array'
import { getSubIdentifierKeys, supportLabel } from 'utils/docs'

import CompatCell from './CompatCell'
import SpecStatusIcons from './SpecStatusIcons'

type Props = {
  data: Identifier
  name: string
  recurse?: boolean
}

const Root = styled('details', {
  '& + &': {
    marginTop: '1rem',
  },
  '& &': {
    paddingLeft: '1rem',
  },
})

const Summary = styled('summary', {
  cursor: 'pointer',
  userSelect: 'none',
})

const Body = styled('div', {
  marginLeft: `${4 / 16}rem`,

  // when children (recursive=true) body
  'details > &': {
    borderLeft: '2px solid $fg',
    paddingLeft: '0.75rem',
  },
})

const TablesContainer = styled('div', {
  display: 'flex',
  overflowX: 'auto',
  marginBottom: '0.5rem',
  '&::-webkit-scrollbar': {
    background: '#C4C4C4',
    height: 4,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '$fg',
  },
})

const Table = styled('table', {
  border: 'none',
  borderCollapse: 'collapse',
  marginBottom: `${12 / 16}rem`,

  '& + &': {
    marginLeft: '1rem',
  },
})

const BrowserName = styled('th', {
  width: `${80 / 16}rem`,
  minWidth: `${80 / 16}rem`,
  height: `${54 / 16}rem`,
  border: 'none',
  fontSize: `${14 / 16}rem`,
  fontWeight: 400,
  padding: `0 0 ${10 / 16}rem`,
  verticalAlign: 'bottom',
  whiteSpace: 'pre-wrap',
})

const Children = styled('div', {
  marginTop: '1rem',
})

const DESKTOP_KEYS: [BrowserNames, string][] = [
  ['ie', 'IE'],
  ['edge', 'Edge'],
  ['chrome', 'Chrome'],
  ['safari', 'Safari'],
  ['firefox', 'Firefox'],
]
const MOBILE_KEYS: [BrowserNames, string][] = [
  ['safari_ios', 'iOS\nSafari'],
  ['webview_android', 'Android\nWebView'],
  ['chrome_android', 'Android\nChrome'],
  ['firefox_android', 'Android\nFirefox'],
  ['samsunginternet_android', 'Samsung\nInternet'],
]

const CompatRow: React.VFC<Props> = ({ data, name, recurse }) => {
  const [supportDetail, setSupportDetail] = useState<[BrowserNames, SupportStatement] | null>(null)

  const compat = data.__compat
  if (!compat) {
    return null
  }

  const toggleSupportDetail = (browserName: BrowserNames, value: SupportStatement): void => {
    if (supportDetail && supportDetail[0] === browserName && supportDetail[1] === value) {
      setSupportDetail(null)
    } else {
      setSupportDetail([browserName, value])
    }
  }

  const children = recurse
    ? getSubIdentifierKeys(data).map((key) => {
        const childName = `${name}.${key}`
        return <CompatRow key={childName} data={data[key]} name={childName} recurse={true} />
      })
    : null

  const supportDetailBrowserDisplayName =
    supportDetail?.[0] &&
    (DESKTOP_KEYS.find(([key]) => key === supportDetail[0])?.[1] ??
      MOBILE_KEYS.find(([key]) => key === supportDetail[0])?.[1])

  return (
    <Root as={recurse ? 'details' : 'div'}>
      {recurse && (
        <Summary>
          {compat.description ? <span dangerouslySetInnerHTML={{ __html: compat.description }} /> : <code>{name}</code>}
          <SpecStatusIcons status={compat.status} />
        </Summary>
      )}
      <Body>
        <TablesContainer>
          <Table className="jsx">
            <thead>
              <tr>
                {DESKTOP_KEYS.map(([key, display]) => (
                  <BrowserName key={key}>{display}</BrowserName>
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
          </Table>
          <Table className="jsx">
            <thead>
              <tr>
                {MOBILE_KEYS.map(([key, display]) => (
                  <BrowserName key={key}>{display}</BrowserName>
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
          </Table>
        </TablesContainer>
        {supportDetail && (
          <dl>
            {mapOver(supportDetail[1], (support, index) => (
              <Fragment key={index}>
                <div className="callout callout-note">
                  <p>
                    <b>
                      {supportDetailBrowserDisplayName} {supportLabel(support)}
                    </b>
                    :
                  </p>
                  {mapOver(support.notes, (note, subindex) => (
                    <p key={subindex} dangerouslySetInnerHTML={{ __html: note || '특이사항 없음' }} />
                  ))}
                </div>
              </Fragment>
            ))}
          </dl>
        )}
        {children && <Children>{children}</Children>}
      </Body>
    </Root>
  )
}

export default CompatRow
