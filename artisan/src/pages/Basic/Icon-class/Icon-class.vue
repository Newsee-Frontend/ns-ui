<!--UI 组件库 - Icon-class - 页面测试-->
<template>
  <div class="win">
    <ns-icon-class icon-class="el-icon-edit"></ns-icon-class>
    <ns-icon-class icon-class="el-icon-share"></ns-icon-class>
    <ns-icon-class icon-class="el-icon-delete"></ns-icon-class>
    <ns-button type="success">
      搜索
      <ns-icon-class icon-class="el-icon-search" @click="classClick"></ns-icon-class>
    </ns-button>

    <ns-icon-class icon-class="setting"></ns-icon-class>
  </div>
</template>

<script>
  export default {
    name: 'icon-class-demo',
    data() {
      return {};
    },
    computed: {},
    created() {

    },
    methods: {
      classClick() {
        console.log('class-click');
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
