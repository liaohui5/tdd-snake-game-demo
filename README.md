## 介绍

TDD 开发方式实现 vue 版本的贪食蛇, 单元测试主要用到以下几个库

- vitest
- @vue/test-utils
- pinia

## 安装

```sh
git clone https://github.com/liaohui5/tdd-snake-game-demo.git && cd -
npm i
```

## 启动

- 看效果

```sh
npm run dev
```

- 看测试

```sh
npm run test
```

## 问题

- 频繁更新 DOM 性能太差, 使用 https://pixijs.com/ 重写一个
