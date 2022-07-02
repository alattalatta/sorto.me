import clsx from 'clsx'
import Image from 'next/image'
import { Flipped } from 'react-flip-toolkit'

import * as styles from './Post.css'
import type { PostMetadata } from './types'

type Props = {
  as?: 'article' | 'header'
  className?: string
  data: PostMetadata
}

const Post: React.FC<Props> = ({ as = 'article', className, data: { created, image, slug, title } }) => {
  const written = new Date(created)
  const year = written.getFullYear()
  const month = written.getMonth() + 1
  const date = written.getDate()

  const Root = as === 'article' ? 'article' : 'header'

  return (
    <Flipped flipId={slug}>
      <Root className={clsx(styles.root, className)}>
        <div className={styles.body}>
          <div className={styles.imageBox}>
            <Image alt="" layout="fill" objectFit="cover" sizes="10.5rem" src={image} />
          </div>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <time className={styles.written} dateTime={written.toISOString()}>
          {year}년 {month}월 {date}일 작성
        </time>
      </Root>
    </Flipped>
  )
}

export { Post }
