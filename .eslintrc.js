require('@alattalatta/eslint-config/patch')

module.exports = {
  extends: [process.env.NODE_ENV === 'production' ? '@alattalatta/eslint-config/full' : '@alattalatta/eslint-config'],
  parserOptions: {
    project: ['./apps/*/tsconfig.json', './packages/**/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./apps/*/tsconfig.json', './packages/**/tsconfig.json'],
      },
    },
  },
}
