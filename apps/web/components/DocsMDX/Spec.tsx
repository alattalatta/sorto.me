import type { BrowserNames, Identifier, SupportStatement } from '@mdn/browser-compat-data/types'
import { Anchor } from '@lib/ui'

type Props = {
  data: {
    data: Identifier
    name: string
  }
}

const Spec: React.FC<Props> = ({ children, data }) => {
  return (
    <p>
      {/* [todo] remove casting */}
      <Anchor href={(data.data.__compat as any)?.spec_url}>
        {children}
      </Anchor>
    </p>
  )
}

export default Spec
