import clsx from 'clsx'
import { forwardRef } from 'react'

import prism from './prism.module.scss'
import styles from './styles.module.scss'

const CodeBlockRoot: React.FC<{ className?: string }> = ({ className, ...props }) => (
  <pre className={clsx(prism.prism, className)} {...props} />
)

type BodyProps = {
  className?: string
  hidden?: boolean
  name?: string
  sub?: boolean
  variant?: 'bad' | 'good'
}

const CodeBlockBody = forwardRef<HTMLElement, BodyProps>(
  ({ children, className, hidden, name, sub, variant, ...props }, ref) => (
    <code
      ref={ref}
      className={clsx(styles.code, className, variant && styles[variant])}
      {...props}
      hidden={hidden}
      title={variant === 'bad' ? '좋지 않음' : variant === 'good' ? '좋음' : undefined}
      data-codeblock-sub={sub}
      data-codeblock-name={name}
    >
      <span className={clsx(styles.codeBody)}>{children}</span>
    </code>
  ),
)

export { CodeBlockRoot as Root, CodeBlockBody as Body }
export type { BodyProps }
