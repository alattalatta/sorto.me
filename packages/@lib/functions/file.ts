import { promises as fs } from 'fs'

/**
 * Returns a file's last modified date as an ISO datetime string.
 *
 * @param filePath The file's path.
 */
async function readLastModified(filePath: string): Promise<string> {
  return (await fs.stat(filePath)).mtime.toISOString()
}

export { readLastModified }
