<!--架构组 - 基础组件调试 - Uploader 图片上传 组件-->
<template>
  <div class="TestDemo">
    <test-content></test-content>
  </div>

</template>

<script>
  import testContent from './components/testContent'
  import create from '../../../src/utils/create';

  export default create({
    name: 'TestDemo',
    components: {testContent},
  })
</script>

<style rel="stylesheet/scss" lang="scss">
  .TestDemo {
    color: #44bb00;
  }

</style>
