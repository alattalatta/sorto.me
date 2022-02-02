import { Post } from './Post'
import placeholder from './_placeholder.png'

const Fixture: React.VFC = () => {
  return <Post image={placeholder} title="영원한 불길에 자신을 구원하라" written={new Date(1988, 11, 25)} />
}

export default Fixture
