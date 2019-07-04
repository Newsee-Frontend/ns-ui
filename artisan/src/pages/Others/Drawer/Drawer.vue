<!--UI 组件库 - Drawer - 页面测试-->
<template>
  <demo-block>
    <template slot="title">Drawer - 抽屉</template>
    <template slot="describe">基础用法</template>
    <template slot="content">
      <div class="drawer-container">
        <ns-drawer speed="600ms" direction="right" transition="ease-in">
          <h3>drawer-demo-1</h3>
        </ns-drawer>
      </div>
      <div class="drawer-container">
        <ns-drawer speed="600ms" direction="left" transition="ease-in">
          <h3>drawer-demo-2</h3>
        </ns-drawer>
      </div>
      <div class="drawer-container">
        <ns-drawer speed="600ms" direction="top" transition="ease-in">
          <h3>drawer-demo-3</h3>
        </ns-drawer>
      </div>
      <div class="drawer-container">
        <ns-drawer speed="600ms" direction="bottom" transition="ease-in">
          <h3>drawer-demo-4</h3>
        </ns-drawer>
      </div>
    </template>
  </demo-block>
</template>

<script>
  export default {
    name: 'drawer-demo',
    data() {
      return {};
    },
    computed: {},
    created() {

    },
    methods: {},
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .drawer-container {
    display: inline-block;
    width: 250px;
    height: calc(100vh - 500px);
    margin-left: 20px;
    float: left;
    h3 {
      width: 100%;
      height: 18px;
      margin-top: 20px;
      text-align: center;
      overflow: hidden;
    }
    &:nth-child(1) {
      margin-left: 0;
      .ns-drawer {
        background-color: #ff3a38;
      }
    }
    &:nth-child(2) {
      .ns-drawer {
        background-color: #ff9f76;
      }
    }
    &:nth-child(3) {
      .ns-drawer {
        background-color: #f1ff9b;
      }

    }
    &:nth-child(4) {
      .ns-drawer {
        background-color: #a1ff9f;
      }
    }
  }
</style>
