import { styled } from 'utils/styler'

import { Container } from './Container'
import { Anchor } from './basics'

const AlignLeft = styled('div', {
  textAlign: 'left',
})

const AboutBody: React.VFC = () => {
  return (
    <Container>
      <AlignLeft>
        <h1>alattalatta</h1>
        <p>
          Web front-end developer
          <br />
          <Anchor href="mailto:urty5656@gmail.com">urty5656@gmail.com</Anchor>
        </p>
        <ul>
          <li>
            <Anchor href="https://github.com/alattalatta">GitHub</Anchor>
          </li>
          <li>
            <Anchor href="https://www.linkedin.com/in/%EC%A2%85%EB%A5%A0-%EC%96%91-9a740b14b/">LinkedIn</Anchor>
          </li>
        </ul>
      </AlignLeft>
    </Container>
  )
}

export default AboutBody
