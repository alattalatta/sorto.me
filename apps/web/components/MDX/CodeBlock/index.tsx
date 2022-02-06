import { forwardRef } from 'react'

const CodeBlockRoot: React.FC<{ className?: string }> = ({ className, ...props }) => (
  <pre className={className} {...props} />
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
      className={className}
      {...props}
      data-codeblock-name={name}
      data-codeblock-sub={sub}
      data-variant={variant}
      hidden={hidden}
      title={variant === 'bad' ? '좋지 않음' : variant === 'good' ? '좋음' : undefined}
    >
      {children}
    </code>
  ),
)

export { CodeBlockRoot as Root, CodeBlockBody as Body }
export type { BodyProps }
