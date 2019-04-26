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
        <ns-skiner @change-theme="changeTheme" :init-theme="theme"></ns-skiner>
        <user-dropdown
          :options="options"
          :avator="avatar"
          :userName="userName"
          trigger="click"
          @click="userDropdownClick"
        >
        </user-dropdown>
      </div>
    </template>

    <!--侧边栏 - 业务组直接调用封装的侧边栏组件即可 -->
    <template slot="sidebar">
      <ns-sidebar :type="sidebarType"
                  :data="sideBarList"
                  :jumpByNavEmpty="jumpByNavEmpty"
                  :showTimeout="200"
                  :hideTimeout="200"
                  :keyRefer="keyRefer"
                  @first-nav-click="firstNavClick"
                  @mouse-enter="mouseEnter">
        <span slot="firstNav0">

        </span>
      </ns-sidebar>
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

  </ns-layout>
</template>

<script>

  import { mapGetters } from 'vuex';
  import headerCustom from './header-custom';
  import keyRefer from './sidebar-keyRefer';

  export default {
    name: 'layout',
    components: { headerCustom },
    data() {
      return {
        dialogSw: false,
        options: [
          { label: '修改密码', value: 'editPassword' },
          { label: '退出登录', value: 'logout' },
        ],
        dialogTit: '',
        dialogVisible: {
          editPasswordVisible: { visible: false },
        },
        sidebarType: 'collapse', //bubble,collapse
        jumpByNavEmpty: true,
        keyRefer: keyRefer,
        operatorInfo: {},
      };
    },
    computed: {
      ...mapGetters(['userName', 'avatar', 'theme', 'sideBarList']),
      key() {
        return this.$route.name !== undefined
          ? this.$route.name + +new Date()
          : this.$route + +new Date();
      },
    },
    created() {
      this.$store.dispatch('generateSideBar');
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
      /**
       * first nav click handle
       * @param index
       * @param item
       */
      firstNavClick(index, item) {
        // if (index === 0) {
        //   this.jumpByNavEmpty = false;
        // }
        console.log(index, item);
        if (index === 0) {
          this.dialogSw = true;
        }
        else {
          this.dialogSw = false;
        }
      },

      /**
       * nav mouse event
       * @param index
       * @param item
       */
      mouseEnter(index, item) {
        console.log('mouseEvent-mouseEvent');
        console.log(index, item);
      },
      changeTheme(key) {
        console.log('changeTheme-changeTheme');
        console.log(key);
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .slipDialog-side {
    z-index: 1;
  }
</style>
