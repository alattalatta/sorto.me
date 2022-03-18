import { createVar, globalStyle, style } from '@vanilla-extract/css'

import { theme as darkTheme } from './theme/dark.css'

const vars = {
  commentColor: createVar(),
  keywordColor: createVar(),
  stringLiteralColor: createVar(),
  tagColor: createVar(),
}

const root = style({
  lineHeight: 1.75,
  margin: '0 auto',
  wordBreak: 'keep-all',
  vars: {
    [vars.commentColor]: '#969896',
    [vars.keywordColor]: '#c53800',
    [vars.stringLiteralColor]: '#0056d6',
    [vars.tagColor]: '#008a67',
  },
})

globalStyle(`${darkTheme} ${root}`, {
  vars: {
    [vars.commentColor]: '#969896',
    [vars.keywordColor]: '#ff682d',
    [vars.stringLiteralColor]: '#4c94ff',
    [vars.tagColor]: '#27c19a',
  },
})

export { vars, root }
