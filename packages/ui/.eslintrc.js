require('@alattalatta/eslint-config/patch')

module.exports = {
  extends: ['@alattalatta/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: process.env.NODE_ENV === 'production' ? './tsconfig.json' : 'apps/web/tsconfig.json',
      },
    },
  },
}
