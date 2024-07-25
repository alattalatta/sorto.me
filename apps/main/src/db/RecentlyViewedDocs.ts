import Dexie, { type EntityTable } from 'dexie'

export type RecentlyViewedDoc = {
  description: string
  id: string
  pinned: 0 | 1
  title: string
  viewedAt: number
}

const db = new Dexie('RecentlyViewedDocs') as Dexie & {
  docs: EntityTable<RecentlyViewedDoc, 'id'>
}
db.version(1).stores({
  docs: 'id, pinned, viewedAt',
})

/** Pin or unpin an item. */
export async function pin(id: string, value: 0 | 1): Promise<void> {
  await db.docs.update(id, { pinned: value })
}

/** Update viewedAt and data if already registered. Else add as a new one. */
export async function update(title: string, description: string): Promise<void> {
  const pathname = window.location.pathname

  if (await db.docs.get({ id: pathname })) {
    await db.docs.update(pathname, {
      description,
      title,
      viewedAt: Date.now(),
    })
  } else {
    await db.docs.put({
      description,
      id: pathname,
      pinned: 0,
      title,
      viewedAt: Date.now(),
    })
  }
}

/** List pinned docs. */
export async function listPinned(): Promise<readonly RecentlyViewedDoc[]> {
  return db.docs.where({ pinned: 1 }).reverse().sortBy('viewedAt')
}

/** List unpinned docs. */
export async function listUnpinned(limit: number, offset?: number): Promise<readonly RecentlyViewedDoc[]> {
  return db.docs
    .where({ pinned: 0 })
    .limit(limit)
    .offset(offset ?? 0)
    .reverse()
    .sortBy('viewedAt')
}

export async function get(id: string): Promise<RecentlyViewedDoc | undefined> {
  return db.docs.get(id)
}
