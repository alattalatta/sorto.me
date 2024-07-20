import path from 'node:path'

import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import remarkDirective from 'remark-directive'

import * as libmdx from '@lib/mdx'
import { readFileSync } from 'node:fs'

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      optimize: true,
      remarkPlugins: [remarkDirective, libmdx.remarkTransformerPlugin, libmdx.remarkLastmodPlugin],
      remarkRehype: {
        handlers: libmdx.remarkRehypeHandlers,
      },
      shikiConfig: {
        theme: 'catppuccin-latte',
      },
    }),
    react(),
    sitemap({
      lastmod: new Date(),
      serialize: (item) => {
        if (item.url.endsWith('/')) {
          item.url = item.url.slice(0, -1)
        }

        const pathname = new URL(item.url).pathname
        if (pathname.startsWith('/posts/')) {
          try {
            const contentPath = path.join(process.cwd(), 'src/content', pathname, 'index.lastmod')
            const lastmod = readFileSync(contentPath)
            item.lastmod = lastmod.toString()
          } finally {
            return item
          }
        }

        if (pathname.startsWith('/docs/')) {
          try {
            const contentPath = path.join(process.cwd(), 'src/content', `${pathname}.lastmod`)
            const lastmod = readFileSync(contentPath)
            item.lastmod = lastmod.toString()
          } finally {
            return item
          }
        }

        item.lastmod = undefined
        return item
      },
    }),
  ],
  site: 'https://sorto.me',
})
