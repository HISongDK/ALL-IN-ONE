# 拖延列表

## 需求目的

为了可以给拖延中自己提供一些可选的备用事项，避免真的无所事事、完全沉浸在无意义的事和荒废事件的痛苦中。希望自己可以成为佩里老爷子那种高效的结构化拖延者

## 需求要点

1. 每日固定数据，当日修改记录状态持久化，次日重置

2. 支持重复项选择，即某些事项可以完成多次。

3.

## 技术方案

因为数据量不大，且需要变动显示自定义性比较强。

选择采用直接控制所有数据作为一个大状态

其他信息根据源数据状态派生处理
