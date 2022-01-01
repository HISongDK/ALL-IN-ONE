module.exports = {
  syntax: 'less',
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'selector-list-comma-newline-after': 'always',
    'order/properties-order': [],
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
  },
}
