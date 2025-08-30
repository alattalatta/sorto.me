import type { Identifier, SimpleSupportStatement, SupportStatement, VersionValue } from '@mdn/browser-compat-data'

/**
 * Get child identifier keys of a browser compatibility data.
 *
 * @param data The parent compatibility data's `Identifier` object.
 * @returns All keys of `data` except `__compat`.
 */
export function getSubIdentifierKeys(data: Identifier): string[] {
  return Object.keys(data).filter((key) => key !== '__compat')
}

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
      return `${versionString(head.version_added)}~${versionString(head.version_removed)}`
    }
    case 'unknown':
      return '?'
    case 'yes':
      return '예'
    case 'no':
      return '-'
    case 'added':
      return versionString(head.version_added)
  }
}

type SupportStatus = 'unknown' | 'yes' | 'no' | 'added' | 'removed'

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

  if (!statement.version_added) {
    return 'no'
  }

  return 'added'
}

function versionString(version: VersionValue | undefined): string {
  if (typeof version === 'string') {
    return version
  }

  if (version === undefined) {
    return ''
  }

  return '?'
}

export function hasSupportDetail(support: SupportStatement): boolean {
  return !!support && Boolean(Array.isArray(support) || support.alternative_name || support.flags || support.notes)
}
