import styles from './Loading.module.scss'

const Loading: React.FC<{ height: number; round?: boolean }> = ({ height, round = false }) => {
  return (
    <div className={styles.loading} data-round={round} style={{ height }}>
      <p className="no-screen">불러오는 중...</p>
    </div>
  )
}

export default Loading
