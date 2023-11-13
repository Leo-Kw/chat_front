module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'no-cond-assign': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 'error',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // 表示探测当前 node_modules 安装的 react 版本
    },
  },
}
