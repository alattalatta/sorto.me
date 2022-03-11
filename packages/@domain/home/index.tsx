import type { Page } from '@lib/ui'
import { Anchor } from '@lib/ui'

import { Splash } from './Splash'
import * as styles from './index.css'

const HomePage: Page = () => {
  return (
    <Splash>
      <main>
        <h1 className={styles.label}>alattalatta</h1>
        <section>
          <h2 className={styles.label}>library</h2>
          <div className={styles.item}>
            <Anchor className={styles.anchor} href="https://www.npmjs.com/package/k-popo">
              k-popo
            </Anchor>
          </div>
        </section>
        <section>
          <h2 className={styles.label}>experiments</h2>
          <div className={styles.item}>
            <Anchor className={styles.anchor} href="https://dialog98.sorto.me/">
              dialog98
            </Anchor>
          </div>
        </section>
        <section>
          <h2 className={styles.label}>enter</h2>
          <div className={styles.item}>
            <Anchor className={styles.anchor} href="/posts">
              blog
            </Anchor>
          </div>
          <div className={styles.item}>
            <Anchor className={styles.anchor} href="/docs/Web">
              docs
            </Anchor>
          </div>
          <div className={styles.item}>
            <Anchor className={styles.anchor} href="https://github.com/alattalatta">
              github
            </Anchor>
          </div>
        </section>
        <section>
          <h2 className={styles.label}>contact</h2>
          <div className={styles.item}>
            <Anchor className={styles.anchor} href="mailto:alattalatta@sorto.me">
              @sorto.me
            </Anchor>
          </div>
        </section>
      </main>
    </Splash>
  )
}

export { HomePage }
