import exclamation from './assets/exclamation.png'
import external from './assets/external.svg'
import forbidden from './assets/forbidden.png'
import { styled } from './stitches'

const Root = styled('div', {
  lineHeight: 1.5,
  margin: '0 auto',

  '$stx-comment': '#969896',
  '$stx-keyword': '#008a67',
  '$stx-string': '#0056d6',
  '$stx-tag': '#d33c00',

  '& > *': {
    margin: '1rem 0',
  },
  '& > :is(h2, h3, h4)': {
    fontFamily: '$serif',
    position: 'relative',

    '& a': {
      color: 'inherit',
      '&::after': {
        content: 'none',
      },
    },
  },
  '& > h2': {
    fontSize: '2rem',
    margin: '.5rem 0',
    padding: '.25rem 0',
  },
  '& > h3': {
    fontSize: '1.5rem',
    margin: `1rem 0`,
  },
  '& > h4': {
    fontSize: '1rem',
  },
  '& a': {
    color: '$highlight',
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
      background: `url(${external.src}) no-repeat`,
      backgroundSize: 'contain',
      display: 'inline-block',
      marginLeft: '0.125rem',
      verticalAlign: 'top',
    },
  },
  '& hr': {
    maxWidth: `${219 / 16}rem`,
    color: '$fg',
    margin: '3rem 0',
  },
  '& :is(i, em)': {
    fontFamily: '$serif',
    fontStyle: 'normal',
  },
  // blockquote
  '& blockquote': {
    fontFamily: '$serif',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '1rem',
    position: 'relative',
    '&::before, &::after': {
      fontSize: '1.5rem',
    },
    '&::before': {
      content: `'“'`,
      position: 'absolute',
      top: '0.5rem',
      left: 0,
    },
    '&::after': {
      content: `'”'`,
      position: 'absolute',
      right: 0,
      bottom: '0.5rem',
    },

    '& > *': {
      margin: '1rem 0',
    },
    '& cite': {
      color: '#777',
      fontSize: `${10 / 16}rem`,
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
    borderLeft: '.5rem solid',
    padding: '.5rem .5rem .5rem 1rem',
    position: 'relative',
    '&::before': {
      background: `center right / 1rem no-repeat`,
      display: 'inline-block',
      imageRendering: 'pixelated',
      fontSize: `${14 / 16}rem`,
      fontWeight: 700,
      paddingRight: `${20 / 16}rem`,
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
      marginTop: '1rem',
    },
  },
  // inline code
  '& code:not(pre > code)': {
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '0.25rem',
    display: 'inline-block',
    fontFamily: '$mono',
    fontSize: '1rem',
    padding: '0 0.25rem',
    textDecorationLine: 'inherit',
  },
  // code block
  '& pre': {
    background: '$bgSuppl',
    fontSize: `${14 / 16}rem`,
    overflow: 'auto',
    padding: '1rem !important',
    '&[data-variant="good"]': {
      border: '1px solid #43E4DA',
    },
    '&[data-variant="bad"]': {
      border: '1px solid #FF5858',
    },
    '& > code': {
      fontFamily: '$mono',
      lineHeight: 18 / 14,
    },
  },
  // list
  '& li': {
    margin: '.5rem 0',
  },
  '& dt': {
    fontWeight: 700,
    margin: '1.5rem 0 .5rem',
  },
  '& dd': {
    margin: '.5rem 0 .5rem 3rem',

    '& > * + *': {
      margin: '1rem 0',
    },
  },
  // table
  '& table:not(.jsx)': {
    borderCollapse: 'collapse',
    borderTop: `${1 / 16}rem solid $fg`,
    borderBottom: `${1 / 16}rem solid $fg`,

    '& th': {
      background: '$bgSuppl',
      border: `${1 / 16}rem solid $fg`,
      padding: '.5rem 1rem',
    },
    '& td': {
      border: `${1 / 16}rem solid $fg`,
      padding: '.5rem 1rem',
    },
  },
})

export { Root as DocumentBody }
