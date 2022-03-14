import { createVar, style } from '@vanilla-extract/css'

export const commentColor = createVar()
export const keywordColor = createVar()
export const stringLiteralColor = createVar()
export const tagColor = createVar()

export const root = style({
  lineHeight: 1.5,
  margin: '0 auto',
  vars: {
    [commentColor]: '#969896',
    [keywordColor]: '#d33c00',
    [stringLiteralColor]: '#0056d6',
    [tagColor]: '#008a67',
  },
})
