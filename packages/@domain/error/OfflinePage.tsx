import type { Page } from '@lib/ui'

import * as styles from './OfflinePage.css'

const OfflinePage: Page = () => {
  return (
    <main className={styles.root}>
      <div>
        <h1 className={styles.heading}>
          저장된
          <br />
          데이터가
          <br />
          없습니다
        </h1>
      </div>
      <div>
        <p className={styles.sub}>
          온라인 상태로 방문한 적이 있는 페이지만
          <br />
          오프라인 모드에서 탐색할 수 있습니다.
          <button className={styles.goBack} type="button" onClick={() => history.back()}>
            돌아가기
          </button>
        </p>
      </div>
    </main>
  )
}

export { OfflinePage }
