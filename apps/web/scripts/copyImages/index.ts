import path from 'path'

import { copy } from 'fs-extra'

const packageRoot = path.resolve(__dirname, '../..')
const contentsRoot = path.resolve(__dirname, '../../../../packages/@contents')

Promise.all([
  copy(path.join(contentsRoot, 'docs/public'), path.join(packageRoot, 'public'), { overwrite: true }),
  copy(path.join(contentsRoot, 'posts/public'), path.join(packageRoot, 'public'), { overwrite: true }),
]).catch((err) => {
  console.error(err)
  process.exit(1)
})
