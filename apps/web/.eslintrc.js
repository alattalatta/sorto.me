module.exports = {
  root: true,
  extends: ['eslint:recommended', 'next', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    eqeqeq: ['error', 'always'],
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent', 'index']],
      },
    ],
    'prettier/prettier': 'warn',
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: {
          memberTypes: [
            'public-field',
            'protected-field',
            'private-field',
            'public-method',
            'protected-method',
            'private-method',
          ],
          order: 'alphabetically',
        },
      },
    ],
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_+', ignoreRestSiblings: true }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: process.env.NODE_ENV === 'production' ? './tsconfig.json' : 'apps/web/tsconfig.json',
      },
    },
  },
}
