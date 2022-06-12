import bcdCSS from '@lib/bcd/css'
import bcdHTML from '@lib/bcd/html'
import type { CompatStatement, Identifier } from '@mdn/browser-compat-data/types'

/**
 * Retrieve browser compatibility data from `@mdn/bcd`.
 *
 * @param keys Key for the data as an array.
 * @returns BCD `Identifier` when found, `null` when not found.
 * @example
 * const headerData = await getCompatData(['html', 'element', 'header'])
 */
export function getCompatData(keys: string[]): Identifier | null {
  let res = keys[0] === 'css' ? bcdCSS : bcdHTML

  for (const key of keys.slice(1)) {
    if (!res) {
      return null
    }
    res = res[key]
  }

  return filterDeprecated(res)
}

function filterDeprecated(data: Identifier): Identifier {
  const entries = Object.entries(data)

  // only __compat = no children
  if (entries.length <= 1) {
    return data
  }

  const filtered = entries
    .filter(([key, value]) => key !== '__compat' && !(value as Identifier).__compat?.status?.deprecated)
    .map<[string, CompatStatement | Identifier]>(([key, value]) => [key, filterDeprecated(value as Identifier)])

  return Object.fromEntries([...(data.__compat ? [['__compat', data.__compat]] : []), ...filtered]) as Identifier
}
