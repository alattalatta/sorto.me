import { colors } from '@lib/ui/theme.css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('main .gsc-control-cse', {
  background: 'none',
  border: 'none',
  marginTop: '1.5rem',
  padding: 0,
})

globalStyle('main .gsc-above-wrapper-area', {
  borderBottom: 'none',
})

globalStyle('main .gsc-control-cse .gsc-results', {
  width: '100%',
})

globalStyle('main .gsc-control-cse .gsc-result', {
  border: 'none',
  padding: '0.75rem 0',
})

globalStyle('main .gsc-control-cse .gs-title', {
  color: colors.highlight,
  overflow: 'visible',
})
globalStyle('main .gsc-control-cse .gs-title:hover', {
  textDecoration: 'underline',
})

globalStyle('main .gsc-control-cse .gs-visibleUrl-breadcrumb', {
  color: 'inherit',
  marginTop: '.25em',
})

globalStyle('main .gsc-control-cse .gs-snippet', {
  color: 'inherit',
  fontSize: '1rem',
  marginTop: '.25em',
})

globalStyle('main .gsc-control-cse b', {
  background: colors.bg1,
  color: 'inherit !important',
  textDecoration: 'underline',
})
