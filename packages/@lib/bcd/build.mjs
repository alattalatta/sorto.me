import fs from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const origin = require.resolve('@mdn/browser-compat-data')
const data = JSON.parse(fs.readFileSync(origin))

fs.writeFileSync('./html.json', JSON.stringify(data.html))
fs.writeFileSync('./css.json', JSON.stringify(data.css))
