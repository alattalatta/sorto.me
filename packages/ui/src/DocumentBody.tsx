import exclamation from './assets/exclamation.png'
import external from './assets/external.svg'
import forbidden from './assets/forbidden.png'
import { styled } from './stitches'

const Root = styled('div', {
  lineHeight: 1.5,
  margin: '0 auto',
  '& > *': {
    margin: '1em 0',
  },
  '& > :is(h2, h3, h4)': {
    fontFamily: `'Noto Serif KR', serif`,
    position: 'relative',

    '& a': {
      color: 'inherit',
      '&::after': {
        content: 'none',
      },
    },
  },
  '& > h2': {
    fontSize: '2em',
    padding: '0.25em 0',
  },
  '& > h3': {
    fontSize: '1.5em',
  },
  '& > h4': {
    fontSize: '1em',
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
      background: `url(${external.src}) no-repeat`,
      backgroundSize: 'contain',
      display: 'inline-block',
      marginLeft: '0.125em',
      verticalAlign: 'top',
    },
  },
  '& hr': {
    maxWidth: `${219 / 16}rem`,
    color: '#2c2c2c',
    margin: '3em 0',
  },
  '& :is(i, em)': {
    fontFamily: `'Noto Serif KR', serif`,
    fontStyle: 'normal',
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

    '& > *': {
      margin: '1em 0',
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
  // callout
  '& .callout': {
    borderLeft: '.5em solid',
    padding: '.5em .5em .5em 1em',
    position: 'relative',
    '&::before': {
      background: `center right / ${16 / 14}em no-repeat`,
      display: 'inline-block',
      imageRendering: 'pixelated',
      fontSize: `${14 / 16}em`,
      fontWeight: 700,
      paddingRight: `${20 / 14}em`,
    },
    '&.callout-note': {
      background: '#F1FFFE',
      borderLeftColor: '#43E4DA',
      '&::before': {
        content: '참고',
      },
    },
    '&.callout-warn': {
      background: '#FFFBDC',
      borderLeftColor: '#FFE400',
      '&::before': {
        content: '주의',
        backgroundImage: `url(${exclamation.src})`,
      },
    },
    '&.callout-fatal': {
      background: '#FEEBEB',
      borderLeftColor: '#FF5858',
      '&::before': {
        content: '경고',
        backgroundImage: `url(${forbidden.src})`,
      },
    },

    '& > * + *': {
      marginTop: '1em',
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
  // list
  '& li': {
    margin: '.5em 0',
  },
  '& dt': {
    fontWeight: 700,
    margin: '1.5em 0 .5em',
  },
  '& dd': {
    margin: '.5em 0 .5em 3em',

    '& > * + *': {
      margin: '1em 0',
    },
  },
  // table
  '& table': {
    borderCollapse: 'collapse',
    borderTop: `${1 / 16}em solid #2c2c2c`,
    borderBottom: `${1 / 16}em solid #2c2c2c`,
  },
  '& th': {
    background: '#f2f2f2',
    border: `${1 / 16}em solid #2c2c2c`,
    padding: '.5em 1em',
  },
  '& td': {
    border: `${1 / 16}em solid #2c2c2c`,
    padding: '.5em 1em',
  },
})

export { Root as DocumentBody }
