import { Identifier } from '@mdn/browser-compat-data/types'
import chromeIcon from '@mdn/dinocons/browsers/chrome.svg'
import edgeIcon from '@mdn/dinocons/browsers/edge.svg'
import firefoxIcon from '@mdn/dinocons/browsers/firefox.svg'
import ieIcon from '@mdn/dinocons/browsers/internet-explorer.svg'
import safariIcon from '@mdn/dinocons/browsers/safari.svg'
import androidIcon from '@mdn/dinocons/platforms/android.svg'
import React, { useEffect, useState } from 'react'

import { Anchor } from 'components/basics'
import { getCompatData, getSubIdentifierKeys } from 'utils/docs/browserCompat'
import { BASE100, BASE40, CORNER_RADIUS, styled } from 'utils/styler'

import Callout from '../Callout'
import CompatRow from './CompatRow'
import { HeaderCell, Icon } from './shared'

const Table = styled('table', {
  width: '100%',
  background: BASE100,
  border: '1px solid',
  borderCollapse: 'collapse',
  borderRadius: CORNER_RADIUS,
  fontSize: 14,
  overflow: 'hidden',
  textAlign: 'center',
})

const HeaderLabel = styled('span', {
  display: 'block',
  writingMode: 'vertical-rl',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 8,
  paddingLeft: 2,
  whiteSpace: 'nowrap',
})

const BrowserIcon = styled(Icon, {
  marginLeft: 'auto',
  marginRight: 'auto',
})

const Caption = styled('figcaption', {
  color: BASE40,
  fontSize: 12,
  marginTop: 16,
  textAlign: 'right',
})

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
    <figure>
      <Table>
        <thead>
          <tr>
            <HeaderCell border="doubleRight" rowSpan={2} />
            <HeaderCell as="th" border="doubleRight" colSpan={5}>
              데스크톱
            </HeaderCell>
            <HeaderCell as="th" colSpan={4}>
              모바일
            </HeaderCell>
          </tr>
          <tr>
            <HeaderCell as="th">
              <HeaderLabel>Internet Explorer</HeaderLabel>
              <BrowserIcon src={ieIcon} alt="" />
            </HeaderCell>
            <HeaderCell as="th">
              <HeaderLabel>Safari</HeaderLabel>
              <BrowserIcon src={safariIcon} alt="" />
            </HeaderCell>
            <HeaderCell as="th">
              <HeaderLabel>Google Chrome</HeaderLabel>
              <BrowserIcon src={chromeIcon} alt="" />
            </HeaderCell>
            <HeaderCell as="th">
              <HeaderLabel>Edge</HeaderLabel>
              <BrowserIcon src={edgeIcon} alt="" />
            </HeaderCell>
            <HeaderCell as="th" border="doubleRight">
              <HeaderLabel>Firefox</HeaderLabel>
              <BrowserIcon src={firefoxIcon} alt="" />
            </HeaderCell>
            <HeaderCell as="th">
              <HeaderLabel>iOS Safari</HeaderLabel>
              <BrowserIcon src={safariIcon} alt="" />
            </HeaderCell>
            <HeaderCell as="th">
              <HeaderLabel>Android WebView</HeaderLabel>
              <BrowserIcon src={androidIcon} alt="" />
            </HeaderCell>
            <HeaderCell as="th">
              <HeaderLabel>Chrome</HeaderLabel>
              <BrowserIcon src={chromeIcon} alt="" />
            </HeaderCell>
            <HeaderCell as="th">
              <HeaderLabel>Firefox</HeaderLabel>
              <BrowserIcon src={firefoxIcon} alt="" />
            </HeaderCell>
          </tr>
        </thead>
        <tbody>
          <CompatRow data={loadedData} name={keys[keys.length - 1]} />
          {getSubIdentifierKeys(loadedData).map((key) => (
            <CompatRow key={key} data={loadedData[key]} name={key} recurse={true} />
          ))}
        </tbody>
      </Table>
      <Caption>
        MDN <Anchor href="https://github.com/mdn/browser-compat-data">BCD</Anchor>에서 가져오는 데이터입니다.
      </Caption>
    </figure>
  )
}

export default BrowserCompat
