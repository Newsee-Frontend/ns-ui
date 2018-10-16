<template>
  <div class="grid-template">
    <div class="front-Logo">
      CX-GRID
      <i>Design</i>
    </div>
    <div class="template-btn">
      <el-button type="info" plain @click="shower(basicVisible)">基础用法示例</el-button>
      <el-button type="info" plain @click="shower(bussinessVisible)">业务二次封装示例</el-button>
      <el-button type="info" plain @click="shower(testVisible)">测试操作示例</el-button>
    </div>
    <basic-grid-template :visible="basicVisible" v-if="basicVisible.visible"></basic-grid-template>
    <bussiness-grid-template :visible="bussinessVisible" v-if="bussinessVisible.visible"></bussiness-grid-template>
    <test-grid-template :visible="testVisible" v-if="testVisible.visible"></test-grid-template>
  </div>
</template>

<script>
  import basicGridTemplate from './basic-grid/basic-grid-template'
  import bussinessGridTemplate from './bussiness-grid/bussiness-grid-template'
  import testGridTemplate from './test-grid/test-grid-template'

  export default {
    name: 'grid-template',
    data() {
      return {
        basicVisible: {visible: false},
        bussinessVisible: {visible: false},
        testVisible: {visible: false}
      }
    },
    components: {basicGridTemplate, bussinessGridTemplate, testGridTemplate},
    created() {

    },
    methods: {
      shower(sw) {
        sw.visible = !sw.visible;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .grid-template {
    position: absolute;
    top: 30%;
    width: 100%;
    .template-btn {
      text-align: center;
    }
    .front-Logo {
      text-align: center;
      font-size: 48px;
      font-style: normal;
      color: #ffffff;
      padding: 38px 0 30px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      i {
        font-size: 40px;
      }
    }
  }
</style>
