import clsx from 'clsx'

import prism from './prism.module.scss'
import styles from './styles.module.scss'

export const CodeBlock: React.FC<{ className?: string }> = ({ className, ...props }) => (
  <pre className={clsx(prism.prism, className)} {...props} />
)

type Props = {
  className?: string
  hidden?: boolean
  name?: string
  sub?: boolean
  variant?: 'bad' | 'good'
}

export const Code: React.FC<Props> = ({ children, className, hidden, name, sub, variant, ...props }) => (
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
