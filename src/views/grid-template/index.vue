<template>
  <div class="grid-template">
    <div class="template-btn">
      <el-button type="primary" size="small" @click="shower(basicVisible)">基础用法示例</el-button>
      <el-button type="primary" size="small" @click="shower(bussinessVisible)">业务二次封装示例</el-button>
    </div>
    <basicGridTemplate :visible="basicVisible" v-if="basicVisible.visible"></basicGridTemplate>
    <bussinessGridTemplate :visible="bussinessVisible" v-if="bussinessVisible.visible"></bussinessGridTemplate>
  </div>
</template>

<script>
  import basicGridTemplate from './basic-grid-template'
  import bussinessGridTemplate from './bussiness-grid-template'

  export default {
    name: 'grid-template',
    data() {
      return {
        basicVisible: {visible: false},
        bussinessVisible: {visible: false}
      }
    },
    components: {basicGridTemplate, bussinessGridTemplate},
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
    .template-btn {
      margin-top: 200px;
      text-align: center;
    }
  }
</style>
