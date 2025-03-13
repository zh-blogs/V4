import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
)
