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
  variant: 'bad' | 'good'
}

export const Code: React.FC<Props> = ({ children, className, hidden, name, variant, ...props }) => (
  <code
    className={clsx(styles.code, className, styles[variant])}
    data-codeblock-name={name}
    {...props}
    hidden={hidden}
    aria-hidden={hidden}
  >
    <span className={clsx(styles.codeBody)}>{children}</span>
  </code>
)
