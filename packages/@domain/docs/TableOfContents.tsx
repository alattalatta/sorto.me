import * as styles from './TableOfContents.css'

type Props = {
  data: readonly (readonly [string, string])[]
  title: string
}

const TableOfContents: React.FC<Props> = ({ data, title: docTitle }) => {
  return (
    <aside aria-labelledby="toc-heading" className={styles.root}>
      <h2 className={styles.heading} id="toc-heading">
        목차
      </h2>
      <p className={styles.docTitle}>
        <a className={styles.anchor} href="#">
          {docTitle}
        </a>
      </p>
      <ol className={styles.list}>
        {data.map(([id, title]) => (
          <li key={id} className={styles.item}>
            <a className={styles.anchor} href={`#${id}`}>
              {title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}

export { TableOfContents }
