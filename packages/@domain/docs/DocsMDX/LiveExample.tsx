import { NoScreen, styled } from '@lib/ui'

import { useCodeBlockGroup } from '../useCodeBlockGroup'
import LiveCode from './LiveCode'

type Props = {
  height?: number
  name: string
}

const Container = styled('div', {
  border: '1px solid $fg',
  boxSizing: 'content-box',
  overflow: 'hidden',
  padding: '1em',
  position: 'relative',

  '& iframe': {
    width: '100%',
    border: 'none',
    display: 'block',
  },
})

const LiveExample: React.VFC<Props> = ({ height = 240, name }) => {
  const codes = useCodeBlockGroup(name)

  return (
    <figure>
      <NoScreen as="figcaption">실행 결과</NoScreen>
      <Container style={{ height: `${height}px` }}>
        <LiveCode codes={codes} height={height} />
      </Container>
    </figure>
  )
}

export default LiveExample
