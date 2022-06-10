import bcd from '@mdn/browser-compat-data'
import type { Identifier, SimpleSupportStatement } from '@mdn/browser-compat-data'

import { determineStatus, getCompatData, getSubIdentifierKeys, supportLabel } from '../docs'

describe('Docs utilities, browserCompat', () => {
  describe('getCompatData', () => {
    it('can get the requested compat data', async () => {
      const a = getCompatData(bcd, 'html.elements.a')

      expect(a?.__compat?.mdn_url).toBe('https://developer.mozilla.org/docs/Web/HTML/Element/a')
      expect(a?.['target'].__compat).toBeDefined()
    })

    it('returns null when requested with an invalid key', async () => {
      const a = getCompatData(bcd, 'html.elements.aa.cc')

      expect(a).toBe(null)
    })
  })

  describe('getSubIdentifierKeys', () => {
    const mock = {
      a: {} as unknown,
      b: {} as unknown,
      c: {} as unknown,
      ['__compat']: {} as unknown,
    } as Identifier

    it('can get all sub identifier keys of an identifier', () => {
      expect(getSubIdentifierKeys(mock)).toEqual(['a', 'b', 'c'])
    })
  })

  const unknown: SimpleSupportStatement = {
    version_added: null,
  }
  const yes: SimpleSupportStatement = {
    version_added: true,
  }
  const no: SimpleSupportStatement = {
    version_added: false,
  }
  const added: SimpleSupportStatement = {
    version_added: '81',
  }
  const removed: SimpleSupportStatement = {
    version_added: '33',
    version_removed: '80',
  }
  const removedWithoutAddition = {
    version_added: true,
    version_removed: '80',
  }

  describe('supportLabel', () => {
    it('can make a label for a support statement', () => {
      expect(supportLabel(unknown)).toBe('?')
      expect(supportLabel(yes)).toBe('지원')
      expect(supportLabel(no)).toBe('미지원')
      expect(supportLabel(added)).toBe('81')
      expect(supportLabel(removed)).toBe('33 ~ 80')
      expect(supportLabel(removedWithoutAddition)).toBe('? ~ 80')
    })
  })

  describe('determineStatus', () => {
    it('can determine status for of a support statement', () => {
      expect(determineStatus(unknown)).toBe('unknown')
      expect(determineStatus(yes)).toBe('yes')
      expect(determineStatus(no)).toBe('no')
      expect(determineStatus(added)).toBe('added')
      expect(determineStatus(removed)).toBe('removed')
      expect(determineStatus(removedWithoutAddition)).toBe('removed')
    })
  })
})
