import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

import type { PostMetadata } from '@domain/blog'

import postsIndex from '../../out/posts/index.json'

const PROJECT_ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../..')

const SITE_URL = 'https://sorto.me'
const RSS_PATH = path.join(PROJECT_ROOT, 'public/rss.xml')

const buildEntry = (metadata: PostMetadata): string => {
  return `<item>
  <title>${metadata.title}</title>
  <link>${SITE_URL}/posts/${metadata.slug}?utm_medium=rss</link>
  <guid>${metadata.slug}</guid>
  <description>${metadata.description}</description>
  <pubDate>${metadata.created}</pubDate>
</item>`
}

export async function main(): Promise<void> {
  const postEntriesAsync = postsIndex.map(buildEntry)

  try {
    await fs.unlink(RSS_PATH)
  } catch (_) {
    // eslint-disable-next-line no-empty
  }

  await fs.writeFile(
    RSS_PATH,
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>sorto.me</title>
  <link>https://sorto.me</link>
  <language>ko</language>
  <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
${(await Promise.all(postEntriesAsync)).join('\n')}
</channel>
</rss>
`,
  )
}
