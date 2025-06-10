import react from '@alattalatta/eslint-config/react'
import astro from 'eslint-plugin-astro'
import tselint from 'typescript-eslint'

export default tselint.config(
  react,
  ...astro.configs.recommended.map((c) => {
    const opts = c.languageOptions
    const baseParser = opts?.parser?.meta?.name
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const subParser = opts?.parserOptions?.parser?.meta?.name

    if (opts && (baseParser === ts || subParser === ts)) {
      opts.parserOptions = {
        ...opts.parserOptions,
        projectService: false,
        project: true,
      }
    }

    return c
  }),
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.astro'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'astro/sort-attributes': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
)
