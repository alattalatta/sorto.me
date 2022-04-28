import { mapOver } from '../array'

describe('Array utilities', () => {
  describe('mapOver', () => {
    const mapFn = (a: number): number => a * 2

    it('can map over an array', () => {
      const data = [1, 2, 3]
      expect(mapOver(data, mapFn)).toEqual([2, 4, 6])
    })

    it('can map over a single value', () => {
      const data = 4
      expect(mapOver(data, mapFn)).toEqual([8])
    })
  })
})
