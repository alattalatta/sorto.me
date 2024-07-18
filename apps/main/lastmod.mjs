import { exec as exec_ } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

import { globSync } from 'glob'

const exec = promisify(exec_)

const files = globSync('src/content/**/*.mdx')

try {
  await Promise.all(
    files.map(async (file) =>
      exec(`git log -1 --pretty="format:%cI" "${file}"`)
        .then(({ stdout }) => [file, stdout])
        .then(([file, date]) => {
          const nameToWrite = path.basename(file, '.mdx')
          const pathToWrite = `${path.dirname(file)}/${nameToWrite}.lastmod`
          return writeFile(pathToWrite, date)
        }),
    ),
  )
} catch (error) {
  console.error(error)
}
