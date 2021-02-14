import qs from 'qs'
import { useEffect, useState } from 'react'

export function useSearchQuery(): string | null {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  useEffect(() => {
    const { q } = qs.parse(location.search, { ignoreQueryPrefix: true })
    if (typeof q === 'string') {
      setSearchQuery(decodeURIComponent(q))
    }
  }, [])

  return searchQuery
}
