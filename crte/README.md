# React TypeScript ESLint

## 简介

使用 create-react-app 脚手架初始化项目。配置 typescript,代码风格及格式采用 eslint + prettier。

目的：用于学习演练技术（demo 演练场）

## 技术栈

### 主要技术

- React
  - react-router-dom
  - easy-peasy
- craco
  - craco-less
- TypeScript

### 代码规范及格式

- ESLint
  - eslint-config-alloy
  - eslint-config-prettier
  - eslint-config-prettier
  - @typescript-eslint/parser
  - @typescript-eslint/eslint-plugin
- prettier

### less & sass

1. sass: create-react-app 集成 sass ，只需要安装 sass 即可使用
2. less: 因为使用的 craco 打包项目，可以直接安装 craco-less,在 craco 的配置文件中添加一下 plugin 即可
