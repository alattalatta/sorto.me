import external from './assets/external.svg'
import { styled } from './stitches'

const Root = styled('div', {
  '& > *': {
    margin: '1rem 0',
  },
  '& h2': {
    fontFamily: `'Noto Serif KR', serif`,
    fontSize: '1.5rem',
    fontWeight: 700,
    padding: '0.5rem 0',
  },
  '& h3': {
    fontFamily: `'Noto Serif KR', serif`,
    fontSize: `${18 / 16}rem`,
    fontWeight: 700,
  },
  '& h4': {
    fontFamily: `'Noto Serif KR', serif`,
    fontSize: '1rem',
    fontWeight: 700,
  },
  '& > p': {
    lineHeight: 1.31,
    '& a': {
      color: '#0CA79D',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
      '&[target=_blank]::before': {
        content: '(외부 링크)',
        width: 1,
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
      },
      '&[target=_blank]::after': {
        content: `''`,
        width: '0.5rem',
        height: '0.5rem',
        background: `url(${external}) no-repeat`,
        backgroundSize: 'contain',
        display: 'inline-block',
        fontSize: `${10 / 16}rem`,
        verticalAlign: 'super',
      },
    },
  },
  // inline code
  '& code:not(pre > code)': {
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '0.25rem',
    display: 'inline-block',
    lineHeight: 1,
    padding: '0.25rem',
    textDecorationLine: 'inherit',
  },
})

export { Root as DocumentBody }
