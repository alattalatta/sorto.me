import clsx from 'clsx'
import { m } from 'framer-motion'
import Image from 'next/image'

import * as styles from './Post.css'

type Props = {
  as?: 'article' | 'header'
  className?: string
  image: string
  title: string
  written: Date
}

const Post: React.VFC<Props> = ({ as = 'article', className, image, title, written }) => {
  const year = written.getFullYear()
  const month = written.getMonth() + 1
  const date = written.getDate()

  const Root = as === 'article' ? m.article : m.header

  return (
    <Root className={clsx(styles.root, className)} layoutId={title}>
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
  )
}

export { Post }
