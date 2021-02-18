import clsx from 'clsx'

import prism from './prism.module.scss'
import styles from './styles.module.scss'

export const CodeBlock: React.FC<{ className?: string }> = ({ className, ...props }) => (
  <pre className={clsx(prism.prism, className)} {...props} />
)

export const Code: React.FC<{ className?: string; variant: 'bad' | 'good' }> = ({
  children,
  className,
  variant,
  ...props
}) => (
  <code className={clsx(styles.code, className, styles[variant])} {...props}>
    <span className={styles.codeBody}>{children}</span>
  </code>
)
