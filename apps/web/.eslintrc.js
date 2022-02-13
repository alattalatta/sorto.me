// use root config only when building
module.exports =
  process.env.NODE_ENV === 'production'
    ? {}
    : {
        parserOptions: {
          project: ['apps/web/tsconfig.json'],
          tsconfigRootDir: __dirname,
        },
        settings: {
          'import/resolver': {
            typescript: {
              project: ['apps/web/tsconfig.json'],
            },
          },
        },
      }
