import { Splash, styled } from '@lib/ui'

const Root = styled('main', {})

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

const IndexBody: React.VFC = () => {
  return (
    <Splash>
      <Root>
        <Label as="h1">alattalatta</Label>
        <section>
          <Label>library</Label>
          <Item>
            <a href="https://www.npmjs.com/package/k-popo">k-popo</a>
          </Item>
        </section>
        <section>
          <Label>experiments</Label>
          <Item>
            <a href="https://dialog98.sorto.me/">dialog98</a>
          </Item>
        </section>
        <section>
          <Label>enter</Label>
          <Item>
            <a href="/posts">blog</a>
          </Item>
          <Item>
            <a href="/docs/Web">docs</a>
          </Item>
          <Item>
            <a href="https://github.com/alattalatta">github</a>
          </Item>
        </section>
        <section>
          <Label>contact</Label>
          <Item>
            <a href="mailto:alattalatta@sorto.me">@sorto.me</a>
          </Item>
        </section>
      </Root>
    </Splash>
  )
}

export default IndexBody
