import * as documentBody from '@lib/ui/documentBody.css'
import { globalStyle } from '@vanilla-extract/css'

import '@lib/ui/documentBody.global.css'

globalStyle('.hljs-comment', {
  color: documentBody.commentColor,
})

globalStyle('.hljs-attribute, .hljs-attr, .hljs-emphasis, .hljs-keyword, .hljs-link', {
  color: documentBody.keywordColor,
})

globalStyle('.hljs-regexp, .hljs-string, .hljs-selector-class', {
  color: documentBody.stringLiteralColor,
})

globalStyle(
  '.hljs-built_in, .hljs-bullet, .hljs-name, .hljs-number, .hljs-selector-tag, .hljs-template-tag, .hljs-type',
  {
    color: documentBody.tagColor,
  },
)
