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
      rules: {
        // https://github.com/ota-meshi/eslint-plugin-astro/issues/240
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'astro/sort-attributes': 'warn',
        'react/jsx-key': 'off',
        'react/jsx-sort-props': 'off',
        'react/self-closing-comp': 'off',
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
