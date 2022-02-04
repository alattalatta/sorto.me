import { Splash, styled } from '@app/ui'

const Root = styled('main', {
  display: 'flex',
})

const Column = styled('section', {
  width: `${300 / 16}rem`,
  minWidth: `${300 / 16}rem`,
})

const Label = styled('h1', {
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
        <Column>
          <Label>alattalatta</Label>
        </Column>
        <Column>
          <Label>library</Label>
          <Item>
            <a href="https://www.npmjs.com/package/k-popo">k-popo</a>
          </Item>
        </Column>
        <Column>
          <Label>experiments</Label>
          <Item>
            <a href="https://dialog98.sorto.me/">dialog98</a>
          </Item>
        </Column>
        <Column>
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
        </Column>
        <Column>
          <Label>contact</Label>
          <Item>
            <a href="mailto:alattalatta@sorto.me">@sorto.me</a>
          </Item>
        </Column>
      </Root>
    </Splash>
  )
}

export default IndexBody
