require('@alattalatta/eslint-config/patch')

module.exports = {
  root: true,
  extends: [
    process.env.NODE_ENV === 'production' ? '@alattalatta/eslint-config/full' : '@alattalatta/eslint-config',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals',
  ],
  parserOptions: {
    project: ['./apps/**/tsconfig.json', './apps/**/tsconfig.script.json', './packages/**/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./apps/**/tsconfig.json', './apps/**/tsconfig.script.json', './packages/**/tsconfig.json'],
      },
    },
    next: {
      rootDir: 'apps/web',
    },
  },
}
