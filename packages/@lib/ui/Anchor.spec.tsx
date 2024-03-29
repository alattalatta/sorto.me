import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import jsdomGlobal from 'jsdom-global'

import { Anchor } from './Anchor'

jsdomGlobal(undefined, { url: 'http://example.org/' })
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

test.afterEach.always(cleanup)

test.serial('should not have _blank target for a fragment', (t) => {
  const target = renderTarget(<Anchor href="#target">target</Anchor>)
  t.not(target.getAttribute('target'), '_blank')
})

test.serial('should not have _blank target for a local origin URL', (t) => {
  const target = renderTarget(<Anchor href="/whatever">target</Anchor>)
  t.not(target.getAttribute('target'), '_blank')
})

test.serial('should not have _blank target for a relative URL', (t) => {
  const target = renderTarget(<Anchor href="../whatever">target</Anchor>)
  t.not(target.getAttribute('target'), '_blank')
})

test.serial('should have _blank target for an external URL', (t) => {
  const target = renderTarget(<Anchor href="https://example.org/">target</Anchor>)
  t.is(target.getAttribute('target'), '_blank')
})

function renderTarget(element: JSX.Element): HTMLElement {
  const { getByText } = render(element)
  return getByText('target')
}
