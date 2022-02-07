import external from './assets/external.svg'
import { styled } from './stitches'

const Root = styled('div', {
  lineHeight: 1.5,
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
      marginLeft: '0.125em',
      verticalAlign: 'top',
    },
  },
  // blockquote
  '& blockquote': {
    fontFamily: `'Noto Serif KR', serif`,
    fontSize: '1em',
    fontWeight: 500,
    padding: '1em',
    position: 'relative',
    '&::before, &::after': {
      fontSize: '1.5em',
    },
    '&::before': {
      content: `'“'`,
      position: 'absolute',
      top: '0.5em',
      left: 0,
    },
    '&::after': {
      content: `'”'`,
      position: 'absolute',
      right: 0,
      bottom: '0.5em',
    },
    '& > * + *': {
      marginTop: '1em',
    },
    '& cite': {
      color: '#777',
      fontSize: `${10 / 16}em`,
      fontStyle: 'normal',
      margin: 0,
      position: 'absolute',
      right: 0,
      bottom: 0,
      '&::before': {
        content: `'— '`,
      },
    },
  },
  // inline code
  '& code:not(pre > code)': {
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '0.25em',
    display: 'inline-block',
    // lineHeight: 1,
    padding: '0 0.25em',
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
  '& hr': {
    maxWidth: `${219 / 16}rem`,
    color: '#2c2c2c',
    margin: '3em 0',
  },
})

export { Root as DocumentBody }
