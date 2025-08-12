// @ts-check

import pluginReact from '@eslint-react/eslint-plugin'
// @ts-expect-error
import pluginReactHooks from 'eslint-plugin-react-hooks'

// @ts-expect-error
import { tanstackConfig } from '@tanstack/config/eslint'

import unusedImports from 'eslint-plugin-unused-imports'

export default [
    ...tanstackConfig,
    {
        name: 'tanstack-react-themes/temp',
        rules: {
            '@typescript-eslint/no-unsafe-function-type': 'off',
            'no-shadow': 'off',
        },
    },
    {
        files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    },
    {
        plugins: {
            'react-hooks': pluginReactHooks,
            '@eslint-react': pluginReact,
            'unused-imports': unusedImports,
        },
        rules: {
            '@eslint-react/no-unstable-context-value': 'off',
            '@eslint-react/no-unstable-default-props': 'off',
            '@eslint-react/dom/no-missing-button-type': 'off',
            'react-hooks/exhaustive-deps': 'error',
            'react-hooks/rules-of-hooks': 'error',
            '@typescript-eslint/no-unused-vars': 'off',
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
]
