import { main as rss } from './rss'
import { main as sitemap } from './sitemap'

Promise.all([rss(), sitemap()]).catch(console.error)
