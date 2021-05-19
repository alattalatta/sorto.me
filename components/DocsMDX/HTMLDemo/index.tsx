import * as DemoProvider from '../DemoProvider'
import Body from './Body'

const HTMLDemo: React.FC<{ height?: number }> = ({ children, height }) => {
  return (
    <DemoProvider.Root>
      <Body height={height}>{children}</Body>
    </DemoProvider.Root>
  )
}

export default HTMLDemo
