module.exports = {
  settings: {
    'import/core-modules': ['styled-jsx/css'],
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],

  plugins: ['import', 'react', 'jsx-a11y', 'prettier', '@typescript-eslint'],

  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  rules: {
    'no-shadow': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,

    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': [1, { ignore: ['children'] }],
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    // camelcase: 0,
    'react-hooks/exhaustive-deps': 1,
    'react/function-component-definition': 0,
    'react/button-has-type': 0,

    'jsx-a11y/href-no-hash': ['off'],
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,

    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-shadow': ['error'],

    // ?????????????????????????????????????????????????????????????????????
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // ????????????????????????
    'import/extensions': 0,
    /**
     * ???????????????????????????????????????????????????????????? TS ??????????????????????????????
     * ???????????????????????? alias ??????
     * ???????????????????????????
     */
    'import/no-unresolved': 0,
  },
}
