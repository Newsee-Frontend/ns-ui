<!--UI 组件库 - Progress - 页面测试-->
<template>
  <div class="progress-wrapper">
    <ns-progress   type="circle" :stroke-width="18"  :percentage="30"  color="#c0c200" :width="300"> </ns-progress>
  </div>
</template>

<script>
  export default {
    name: 'progress',
    data() {
      return {
        percentage: 11
      };
    },
    computed: {},
    created() {

    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
