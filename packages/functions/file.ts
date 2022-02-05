import { promises as fs } from 'fs'

/**
 * Returns a file's last modified date as a `yyyy-MM-dd` string.
 *
 * @param filePath The file's path.
 */
async function readLastModified(filePath: string): Promise<string> {
  return (await fs.stat(filePath)).mtime.toISOString().slice(0, 10)
}

export { readLastModified }
