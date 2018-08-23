<p align="center">
  <img width="320" src="http://otaflb4oo.bkt.clouddn.com/CX-UI-Design/Logo/CX-Grid-logo.png">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.3.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/releases">
    <img src="https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg" alt="GitHub release">
  </a>
</p>

简体中文 | [English](./README.md)

## 简介
`cx-grid` 为 `CX-UI Design` 框架生态中表单部分内容
`cx-grid` 是一个前端form生态组件集成解决方案，它基于 [Vue.js](https://github.com/vuejs/vue) 和 [element](https://github.com/ElemeFE/element)。它使用了最新的前端技术栈，内置了参数配置，字段配置，用法名自定义等很多功能特性，相信本项目都能帮助到你。

- [使用文档详见CX—UI Design](https://github.com/CX-UI-Design/CX-UI-DesignLICENSE)

**注意：该项目使用 element-ui@2.2.2+ 版本，所以最低兼容 vue@2.5.0+**

## 前序准备

你的本地环境需要安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。我们的技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) and [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

 **如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr**

 **该项目不支持低版本浏览器(如ie)，有需求请自行添加polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

 <p align="center">
  <img width="900" src="ttp://otaflb4oo.bkt.clouddn.com/CX-UI-Design/CX-Grid/grid-show.png-thumb_m2.2_s900.500">
</p>

## 功能
已开发功能
```
- Local or request head data 支持本地和请求表头数据
- grid abnormal display 支持三种数据错误状态的异常显示
- grid key refer 表格关键字段名配置化

- grid free config 支持表格多元化配置
- init dynamic size 支持动态计算尺寸 （初始化渲染动态）
- auto resize 支持表格高度是否自适应窗口变化
- free align 自定义单元格内容位置
- border 自定义边框
- col resizable  支持拖动改变列宽
- checkbox-col type  支持多选固定列

- radio-col type  支持单选固定列
- index-col type  支持索引固定列
- handle-col type 固定操作列类型拓展
- ation-col config  支持固定操作列自定义配置

- head operation show 支持表头模块显示
- head operation sort 支持表头排序

- add row operation 支持新增行操作
- delete row operation 支持删除行操作

- sum row 支持合计行显示
- sum data source 支持合计行数据来源配置
- sum fixed num 支持合计行 数字小数位配置

- panel 分页器显示
- panel layout 支持分页器组件组件布局配置
- page sizes 支持每页显示个数选择器的选项配置
- pager count 支持页码按钮的数量配置

- grid form cell 支持表格单元格表单配置
- grid check 支持表格单元格表单验证
- grid check custom 支持表格单元格表单自定义配置
- grid cell filter 支持表格单元格内容删选器转换
```
即将开功能
```
- JSON editor Json编辑器
- Rich text editor 富文本编辑器
- Markdown editor Markdown编辑器
- Map 地图
- Export excel 导出excel
- Export zip 导出zip
```

## 开发
```bash
# 克隆项目
git clone https://github.com/CX-UI-Design/cx-grid.git

# 安装依赖
npm install
   
# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
or
npm run start
```
浏览器访问 http://localhost:8083

## 发布
```bash
# 构建生成环境
npm run build
```
# 打包优化容积查看
npm run analyz
```

更多信息请参考 [使用文档项目 CX-UI Design](https://github.com/CX-UI-Design/CX-UI-Design)

## Online Demo
[Demo 示例](https://github.com/CX-UI-Design/cx-grid)

## Donate
如果你觉得这个项目帮助到了你，你可以帮作者买一杯咖啡表示鼓励 :tropical_drink:

![donate](http://p7sbfcwqc.bkt.clouddn.com/QR-code/WeChatAlipay.png)

## License

[MIT](https://github.com/CX-UI-Design/cx-grid/blob/master/LICENSE)

Copyright (c) 2018-present BroccoliSpring <Lensgcx@163.com>
