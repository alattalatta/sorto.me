import external from './assets/external.svg'
import { styled } from './stitches'

const Root = styled('div', {
  // fontSize: '1.5rem',
  margin: '0 auto',
  '& > *': {
    margin: '1em 0',
  },
  '& > h2': {
    fontFamily: `'Noto Serif KR', serif`,
    fontSize: '2em',
    fontWeight: 700,
    padding: '0.25em 0',
  },
  '& > h3': {
    fontFamily: `'Noto Serif KR', serif`,
    fontSize: '1.5em',
    fontWeight: 700,
  },
  '& > h4': {
    fontFamily: `'Noto Serif KR', serif`,
    fontSize: '1em',
    fontWeight: 700,
  },
  '& p': {
    lineHeight: 1.5,
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
        width: '0.5em',
        height: '0.5em',
        background: `url(${external}) no-repeat`,
        backgroundSize: 'contain',
        display: 'inline-block',
        fontSize: `${10 / 16}em`,
        verticalAlign: 'top',
      },
    },
  },
  // inline code
  '& code:not(pre > code)': {
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '0.25em',
    display: 'inline-block',
    lineHeight: 1,
    padding: '0.25em',
    textDecorationLine: 'inherit',
  },
  // code block
  '& pre': {
    background: '#f2f2f2',
    borderLeft: '.5rem solid #ccc',
    fontFamily: `'Nanum Gothic Coding', '나눔고딕코딩', monospace`,
    fontSize: `${14 / 16}em`,
    lineHeight: 18 / 14,
    overflow: 'auto',
    padding: '.5rem',
    '&[data-variant="good"]': {
      background: '#EDF9E9',
      borderLeftColor: '#94FF40',
    },
    '&[data-variant="bad"]': {
      background: '#FEEBEB',
      borderLeftColor: '#FF5858',
    },
    '& > code': {
      background: 'none !important',
    },
    '& .hljs-tag': {
      color: '#ed6a43',
    },
  },
  '& li': {
    margin: '.5em 0',
  },
})

export { Root as DocumentBody }
