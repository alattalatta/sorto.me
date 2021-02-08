import { Identifier } from '@mdn/browser-compat-data/types'

/**
 * Retrieve browser compatibility data from `@mdn/bcd`.
 *
 * @param keys Key for the data as an array.
 * @returns BCD `Identifier` when found, `null` when not found.
 * @example
 * const headerData = await getCompatData(['html', 'element', 'header'])
 */
export async function getCompatData(keys: string[]): Promise<Identifier | null> {
  let res: Identifier
  try {
    res = await import(`@mdn/browser-compat-data/${keys.join('/')}.json`)
  } catch (e) {
    console.error(e)
    return null
  }

  for (const key of keys) {
    if (!res) {
      return null
    }
    res = res[key]
  }

  return res
}

// [fixme] Test
/**
 * Get a browser compatibility data's child identifier keys.
 *
 * @param data The parent compatibility data's `Identifier` object.
 * @returns All keys of `data` except `__compat`.
 */
export function getSubIdentifierKeys(data: Identifier): string[] {
  return Object.keys(data).filter((key) => key !== '__compat')
}
