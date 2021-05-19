import * as DemoProvider from '../DemoProvider'
import Body from './Body'

const CSSDemo: React.FC<{ height?: number; selector?: string }> = ({ children, height, selector }) => {
  return (
    <DemoProvider.Root>
      <Body height={height} selector={selector}>
        {children}
      </Body>
    </DemoProvider.Root>
  )
}

export default CSSDemo
