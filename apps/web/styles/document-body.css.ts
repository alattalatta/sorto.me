import { vars } from '@lib/ui/documentBody.css'
import { globalStyle } from '@vanilla-extract/css'

import '@lib/ui/documentBody.global.css'

globalStyle('.hljs-comment', {
  color: vars.commentColor,
})

globalStyle('.hljs-title.hljs-function, .hljs-attribute, .hljs-attr, .hljs-emphasis, .hljs-link', {
  color: vars.tagColor,
})

globalStyle('.hljs-regexp, .hljs-string, .hljs-selector-class', {
  color: vars.stringLiteralColor,
})

globalStyle(
  '.hljs-keyword, .hljs-built_in, .hljs-bullet, .hljs-name, .hljs-number, .hljs-selector-tag, .hljs-template-tag, .hljs-type',
  {
    color: vars.keywordColor,
  },
)
