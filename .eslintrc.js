require('@alattalatta/eslint-config/patch')

module.exports = {
  root: true,
  extends: ['plugin:astro/recommended', '@alattalatta/eslint-config/react'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: true,
      },
    },
  },
}
