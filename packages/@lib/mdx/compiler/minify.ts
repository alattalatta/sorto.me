import { minify as swcMini } from '@swc/core'

async function minify(content: string): Promise<string> {
  // can't minify it directly since it's a function body without its function declaration, which is syntax error
  // by wrapping it in a function declaration swc can minify it as a whole function
  return String((await swcMini(`(()=>{${content}})()`, { compress: true, mangle: true })).code.slice(6, -4))
}

export { minify }
