import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Anchor from '../Anchor'

describe('Automatic Anchor', () => {
  it('should have no href when disabled', () => {
    const target = renderTarget(
      <Anchor disabled href="/whatever">
        target
      </Anchor>,
    )

    expect(target).not.toHaveAttribute('href')
    expect(target).toHaveAttribute('aria-disabled')
  })

  it('should navigate to a fragment in the current tab', () => {
    const target = renderTarget(<Anchor href="#target">target</Anchor>)

    expect(target).not.toHaveAttribute('target', '_blank')
  })

  it('should navigate to local origin URLs in the current tab', () => {
    const target = renderTarget(<Anchor href="/whatever">target</Anchor>)

    expect(target).not.toHaveAttribute('target', '_blank')
  })

  it('should navigate to relative URLs in the current tab', () => {
    const target = renderTarget(<Anchor href="../whatever">target</Anchor>)

    expect(target).not.toHaveAttribute('target', '_blank')
  })

  it('should navigate to other URLs in a new tab', () => {
    const target = renderTarget(<Anchor href="https://example.org/">target</Anchor>)

    expect(target).toHaveAttribute('target', '_blank')
  })
})

function renderTarget(element: JSX.Element): HTMLElement {
  const { getByText } = render(element)
  return getByText('target')
}
