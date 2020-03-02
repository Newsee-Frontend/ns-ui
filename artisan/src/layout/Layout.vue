<template>
  <ns-layout>
    <template slot="header">
      <!--左logo 插槽 - 根据实际情况插入业务组图片 -->
      <div class="fl">
        <img src="../assets/img/logo/logo-white-120X50.png" alt="head-logo">
      </div>

      <!--业务组 - 自定义头部模块 -->
      <div class="fl">
        <header-custom></header-custom>
      </div>

      <!--右边 - 用户下拉菜单 业务组在插槽内调用组件，传入值，并且调用方法即可  -->
      <div class="fr">
        <ns-screenfull></ns-screenfull>
        <biz-skiner></biz-skiner>
        <ns-user-dropdown
          :options="options"
          :avator="avatar"
          :userName="userName"
          trigger="click"
          @click="userDropdownClick"
        >
        </ns-user-dropdown>
      </div>
    </template>

    <!--侧边栏 - 业务组直接调用封装的侧边栏组件即可 -->
    <template slot="sidebar">
      <biz-nav-menu></biz-nav-menu>
    </template>

    <!--history task-tabs link-->
    <template slot="tabs-view">
      <biz-tabs-views></biz-tabs-views>
    </template>

    <!--工作台模块 - 嵌入路由视图即可 -->
    <template slot="app-main">
      <!--changing-over  work bench module-->
      <transition leave-active-class="" enter-active-class="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </template>

    <template slot="other">
      <right-panel>
        <biz-settings/>
      </right-panel>
    </template>

  </ns-layout>
</template>

<script>

  import { mapGetters } from 'vuex';
  import headerCustom from './components/header-custom';
  import BizSkiner from './components/Biz-skiner/Biz-skiner';
  import BizNavMenu from './components/Biz-nav-menu/Biz-nav-menu';
  import RightPanel from './components/Right-panel/Right-panel';
  import BizSettings from './components/Biz-settings/Biz-settings';


  export default {
    name: 'layout',
    components: { headerCustom, BizSkiner, BizNavMenu, BizSettings, RightPanel },
    data() {
      return {
        options: [
          { label: '修改密码', value: 'editPassword' },
          { label: '退出登录', value: 'logout' },
        ],
        dialogTit: '',
        dialogVisible: {
          editPasswordVisible: { visible: false },
        },
        operatorInfo: {},
      };
    },
    computed: {
      ...mapGetters(['userName', 'avatar']),
      key() {
        return this.$route.name !== undefined
          ? this.$route.name + +new Date()
          : this.$route + +new Date();
      },
    },
    methods: {
      userDropdownClick(value, index) {
        console.log('userDropdownClick');
        console.log(value, index);
        if (value === 'editPassword') {

        }
        else if (value === 'logout') {

        }
      },
    },
    created() {

    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
