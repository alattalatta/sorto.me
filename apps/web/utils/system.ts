import { promises as fs } from 'fs'
import path from 'path'

/**
 * Returns an async iterator which iterates over every files under a given path.
 *
 * @param dir A path to start iterating.
 * @example
 * for await (const filePath of readFilesRec(process.cwd())) {
 *   console.log(filePath)
 * }
 */
export async function* readFilesRec(dir: string): AsyncGenerator<string, void> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })

  for (const dirent of dirents) {
    const res = path.join(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* readFilesRec(res)
    } else {
      yield res
    }
  }
}

/**
 * Returns a file's last modified date as a `yyyy-MM-dd` string.
 *
 * @param filePath The file's path.
 */
export async function readLastModified(filePath: string): Promise<string> {
  return (await fs.stat(filePath)).mtime.toISOString().slice(0, 10)
}
