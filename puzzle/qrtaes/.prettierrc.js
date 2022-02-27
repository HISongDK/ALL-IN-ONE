module.exports = {
  printWidth: 80, // 单行字符数
  tabWidth: 2, // tab 宽度
  useTabs: false, // 不使用 tab
  semi: false, // 不加分号
  singleQuote: true, // 单引号
  quoteProps: 'as-needed',
  jsxSingleQuote: false, // jsx 双引号
  trailingComma: 'all', // 元素后逗号
  bracketSpacing: true, // 空格内空白
  arrowParens: 'always', // 箭头函数括号
  rangeStart: 0, // 起始
  rangeEnd: Infinity, // 结束
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'auto', // 行尾符
  overrides: [
    {
      files: '.stylelintrc',
      options: {
        parser: 'json',
      },
    },
  ],
}
