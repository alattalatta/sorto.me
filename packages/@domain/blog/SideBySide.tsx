import * as styles from './SideBySide.css'

type Props = {
  caption?: string
  children: React.ReactNode
}

const SideBySide: React.FC<Props> = ({ caption, children }) => {
  return (
    <figure className={styles.root}>
      <div className={styles.wrap}>{children}</div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}

export { SideBySide }
