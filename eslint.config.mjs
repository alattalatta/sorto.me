import react from '@alattalatta/eslint-config/react'
import astro from 'eslint-plugin-astro'
import tselint from 'typescript-eslint'

export default tselint.config(react, ...astro.configs.recommended, {
  languageOptions: {
    parserOptions: {
      project: true,
      projectService: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    'astro/sort-attributes': 'warn',
  },
})
