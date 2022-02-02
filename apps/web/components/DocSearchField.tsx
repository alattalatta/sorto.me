import React from 'react'

import SearchField from './SearchField'

const DocSearchField: React.VFC<{ initialValue?: string | null }> = ({ initialValue }) => {
  return <SearchField initialValue={initialValue || ''} placeholder="Docs 검색..." targetUrl="/docs/search" />
}

export default DocSearchField
