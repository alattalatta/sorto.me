import clsx from 'clsx'

import * as styles from './ContentsContainer.css'

type Props = {
  children: React.ReactNode
  className?: string
}

const ContentsContainer: React.FC<Props> = ({ children, className }) => {
  return <div className={clsx(styles.body, className)}>{children}</div>
}

export { ContentsContainer }
