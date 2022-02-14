import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function useSearchQuery(): string | null {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q')
    q && setSearchQuery(decodeURIComponent(q))
  }, [router.query.q])

  return searchQuery
}
