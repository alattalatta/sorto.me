import { Anchor } from '@lib/ui'

import * as styles from './Title.css'

type Props = {
  breadcrumbs: readonly (readonly [title: string, path: string])[]
  title: string
}

const Title: React.FC<Props> = ({ breadcrumbs, title }) => {
  return (
    <div>
      <h1 className={styles.heading}>{title}</h1>
      <nav className={styles.breadcrumbs}>
        {breadcrumbs.map(([currentTitle, currentPath]) => {
          return (
            <span key={currentPath} className={styles.crumb}>
              <Anchor className={styles.crumbAnchor} href={`/docs${currentPath}`}>
                {currentTitle}
              </Anchor>
            </span>
          )
        })}
      </nav>
    </div>
  )
}

export { Title }
