import fs from 'fs'
import path from 'path'

import { getDocFiles } from 'utils/docs'
import { POST_FILES_PENDING } from 'utils/posts'
import { readLastModified } from 'utils/system'

const SITE_URL = 'https://sorto.me'
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.md.xml')

const prepend = (b: string) => (a: string): string => b + a

async function main(): Promise<void> {
  const docSlugs = await getDocFiles()
  const postSlugs = await POST_FILES_PENDING

  const docEntriesAsync = docSlugs.map(prepend('docs/')).map(buildEntry)
  const postEntriesAsync = postSlugs.map(prepend('posts/')).map(buildEntry)

  try {
    fs.unlinkSync(SITEMAP_PATH)
  } catch (_) {
    // eslint-disable-next-line no-empty
  }

  await fs.promises.writeFile(
    SITEMAP_PATH,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(await Promise.all(docEntriesAsync)).join('\n')}
${(await Promise.all(postEntriesAsync)).join('\n')}
</urlset>
`,
  )
}

async function buildEntry(p: string): Promise<string> {
  const lastModified = await readLastModified(path.resolve(__dirname, '..', p))

  return `<url>
  <loc>${SITE_URL}/${p}</loc>
  <lastmod>${lastModified}</lastmod>
</url>`
}

main()
