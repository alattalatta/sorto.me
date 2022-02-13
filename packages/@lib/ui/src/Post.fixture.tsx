import { Post } from './Post'
import placeholder from './_placeholder.png'
import { styled } from './stitches'

const PostHeight300 = styled(Post, {
  height: 300,
})

const Fixture: React.VFC = () => {
  return (
    <>
      <Post
        image={placeholder as unknown as string}
        title="영원한 불길에 자신을 구원하라"
        written={new Date(1988, 11, 25)}
      />
      <PostHeight300
        image={placeholder as unknown as string}
        title="영원한 불길에 자신을 구원하라"
        written={new Date(1988, 11, 25)}
      />
    </>
  )
}

export default Fixture
