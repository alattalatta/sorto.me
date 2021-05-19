import clsx from 'clsx'

import prism from './prism.module.scss'
import styles from './styles.module.scss'

const Root: React.FC<{ className?: string }> = ({ className, ...props }) => (
  <pre className={clsx(prism.prism, className)} {...props} />
)

type BodyProps = {
  className?: string
  hidden?: boolean
  name?: string
  sub?: boolean
  variant?: 'bad' | 'good'
}

const Body: React.FC<BodyProps> = ({ children, className, hidden, name, sub, variant, ...props }) => (
  <code
    className={clsx(styles.code, className, variant && styles[variant])}
    {...props}
    hidden={hidden}
    title={variant === 'bad' ? '좋지 않음' : variant === 'good' ? '좋음' : undefined}
    aria-hidden={hidden}
    data-codeblock-sub={sub}
    data-codeblock-name={name}
  >
    <span className={clsx(styles.codeBody)}>{children}</span>
  </code>
)

export { Root, Body }
export type { BodyProps }
