import type { Page } from '@lib/ui'
import { Anchor, styled } from '@lib/ui'

import { Splash } from './Splash'

const Label = styled('h2', {
  fontSize: '1em',
  margin: 0,
})

const Item = styled('div', {
  '* + &': {
    marginTop: `${10 / 16}rem`,
  },
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
})

const HomePage: Page = () => {
  return (
    <Splash>
      <main>
        <Label as="h1">alattalatta</Label>
        <section>
          <Label>library</Label>
          <Item>
            <Anchor href="https://www.npmjs.com/package/k-popo">k-popo</Anchor>
          </Item>
        </section>
        <section>
          <Label>experiments</Label>
          <Item>
            <Anchor href="https://dialog98.sorto.me/">dialog98</Anchor>
          </Item>
        </section>
        <section>
          <Label>enter</Label>
          <Item>
            <Anchor href="/posts">blog</Anchor>
          </Item>
          <Item>
            <Anchor href="/docs/Web">docs</Anchor>
          </Item>
          <Item>
            <Anchor href="https://github.com/alattalatta">github</Anchor>
          </Item>
        </section>
        <section>
          <Label>contact</Label>
          <Item>
            <Anchor href="mailto:alattalatta@sorto.me">@sorto.me</Anchor>
          </Item>
        </section>
      </main>
    </Splash>
  )
}

export { HomePage }
