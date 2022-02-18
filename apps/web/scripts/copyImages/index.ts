import path from 'path'

import { copy } from 'fs-extra'

const packageRoot = path.resolve(__dirname, '../..')
const contentsRoot = path.resolve(__dirname, '../../../../packages/@contents')

copy(path.join(contentsRoot, 'docs/public'), path.join(packageRoot, 'public'))
  .then(() => copy(path.join(contentsRoot, 'posts/public'), path.join(packageRoot, 'public')))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
