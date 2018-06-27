<template>
  <div class="grid-template">
    <div class="template-btn">
      <el-button type="primary" size="small" @click="shower(basicVisible)">基础用法示例</el-button>
      <el-button type="primary" size="small" @click="shower(bussinessVisible)">业务二次封装示例</el-button>
      <el-button type="primary" size="small" @click="shower(testVisible)">测试操作示例</el-button>
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
    top: 40%;
    width: 100%;
    .template-btn {
      text-align: center;
    }
  }
</style>
