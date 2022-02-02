import { childrenToText, sanitizeID } from '../element'

describe('Element utilities', () => {
  describe('childrenToText', () => {
    it('can return text content of a shallow React node', () => {
      const el = (
        <h1>
          Foo <span>Bar</span>
        </h1>
      )

      expect(childrenToText(el)).toBe('Foo Bar')
    })

    it('can return text content of deep React node', () => {
      const el = (
        <article>
          <header>
            <h1>News</h1>{' '}
            <div>
              This can return a string! <span>Or not!</span>
            </div>
          </header>
        </article>
      )

      expect(childrenToText(el)).toBe('News This can return a string! Or not!')
    })

    it('can return text content of a custom React component', () => {
      const Component: React.FC = ({ children }) => <span>blah {children}</span>
      const el = (
        <div>
          <Component>yadda</Component>
        </div>
      )

      expect(childrenToText(el)).toBe('yadda') // no hadrdcoded texts
    })

    it('can return text content of a list of nodes', () => {
      const el = Array(3)
        .fill(0)
        .map((_, i) => <li key={i}>{i}</li>)

      expect(childrenToText(el)).toBe('012')
    })

    it('can return text content of a Fragment', () => {
      const el = (
        <>
          <div>hi</div> <div>bye</div>
        </>
      )

      expect(childrenToText(el)).toBe('hi bye')
    })

    it('can return an empty string, given an empty node', () => {
      expect(childrenToText(null)).toBe('')
    })
  })

  describe('sanitizeID', () => {
    it('can sanitize whitespaces', () => {
      expect(sanitizeID('a b')).toBe('a-b')
      expect(sanitizeID('a      b')).toBe('a-b')
      expect(sanitizeID('   a ')).toBe('a')
      expect(sanitizeID('\na\n \n\tb\n')).toBe('a-b')
    })

    it('can sanitize special chars', () => {
      expect(sanitizeID('</ab>')).toBe('ab')
      expect(sanitizeID('mama~')).toBe('mama')
      expect(sanitizeID('!important')).toBe('important')
      expect(sanitizeID('12한중일34')).toBe('12한중일34')
      expect(sanitizeID('#🥥')).toBe('🥥')
      expect(sanitizeID('37%0x88')).toBe('370x88')
    })
  })
})
