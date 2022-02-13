import { useEffect, useState } from 'react'

export function useSearchQuery(): string | null {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q')
    setSearchQuery(decodeURIComponent(q))
  }, [])

  return searchQuery
}
