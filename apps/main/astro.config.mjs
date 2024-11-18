import path from 'node:path'

import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import remarkDirective from 'remark-directive'

import * as libmdx from '@lib/mdx'
import { readFileSync } from 'node:fs'

import vercel from '../../vercel.json' assert { type: 'json' }

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
    contentLayer: true,
  },
  integrations: [
    react(),
    mdx({
      optimize: true,
      remarkPlugins: [remarkDirective, libmdx.remarkTransformerPlugin, libmdx.remarkLastmodPlugin],
      remarkRehype: {
        clobberPrefix: '',
        handlers: libmdx.remarkRehypeHandlers,
        footnoteLabel: '각주',
        footnoteLabelProperties: { class: 'no-screen' },
        footnoteLabelTagName: 'h3',
        footnoteBackLabel: (refIndex, rerefIndex) => {
          return `${refIndex + 1}${rerefIndex ? `-${rerefIndex}` : ''}번 참조로 돌아가기`
        },
      },
      shikiConfig: {
        theme: 'catppuccin-latte',
      },
    }),
    sitemap({
      filter: (page) => !page.startsWith(`https://sorto.me/frame`),
      lastmod: new Date(),
      serialize: (item) => {
        if (item.url.endsWith('/')) {
          item.url = item.url.slice(0, -1)
        }

        const pathname = new URL(item.url).pathname
        if (pathname.startsWith('/posts/')) {
          try {
            const contentPath = path.join(process.cwd(), 'src/markdowns', pathname, 'index.lastmod')
            const lastmod = readFileSync(contentPath)
            item.lastmod = lastmod.toString()
          } finally {
            return item
          }
        }

        if (pathname.startsWith('/docs/')) {
          try {
            const contentPath = path.join(process.cwd(), 'src/markdowns', `${pathname}.lastmod`)
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
  redirects: {
    '/docs/Web/CSS/:target': {
      destination: '/docs/Web/CSS/Pseudo-classes/:target',
      status: 308,
    },
  },
  site: 'https://sorto.me',
})
