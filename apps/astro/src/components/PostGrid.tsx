import { useEffect, useReducer, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import styles from './PostGrid.module.scss'

type Props = {
  children: React.ReactNode
  // slots
  footer?: React.ReactNode
  nav?: React.ReactNode
}

const PostGrid: React.FC<Props> = ({ children, footer, nav }) => {
  const $body = useRef<HTMLDivElement>(null)

  const [open, toggleOpen] = useReducer((v) => !v, false)

  // there's no other inert maker
  // being lazy
  useEffect(() => {
    if (!$body.current) {
      return
    }

    if (open) {
      $body.current.inert = true
    } else {
      $body.current.inert = false
    }
  }, [open])

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <RemoveScroll enabled={open}>
          <nav className={styles.nav} data-open={open} id="postgrid-nav">
            {nav}
          </nav>
        </RemoveScroll>
        <button
          aria-controls="postgrid-nav"
          aria-expanded={open}
          className={styles.opener}
          type="button"
          onClick={toggleOpen}
        >
          =&gt;
        </button>
      </header>
      <div ref={$body} className={styles.body} id="postgrid-body">
        {children}
        <footer>{footer}</footer>
      </div>
    </div>
  )
}

export default PostGrid
