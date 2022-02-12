// @mdx-js packages are ESM and cause multiple issues in ts-node

require('esbuild')
  .build({
    entryPoints: ['./compiler/index.ts'],
    outfile: './compiler/index.js',
    bundle: true,
    external: ['@swc/core'],
    platform: 'node',
    target: 'node16',
  })
  .then(() => console.log('Done building mdx compiler.'))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
