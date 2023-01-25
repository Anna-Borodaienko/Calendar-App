module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'jest': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'project': './tsconfig.json'
  },
  'plugins': [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'prettier/prettier': ['error']
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
