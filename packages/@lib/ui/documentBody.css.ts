import { createVar, style } from '@vanilla-extract/css'

const vars = {
  commentColor: createVar(),
  keywordColor: createVar(),
  stringLiteralColor: createVar(),
  tagColor: createVar(),
}

const root = style({
  lineHeight: 1.5,
  margin: '0 auto',
  vars: {
    [vars.commentColor]: '#969896',
    [vars.keywordColor]: '#d33c00',
    [vars.stringLiteralColor]: '#0056d6',
    [vars.tagColor]: '#008a67',
  },
})

export { vars, root }
