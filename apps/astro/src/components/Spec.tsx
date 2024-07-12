import type { Identifier } from '@mdn/browser-compat-data'

type Props = {
  children: React.ReactNode
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
      <a href={(data.data.__compat as any)?.spec_url}>
        {children}
      </a>
    </p>
  )
}

export default Spec
