import * as styles from './Layout.css'
import { NavBar } from './NavBar'
import { ScrollBack } from './ScrollBack'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className={styles.body}>{children}</div>
      <ScrollBack />
    </>
  )
}

export { Layout }
