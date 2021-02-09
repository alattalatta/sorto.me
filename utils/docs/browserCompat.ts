import { Identifier, SimpleSupportStatement, SupportStatement, VersionValue } from '@mdn/browser-compat-data/types'

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

/**
 * Get child identifier keys of a browser compatibility data.
 *
 * @param data The parent compatibility data's `Identifier` object.
 * @returns All keys of `data` except `__compat`.
 */
export function getSubIdentifierKeys(data: Identifier): string[] {
  return Object.keys(data).filter((key) => key !== '__compat')
}

type SupportStatus = 'unknown' | 'yes' | 'no' | 'added' | 'removed'

/**
 * Make a support status label for a browser support data.
 *
 * @param statement The browser support data.
 * @returns Appropriate label for the support data. May include version numbers.
 */
export function supportLabel(statement: SupportStatement | undefined): string {
  if (!statement) {
    return '?'
  }

  const head = Array.isArray(statement) ? statement[0] : statement
  const status = determineStatus(head)

  switch (status) {
    case 'removed': {
      const versionAddedLabel = versionString(head.version_added)
      return `${versionAddedLabel} ~ ${head.version_removed}`
    }
    case 'unknown':
      return '?'
    case 'yes':
      return '지원'
    case 'no':
      return '미지원'
    case 'added':
      return versionString(head.version_added)
  }
}

/**
 * Determine the current status of a browser support data.
 *
 * @param statement The browser support data.
 * @returns The status: Unknown, Yes/No, Added/Removed.
 */
export function determineStatus(statement: SimpleSupportStatement): SupportStatus {
  if (statement.version_removed) {
    return 'removed'
  }

  if (statement.version_added === null) {
    return 'unknown'
  }

  if (statement.version_added === true) {
    return 'yes'
  }

  if (!statement.version_added) {
    return 'no'
  }

  return 'added'
}

function versionString(version: VersionValue): string {
  if (typeof version === 'string') {
    return version
  }

  return '?'
}
