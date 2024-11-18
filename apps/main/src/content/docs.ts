import type { CollectionEntry } from 'astro:content'

export function getShortTitle(doc: CollectionEntry<'docs'>): string {
  return doc.data.titleShort ?? doc.data.title
}
