import { colors } from '@lib/ui/theme.css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('main .gsc-control-cse', {
  marginTop: '1.5rem',
  padding: 0,
})

globalStyle('main .gsc-control-cse .gsc-result', {
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
