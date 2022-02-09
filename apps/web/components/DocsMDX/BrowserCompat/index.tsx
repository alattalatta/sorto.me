import type { CompatData, Identifier } from '@mdn/browser-compat-data/types'
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

import * as Callout from '../../MDX/Callout'
import CompatRow from './CompatRow'
import { Cell } from './shared'

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
  '@narrow': {
    display: 'none',
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

const BrowserIcon = styled('img', {
  width: 16,
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const NarrowScreenWarning = styled('p', {
  color: '$accentR',
  display: 'none',
  '@narrow': {
    display: 'block',
  },
})

const Caption = styled('figcaption', {
  color: '$base40',
  fontSize: 12,
  marginTop: 16,
  textAlign: 'right',
})

const BrowserCompat: React.VFC<{ children?: string; data?: { data: Identifier; name: string } | null }> = ({
  children,
  data: dataProp,
}) => {
  const [loadedData, setLoadedData] = useState<Identifier | undefined | null>(undefined)

  useEffect(() => {
    if (children) {
      void (async () => {
        const bcd = (await import('@mdn/browser-compat-data')) as unknown as CompatData
        setLoadedData(getCompatData(bcd, children))
      })()
    }
  }, [children])

  const data = dataProp?.data || loadedData
  const name = (() => {
    if (dataProp?.name) {
      return dataProp.name
    }

    if (!children) {
      throw new Error('BrowserCompat needs data name.')
    }

    const keys = children.split('.')
    return keys[keys.length - 1]
  })()

  if (data === undefined) {
    return null
  }

  if (data === null) {
    return (
      <Callout.Root color="alert" label="브라우저 호환성 데이터 없음">
        <code>{children}</code>의 호환성 데이터를 찾을 수 없습니다.
      </Callout.Root>
    )
  }

  return (
    <figure>
      <Table>
        <thead>
          <tr>
            <ColumnHeaderCell border="doubleRight" rowSpan={2} />
            <ColumnHeaderCell border="doubleRight" colSpan={5}>
              데스크톱
            </ColumnHeaderCell>
            <ColumnHeaderCell colSpan={4}>모바일</ColumnHeaderCell>
          </tr>
          <tr>
            <ColumnHeaderCell>
              <VertText>Internet Explorer</VertText>
              <BrowserIcon alt="" src={ieIcon} />
            </ColumnHeaderCell>
            <ColumnHeaderCell>
              <VertText>Safari</VertText>
              <BrowserIcon alt="" src={safariIcon} />
            </ColumnHeaderCell>
            <ColumnHeaderCell>
              <VertText>Google Chrome</VertText>
              <BrowserIcon alt="" src={chromeIcon} />
            </ColumnHeaderCell>
            <ColumnHeaderCell>
              <VertText>Edge</VertText>
              <BrowserIcon alt="" src={edgeIcon} />
            </ColumnHeaderCell>
            <ColumnHeaderCell border="doubleRight">
              <VertText>Firefox</VertText>
              <BrowserIcon alt="" src={firefoxIcon} />
            </ColumnHeaderCell>
            <ColumnHeaderCell>
              <VertText>iOS Safari</VertText>
              <BrowserIcon alt="" src={safariIcon} />
            </ColumnHeaderCell>
            <ColumnHeaderCell>
              <VertText>Android WebView</VertText>
              <BrowserIcon alt="" src={androidIcon} />
            </ColumnHeaderCell>
            <ColumnHeaderCell>
              <VertText>Chrome</VertText>
              <BrowserIcon alt="" src={chromeIcon} />
            </ColumnHeaderCell>
            <ColumnHeaderCell>
              <VertText>Firefox</VertText>
              <BrowserIcon alt="" src={firefoxIcon} />
            </ColumnHeaderCell>
          </tr>
        </thead>
        <tbody>
          <CompatRow data={data} name={name} />
          {getSubIdentifierKeys(data).map((key) => (
            <CompatRow key={key} data={data[key]} name={key} recurse={true} />
          ))}
        </tbody>
      </Table>
      <NarrowScreenWarning>작은 화면 개발 중: 브라우저 호환성 표는 넓은 화면에서 확인해주세요</NarrowScreenWarning>
      <Caption>
        MDN <Anchor href="https://github.com/mdn/browser-compat-data">BCD</Anchor>에서 가져오는 데이터입니다.
      </Caption>
    </figure>
  )
}

export default BrowserCompat
