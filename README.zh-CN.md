<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
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
`cx-easy-form` 为 `CX-UI Design` 框架生态中表单部分内容
`cx-easy-form` 是一个前端form生态组件集成解决方案，它基于 [Vue.js](https://github.com/vuejs/vue) 和 [element](https://github.com/ElemeFE/element)。它使用了最新的前端技术栈，内置了i18国际化解决方案，参数配置，字段配置，用法名自定义等很多功能特性，相信本项目都能帮助到你。

- [使用文档详见CX—UI Design](https://github.com/CX-UI-Design/CX-UI-DesignLICENSE)

**注意：该项目使用 element-ui@2.2.2+ 版本，所以最低兼容 vue@2.5.0+**

## 前序准备

你的本地环境需要安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。我们的技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) and [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

 **如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr**

 **该项目不支持低版本浏览器(如ie)，有需求请自行添加polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

 <p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>

## 功能
已开发功能
```
- Icon 图标
- Button 按钮
- Radio 单选框
- Checkbox 多选框
- Select 选择器
- Cascader 级联选择器
- Switch 开关
- Slider 滑块
- TimePicker 时间选择器
- DatePicker 日期选择器
- DateTimePicker 日期时间选择器
- Upload 上传
- Transfer 穿梭框
- Avatar 头像图片
- Separator 分割操作线
- base table 基础表单
- Text 文字标签
- Role check btn 按钮权限
- Role manage range 数据权限范围
- Role employee 员工角色
- Role group 角色组操作
- Role authorizer 授权人操作
- Simple tree 简单树状组件
- Simple tree select 下拉内置树状组件
- Area linkage 地域选择
- Customer info linkage 选人信息联动
- Customer info single 搜索选人
- Time interval 时间频率
- Dialog 对话框
- Auto form 动态数据表单
- Local form 静态数据表单
- Muster item 表单单元体
- Auto form operation 表单按钮操作模块
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
git clone https://github.com/CX-UI-Design/cx-easy-form.git

# 安装依赖
npm install
   
# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```
浏览器访问 http://localhost:8083

## 发布
```bash
# 构建生成环境
npm run build
```

更多信息请参考 [使用文档项目 CX-UI Design](https://github.com/CX-UI-Design/CX-UI-Design)

## Online Demo
[Demo 示例](https://github.com/CX-UI-Design/cx-easy-form)

## Donate
如果你觉得这个项目帮助到了你，你可以帮作者买一杯咖啡表示鼓励 :tropical_drink:

![donate](http://p7sbfcwqc.bkt.clouddn.com/QR-code/WeChatAlipay.png)

## License

[MIT](https://github.com/CX-UI-Design/cx-easy-form/blob/master/LICENSE)

Copyright (c) 2018-present BroccoliSpring <Lensgcx@163.com>
