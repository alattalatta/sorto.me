import React from 'react'

import SearchField from './SearchField'

const BlogSearchField: React.VFC<{ initialValue?: string | null }> = ({ initialValue }) => {
  return <SearchField initialValue={initialValue || ''} placeholder="블로그 검색..." targetUrl="/posts/search" />
}

export default BlogSearchField
