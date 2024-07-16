const preset = require('@alattalatta/prettier-config')

module.exports = {
  ...preset,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '*.mdx',
      options: {
        embeddedLanguageFormatting: 'off',
      },
    },
  ],
  plugins: ['prettier-plugin-astro'],
}
