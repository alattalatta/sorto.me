const preset = require('@alattalatta/prettier-config')

module.exports = {
  ...preset,
  embeddedLanguageFormatting: 'off',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  plugins: ['prettier-plugin-astro'],
}
