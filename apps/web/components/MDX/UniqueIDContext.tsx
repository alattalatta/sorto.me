import { useRouter } from 'next/router'
import { useRef, createContext, useEffect } from 'react'

export const UniqueIDContext = createContext<Map<string, number> | null>(null)

export const UniqueIDProvider: React.FC = ({ children }) => {
  const map = useRef(new Map<string, number>()).current
  const router = useRouter()

  useEffect(() => {
    const clearMapWhenRouteChanges = () => map.clear()
    router.events.on('routeChangeStart', clearMapWhenRouteChanges)

    return () => router.events.off('routeChangeStart', clearMapWhenRouteChanges)
  }, [])

  return <UniqueIDContext.Provider value={map}>{children}</UniqueIDContext.Provider>
}
