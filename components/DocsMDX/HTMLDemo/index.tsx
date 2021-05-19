import * as DemoProvider from '../DemoProvider'
import Body from './Body'

const HTMLDemo: React.FC = ({ children }) => {
  return (
    <DemoProvider.Root>
      <Body>{children}</Body>
    </DemoProvider.Root>
  )
}

export default HTMLDemo
