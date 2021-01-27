import { styled } from 'utils/styler'

import { Container } from './Container'

const AlignLeft = styled('div', {
  textAlign: 'left',
})

const AboutBody: React.VFC = () => {
  return (
    <Container>
      <AlignLeft>
        <h1>alattalatta</h1>
        <p>Web front-end developer</p>
        <ul>
          <li>
            <a href="https://github.com/alattalatta">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/%EC%A2%85%EB%A5%A0-%EC%96%91-9a740b14b/">LinkedIn</a>
          </li>
        </ul>
      </AlignLeft>
    </Container>
  )
}

export default AboutBody
