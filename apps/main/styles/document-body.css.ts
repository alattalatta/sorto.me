import { vars } from '@lib/ui/documentBody.css'
import { colors } from '@lib/ui/theme.css'
import { globalStyle } from '@vanilla-extract/css'

import '@lib/ui/documentBody.global.css'

globalStyle('.token.punctuation', {
  color: colors.fg3,
})

globalStyle('.token.comment', {
  color: vars.faded,
})

globalStyle('.token.function', {
  color: vars.green,
})

globalStyle('.token.string', {
  color: vars.blue,
})

// #region html
globalStyle('.token.doctype, .token.doctype > .punctuation', {
  color: vars.faded,
})
globalStyle('.token.doctype > .name', {
  color: vars.orange,
})

globalStyle('.token.tag', {
  color: vars.orange,
})

// attributes
globalStyle('.token.attr-name', {
  color: vars.green,
})
globalStyle('.token.attr-value, .token.attr-value > .punctuation', {
  color: vars.blue,
})
globalStyle('.token.attr-value > .punctuation.attr-equals', {
  color: colors.fg0,
})
// #endregion

// #region css
globalStyle('.language-css', {
  color: vars.yellow,
})

globalStyle('.token.selector, .token.rule', {
  color: vars.orange,
})

globalStyle('.token.property', {
  color: vars.green,
})

globalStyle('.token.unit', {
  color: vars.orange,
})

globalStyle('.token.url', {
  color: vars.blue,
})
// #endregion

// #region js
globalStyle('.token.keyword', {
  color: vars.orange,
})

globalStyle('.token.variable', {
  color: vars.orange,
})

globalStyle('.token.interpolation-punctuation', {
  color: vars.orange
})

globalStyle('.token.property-access', {
  color: vars.yellow
})

globalStyle('.token.property-access.method', {
  color: vars.green
})
// #endregion
