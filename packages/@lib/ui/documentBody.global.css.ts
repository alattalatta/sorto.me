import { globalStyle } from '@vanilla-extract/css'

import exclamation from './assets/exclamation.png'
import external from './assets/external.svg'
import forbidden from './assets/forbidden.png'
import { root } from './documentBody.css'
import { vars } from './theme.css'

globalStyle(`${root} > *`, {
  margin: '1em 0', // intentional em
})

// headings
globalStyle(`${root} > :is(h2, h3, h4)`, {
  fontFamily: vars.fonts.serif,
  position: 'relative',
})
globalStyle(`${root} > :is(h2, h3, h4) a`, {
  color: 'inherit',
})
globalStyle(`${root} > :is(h2, h3, h4) a::after`, {
  content: 'none',
})

globalStyle(`${root} > h2`, {
  fontSize: '2rem',
  padding: '.25rem 0',
})

globalStyle(`${root} > h3`, {
  fontSize: '1.5rem',
})

globalStyle(`${root} > h4`, {
  fontSize: `${18 / 16}rem`,
})

// anchors
globalStyle(`${root} a`, {
  color: vars.colors.highlight,
  textDecoration: 'none',
})
globalStyle(`${root} a:hover`, {
  textDecoration: 'underline',
})
globalStyle(`${root} a[target=_blank]::before`, {
  content: '(외부 링크)',
  width: 1,
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
})
globalStyle(`${root} a[target=_blank]::after`, {
  content: `''`,
  width: '0.5em',
  height: '0.5em',
  background: `url(${external.src}) no-repeat`,
  backgroundSize: 'contain',
  display: 'inline-block',
  marginLeft: '0.125em',
  verticalAlign: 'super',
})

// blockquotes
globalStyle(`${root} blockquote`, {
  fontFamily: vars.fonts.serif,
  fontSize: '1rem',
  fontWeight: 500,
  padding: '1rem',
  position: 'relative',
})
globalStyle(`${root} blockquote::before, ${root} blockquote::after`, {
  fontSize: '1.5rem',
})
globalStyle(`${root} blockquote::before`, {
  content: `'“'`,
  position: 'absolute',
  top: '0.5rem',
  left: 0,
})
globalStyle(`${root} blockquote::after`, {
  content: `'”'`,
  position: 'absolute',
  right: 0,
  bottom: '0.5rem',
})
globalStyle(`${root} blockquote > *`, {
  margin: '1rem 0',
})
globalStyle(`${root} blockquote > cite`, {
  color: '#777',
  fontSize: `${10 / 16}rem`,
  fontStyle: 'normal',
  margin: 0,
  position: 'absolute',
  right: 0,
  bottom: 0,
})
globalStyle(`${root} blockquote > cite::before`, {
  content: `'— '`,
})

// noteboxes
globalStyle(`${root} .notebox`, {
  borderLeft: '.5rem solid',
  borderRadius: '.25rem',
  padding: '.5rem .5rem .5rem 1rem',
  position: 'relative',
})
globalStyle(`${root} .notebox::before`, {
  background: `center right / 1rem no-repeat`,
  display: 'inline-block',
  imageRendering: 'pixelated',
  fontSize: `${14 / 16}rem`,
  fontWeight: 700,
  paddingRight: `${20 / 16}rem`,
})
globalStyle(`${root} .notebox-note`, {
  background: '#F1FFFE',
  borderLeftColor: '#43E4DA',
})
globalStyle(`${root} .notebox-note::before`, {
  content: '참고',
})
globalStyle(`${root} .notebox-warn`, {
  background: '#FFFBDC',
  borderLeftColor: '#FFE400',
})
globalStyle(`${root} .notebox-warn::before`, {
  content: '주의',
  backgroundImage: `url(${exclamation.src})`,
})
globalStyle(`${root} .notebox-fatal`, {
  background: '#FEEBEB',
  borderLeftColor: '#FF5858',
})
globalStyle(`${root} .notebox-fatal::before`, {
  content: '경고',
  backgroundImage: `url(${forbidden.src})`,
})
globalStyle(`${root} .notebox > * + *`, {
  marginTop: '1rem',
})

// code blocks
globalStyle(`${root} pre`, {
  background: vars.colors.bg1,
  borderRadius: '.25rem',
  fontSize: `${14 / 16}rem`,
  overflow: 'auto',
  padding: '1rem !important',
})
globalStyle(`${root} pre[data-variant="good"]`, {
  border: '1px solid #43E4DA',
})
globalStyle(`${root} pre[data-variant="bad"]`, {
  border: '1px solid #FF5858',
})
globalStyle(`${root} > code`, {
  fontFamily: vars.fonts.mono,
  lineHeight: 18 / 14,
})

// list
globalStyle(`${root} li`, {
  margin: '.5rem 0',
})

globalStyle(`${root} dt`, {
  fontSize: `${14 / 16}rem`,
  fontWeight: 700,
  margin: '1.5rem 0 .5rem',
})

globalStyle(`${root} dd`, {
  margin: '.5rem 0 .5rem 3rem',
})
globalStyle(`${root} dd > * + *`, {
  marginTop: '1rem',
})

// table
globalStyle(`${root} table:not(.jsx)`, {
  borderCollapse: 'collapse',
  borderTop: `${1 / 16}rem solid ${vars.colors.fg0}`,
  borderBottom: `${1 / 16}rem solid ${vars.colors.fg0}`,
})
globalStyle(`${root} table:not(.jsx) th`, {
  background: vars.colors.bg1,
  border: `${1 / 16}rem solid $${vars.colors.fg0}`,
  padding: '.5rem 1rem',
})
globalStyle(`${root} table:not(.jsx) td`, {
  border: `${1 / 16}rem solid ${vars.colors.fg0}`,
  padding: '.5rem 1rem',
})

// etc
globalStyle(`${root} hr`, {
  maxWidth: `${219 / 16}rem`,
  border: 'none',
  borderTop: `1px solid ${vars.colors.fg0}`,
  margin: '5rem 0 3rem',
})

globalStyle(`${root} :is(i, em)`, {
  fontFamily: vars.fonts.serif,
  fontStyle: 'normal',
  fontWeight: 600,
})

globalStyle(`${root} img`, {
  maxWidth: '100%',
})

globalStyle(`${root} code:not(pre > code)`, {
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '0.25rem',
  display: 'inline-block',
  fontFamily: vars.fonts.mono,
  lineHeight: 1.2,
  padding: '0 0.25rem',
  textDecorationLine: 'inherit',
})