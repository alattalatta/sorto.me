import { ScrollBack } from './ScrollBack'
import { styled } from './stitches'

const Background = styled('div', {
  height: 2000,
  background: 'linear-gradient(to bottom, $bg, $fg)',
})

const Fixture: React.VFC = () => {
  return (
    <Background>
      <ScrollBack />
    </Background>
  )
}

export default Fixture
