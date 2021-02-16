import BlogMenu from 'components/BlogMenu'
import IndexBody from 'components/IndexBody'
import { getLayout } from 'components/Layout'
import { Page } from 'utils/types'

const Index: Page = () => {
  return <IndexBody />
}
Index.getLayout = getLayout(<BlogMenu />)
export default Index
