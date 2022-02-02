import fs from 'fs'
import path from 'path'

import { parsePost, POST_FILES_PENDING } from 'utils/posts'

const PROJECT_ROOT = path.resolve(__dirname, '../..')

const SITE_URL = 'https://sorto.me'
const RSS_PATH = path.join(PROJECT_ROOT, 'public/rss.xml')

const prepend = (b: string) => (a: string): string => b + a

export async function main(): Promise<void> {
  const postSlugs = await POST_FILES_PENDING

  const postEntriesAsync = postSlugs.map(prepend('posts/')).reverse().map(buildEntry)

  try {
    fs.unlinkSync(RSS_PATH)
  } catch (_) {
    // eslint-disable-next-line no-empty
  }

  await fs.promises.writeFile(
    RSS_PATH,
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Sorto.me Blog</title>
  <link>https://sorto.me</link>
  <description>웹 프엔 개발하기</description>
  <language>ko</language>
  <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
${(await Promise.all(postEntriesAsync)).join('\n')}
</channel>
</rss>
`,
  )
}

async function buildEntry(subpath: string): Promise<string> {
  const filePath = path.join(PROJECT_ROOT, subpath)
  const source = await fs.promises.readFile(filePath)

  const { meta } = await parsePost(filePath, source)

  return `<item>
  <title>${meta.title}</title>
  <link>${SITE_URL}/${subpath.replace('.mdx', '')}?utm_medium=rss</link>
  <guid>${meta.slug}</guid>
  <description>${meta.description}</description>
  <pubDate>${meta.created}</pubDate>
</item>`
}
