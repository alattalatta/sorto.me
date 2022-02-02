import fs from 'fs'
import path from 'path'

import { getDocFiles } from 'utils/docs'
import { POST_FILES_PENDING } from 'utils/posts'
import { readLastModified } from 'utils/system'

const PROJECT_ROOT = path.resolve(__dirname, '../..')

const SITE_URL = 'https://sorto.me'
const SITEMAP_PATH = path.join(PROJECT_ROOT, 'public/sitemap.md.xml')

const prepend = (b: string) => (a: string): string => b + a

export async function main(): Promise<void> {
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
  const lastModified = await readLastModified(path.join(PROJECT_ROOT, p))

  return `<url>
  <loc>${SITE_URL}/${p.replace('.mdx', '')}</loc>
  <lastmod>${lastModified}</lastmod>
</url>`
}
