import { media } from '@lib/ui/theme.css'
import { style } from '@vanilla-extract/css'

const TOC_WIDTH = 136

const TOC_VISIBLE = media.w2
/** 1334 */
const TOC_FLOATING = '(min-width: 83.375rem)'

export const grid = style({
  padding: '0 1rem',

  '@media': {
    [TOC_VISIBLE]: {
      display: 'grid',
      gap: '1rem',
      gridTemplateAreas: `
        'article toc'
      `,
      gridTemplateColumns: `1fr ${TOC_WIDTH / 16}rem`,
    },
    [TOC_FLOATING]: {
      marginRight: `-${(TOC_WIDTH + 32) / 16}rem`,
      gap: '2rem',
    },
  },
})

export const toc = style({
  display: 'none',
  gridArea: 'toc',
  paddingTop: `${56 / 16}rem`,

  '@media': {
    [TOC_VISIBLE]: {
      display: 'block',
    },
  },
})

export const article = style({
  gridArea: 'article',
  overflowX: 'hidden',
})

export const articleBody = style({
  marginTop: '2rem',
})
