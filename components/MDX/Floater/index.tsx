import styles from './styles.module.scss'

export const Floater: React.FC<{ pos: 'left' | 'right' }> = ({ children, pos }) => {
  return <aside className={styles[pos]}>{children}</aside>
}

export const FloatClear: React.VFC = () => <div className={styles.clear} />
