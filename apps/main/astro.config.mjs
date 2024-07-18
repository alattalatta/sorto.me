import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import remarkDirective from 'remark-directive'

import * as foo from '@lib/mdx'

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      optimize: true,
      remarkPlugins: [remarkDirective, foo.remarkPlugin],
      remarkRehype: {
        handlers: foo.remarkRehypeHandlers,
      },
      shikiConfig: {
        theme: 'catppuccin-latte',
      },
    }),
    react(),
    sitemap({
      serialize: (item) => {
        if (item.url.endsWith('/')) {
          item.url = item.url.slice(0, -1)
        }

        return item
      },
    }),
  ],
  site: 'https://sorto.me',
})
