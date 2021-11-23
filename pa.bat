@echo off
setlocal enabledelayedexpansion
title GIT一键提交ALL-IN-ONE
color 3
chcp 65001

echo;
echo 当前目录为: %cd%

if not %cd% == C:\Users\14944\Desktop\ALL-IN-ONE (
echo 跳转目录到: ALL-IN-ONE
cd C:\Users\14944\Desktop\ALL-IN-ONE
echo 当前目录为: !cd!
if !cd! == C:\Users\14944\Desktop\ALL-IN-ONE ( echo 跳转成功 ) else ( echo 跳转失败 )
echo;
)

echo 添加变更
git add .
echo 查看状态
git status
echo;
echo 提交代码
set /p message=请输入 commit 信息:
git commit -m "%message%"
echo 推送代码
echo;
git push

explorer https://github.com/HISongDK/ALL-IN-ONE


:: 暂停命令 输出为空
:: pause > nul




