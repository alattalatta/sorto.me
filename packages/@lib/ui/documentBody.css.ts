import { createVar, globalStyle, style } from '@vanilla-extract/css'

import { theme as darkTheme } from './theme/dark.css'

const vars = {
  blue: createVar(),
  faded: createVar(),
  green: createVar(),
  orange: createVar(),
  yellow: createVar(),
}

const root = style({
  lineHeight: 1.75,
  margin: '0 auto',
  wordBreak: 'keep-all',
  vars: {
    [vars.blue]: '#0056d6',
    [vars.faded]: '#767676',
    [vars.green]: '#008a67',
    [vars.orange]: '#c53800',
    [vars.yellow]: '#a78d00',
  },
})

globalStyle(`${darkTheme} ${root}`, {
  vars: {
    [vars.blue]: '#4c94ff',
    [vars.faded]: '#969896',
    [vars.green]: '#27c19a',
    [vars.orange]: '#ff682d',
    [vars.yellow]: '#ceb424',
  },
})

export { vars, root }
