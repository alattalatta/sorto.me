import DocPin from 'components/DocPin'
import type { RecentlyViewedDoc as Doc } from 'db/RecentlyViewedDocs'

import styles from './RecentlyViewedDoc.module.scss'

type Props = {
  doc: Doc
  onPin: (doc: Doc) => void
}

const RecentlyViewedDoc: React.FC<Props> = ({ doc, onPin }) => {
  return (
    <article aria-labelledby={doc.id} className={styles.root}>
      <a href={doc.id}>
        <h4 className={styles.title} id={doc.id}>
          {doc.title}
        </h4>
      </a>
      <span className={styles.pinButton}>
        <DocPin doc={doc} />
      </span>
      <p className={styles.description}>{doc.description}</p>
      <time className={styles.viewedAt} dateTime={new Date(doc.viewedAt).toISOString()}>
        {new Date(doc.viewedAt).toLocaleString('ko-KR', {
          dateStyle: 'short',
          timeStyle: 'short',
        })}
      </time>
      에 마지막으로 읽음
    </article>
  )
}

export default RecentlyViewedDoc
