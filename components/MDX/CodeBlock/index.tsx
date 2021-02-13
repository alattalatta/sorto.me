import clsx from 'clsx'

import prism from './prism.module.scss'
import styles from './styles.module.scss'

export const CodeBlockBad: React.VFC = () => <span className={styles.codeBlockBad} />
export const CodeBlockGood: React.VFC = () => <span className={styles.codeBlockGood} />

export const CodeBlock: React.FC = ({ children }) => (
  <pre className={clsx(styles.codeBlock, prism.prism)}>{children}</pre>
)
