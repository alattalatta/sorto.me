import { Anchor } from '@lib/ui'
import type { Identifier } from '@mdn/browser-compat-data/types'

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
      {/* eslint-disable-next-line */}
      <Anchor href={(data.data.__compat as any)?.spec_url}>
        {children}
      </Anchor>
    </p>
  )
}

export default Spec
