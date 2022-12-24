## SmartAgricultur

![login.png](https://github.com/OvO-git/SmartAgriculture/blob/main/image/login.png?raw=true)

![main.png](https://github.com/OvO-git/SmartAgriculture/blob/main/image/main.png?raw=true)

## 功能介绍

本智慧农业管理系统，管理员或子账号可以登陆后台可以实现对加湿器、温度计、日光灯、排风扇等设备增添管理以及状态控制并监控运行天数等。

## 开发环境

开发框架：express

前端：express-art-template、Bootstrap、JQuery

开发环境：Node-v18.8.0

## 数据库表设计

用户表

| 字段名   | 描述     |
| -------- | -------- |
| ID       | ID号     |
| email    | 邮箱     |
| password | 密码     |
| username | 用户名   |
| role     | 用户属性 |
| state    | 用户状态 |

设备表

| 字段名      |   描述   |
| ----------- | :------: |
| eq_id       |  设备ID  |
| eq_name     |  设备名  |
| eq_state    | 设备状态 |
| eq_dm       | 设备类型 |
| eq_usage_tm | 添加时间 |
