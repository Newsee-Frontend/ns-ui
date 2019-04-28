<!--UI 组件库 - Steps - 页面测试-->
<template>
  <div class="step-wrapper">
    <ns-steps id="step" :space="300" :active="active">
      <ns-step title="上传文件"  icon="el-icon-upload" description="这是一段很长很长很长的描述性文字"></ns-step>
      <ns-step title="导入数据"  description="这是一段很长很长很长的描述性文字"></ns-step>
      <ns-step title="导入完成"  description="这是一段很长很长很长的描述性文字"></ns-step>
    </ns-steps>

    <ns-steps :active="1" finish-status="success" simple style="width: 600px">
      <ns-step title="步骤 1" ></ns-step>
      <ns-step title="步骤 2" ></ns-step>
      <ns-step title="步骤 3" ></ns-step>
    </ns-steps>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        active: 2
      };
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

</style>
