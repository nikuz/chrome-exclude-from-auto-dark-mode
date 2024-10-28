import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'no-empty': ['error', { 'allowEmptyCatch': true }],
            'indent': ['error', 4],
            'object-shorthand': ['error'],
            'quote-props': ['error', 'as-needed'],
            'no-param-reassign': ['error'],
            '@typescript-eslint/no-unused-vars': ['error', { 'caughtErrors': 'none' }],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-empty-function': 'off',
        },
    },
)