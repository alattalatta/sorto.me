import { promises as fs } from 'fs'
import path from 'path'

import type { DocMetadata } from '@app/docs'
import docsIndex from '@app/docs/data/index.json'
import type { PostMetadata } from '@app/posts'
import postsIndex from '@app/posts/data/index.json'

const PROJECT_ROOT = path.resolve(__dirname, '..')

const SITE_URL = 'https://sorto.me'
const SITEMAP_PATH = path.join(PROJECT_ROOT, 'public/sitemap.md.xml')

const buildEntryFor =
  (target: 'docs' | 'posts') =>
  (metadata: DocMetadata | PostMetadata): string => {
    return `<url>
  <loc>${SITE_URL}/${target}/${metadata.slug}</loc>
  <lastmod>${metadata.updated}</lastmod>
</url>`
  }

export async function main(): Promise<void> {
  const docEntriesAsync = docsIndex.map(buildEntryFor('docs'))
  const postEntriesAsync = postsIndex.map(buildEntryFor('posts'))

  try {
    await fs.unlink(SITEMAP_PATH)
  } catch (_) {
    // eslint-disable-next-line no-empty
  }

  await fs.writeFile(
    SITEMAP_PATH,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(await Promise.all(docEntriesAsync)).join('\n')}
${(await Promise.all(postEntriesAsync)).join('\n')}
</urlset>
`,
  )
}
