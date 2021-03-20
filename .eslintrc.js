module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['@react-native-community'],
  plugins: ['simple-import-sort', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    JSX: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    curly: 'error',
    'func-names': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'off',
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'max-classes-per-file': 'off',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: 'return',
      },
    ],
    'jsx-quotes': ['error', 'prefer-single'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          ['^react', '^@?\\w'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'sort-imports': 'off',
  },
  ignorePatterns: [
    'src/components/OutlinedTextField/TextField',
    'metro.config.js',
    'rn-cli.config.js',
  ],
};
