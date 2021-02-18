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
import { styled } from 'utils/styler'

import Callout from '../Callout'
import CompatRow from './CompatRow'
import { Cell, Icon } from './shared'

const Table = styled('table', {
  width: '100%',
  border: '1px solid',
  borderCollapse: 'collapse',
  borderRadius: '$cornerRadius',
  fontSize: 14,
  overflow: 'hidden',
  textAlign: 'center',
  '& thead': {
    borderBottom: '3px double $base60',
  },
  '& th': {
    background: '$base90',
  },
})

const ColumnHeaderCell = styled(Cell, {
  padding: 16,
  verticalAlign: 'bottom',
})

const VertText = styled('span', {
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
  color: '$base40',
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
            <ColumnHeaderCell border="doubleRight" rowSpan={2} />
            <ColumnHeaderCell as="th" border="doubleRight" colSpan={5}>
              데스크톱
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th" colSpan={4}>
              모바일
            </ColumnHeaderCell>
          </tr>
          <tr>
            <ColumnHeaderCell as="th">
              <VertText>Internet Explorer</VertText>
              <BrowserIcon src={ieIcon} alt="" />
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th">
              <VertText>Safari</VertText>
              <BrowserIcon src={safariIcon} alt="" />
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th">
              <VertText>Google Chrome</VertText>
              <BrowserIcon src={chromeIcon} alt="" />
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th">
              <VertText>Edge</VertText>
              <BrowserIcon src={edgeIcon} alt="" />
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th" border="doubleRight">
              <VertText>Firefox</VertText>
              <BrowserIcon src={firefoxIcon} alt="" />
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th">
              <VertText>iOS Safari</VertText>
              <BrowserIcon src={safariIcon} alt="" />
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th">
              <VertText>Android WebView</VertText>
              <BrowserIcon src={androidIcon} alt="" />
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th">
              <VertText>Chrome</VertText>
              <BrowserIcon src={chromeIcon} alt="" />
            </ColumnHeaderCell>
            <ColumnHeaderCell as="th">
              <VertText>Firefox</VertText>
              <BrowserIcon src={firefoxIcon} alt="" />
            </ColumnHeaderCell>
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
