import React from 'react'

import { useCodeBlockGroup } from 'hooks/MDX/useCodeBlockGroup'

import LiveCode from '../LiveCode'
import styles from './styles.module.scss'

type Props = {
  height?: number
  name: string
}

const LiveExample: React.VFC<Props> = ({ height = 240, name }) => {
  const { css: cssTexts, html: htmlTexts, js: jsTexts } = useCodeBlockGroup(name)

  return (
    <figure className={styles.root}>
      <figcaption className={styles.caption}>실행 결과</figcaption>
      <div className={styles.container} style={{ height: `${height}px` }}>
        <div className={styles.resultWrap}>
          <LiveCode data={{ htmls: htmlTexts, scripts: jsTexts, styles: cssTexts }} height={height} />
        </div>
      </div>
    </figure>
  )
}

export default LiveExample
