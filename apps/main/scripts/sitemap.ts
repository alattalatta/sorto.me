import fs from 'node:fs/promises'
import path from 'node:path'

import type { PostMetadata } from '@domain/blog'
import postsIndex from '@domain/blog/out/index.json' assert { type: 'json' }
import type { DocMetadata } from '@domain/docs'
import docsIndex from '@domain/docs/out/index.json' assert { type: 'json' }
import { filePath } from '@lib/functions/server'

const __dirname = filePath(import.meta.url)

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
  // [todo]
  const docEntriesAsync = (docsIndex as unknown as readonly DocMetadata[]).map(buildEntryFor('docs'))
  const postEntriesAsync = (postsIndex as unknown as readonly PostMetadata[]).map(buildEntryFor('posts'))

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
