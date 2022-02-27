module.exports = {
  syntax: 'less',
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'selector-list-comma-newline-after': 'always',
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': false,
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],

    // 不会指定校验模式，默认只接受-相连，就先关了
    'selector-class-pattern': null,
  },
}
