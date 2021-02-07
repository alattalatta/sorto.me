import { getCompatData } from '../browserCompat'

describe('Docs utilities, browserCompat', () => {
  describe('getCompatData', () => {
    it('can get the requested compat data', async () => {
      const a = await getCompatData(['html', 'elements', 'a'])

      expect(a?.__compat?.mdn_url).toBe('https://developer.mozilla.org/docs/Web/HTML/Element/a')
      expect(a?.['target'].__compat).toBeDefined()
    })

    it('returns null when requested with an invalid key', async () => {
      const a = await getCompatData(['html', 'element', 'aa', 'cc'])

      expect(a).toBe(null)
    })
  })
})
