import { Container } from './Container'
import styles from './PostBody.module.scss'

const PostBody: React.FC = ({ children }) => {
  return <Container className={styles.postBody}>{children}</Container>
}

export default PostBody
