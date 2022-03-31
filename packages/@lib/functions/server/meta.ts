import path from 'node:path'
import url from 'node:url'

function filePath(importMetaURL: string): string {
  return path.dirname(url.fileURLToPath(importMetaURL))
}

export { filePath }
