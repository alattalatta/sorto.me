import type { Page } from '@lib/ui'
import { Anchor } from '@lib/ui'

import * as styles from './NotFoundPage.css'

const NotFoundPage: Page = () => {
  return (
    <main className={styles.root}>
      <div>
        <h1 className={styles.heading}>
          페이지를
          <br />
          찾을 수
          <br />
          없습니다
        </h1>
      </div>
      <div>
        <nav className={styles.sub}>
          <Anchor className={styles.anchor} href="/posts">
            블로그
          </Anchor>
          <Anchor className={styles.anchor} href="/docs/Web">
            문서
          </Anchor>
          <Anchor className={styles.anchor} href="/search">
            검색
          </Anchor>
        </nav>
      </div>
    </main>
  )
}

export { NotFoundPage }
