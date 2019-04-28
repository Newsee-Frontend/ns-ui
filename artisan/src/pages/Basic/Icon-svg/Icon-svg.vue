<!--UI 组件库 - Icon-svg - 页面测试-->
<template>
  <div>
    <ns-icon-svg icon-class="fold"></ns-icon-svg>
    <ns-icon-svg icon-class="renwu"></ns-icon-svg>
    <ns-icon-svg icon-class="bianji-"></ns-icon-svg>
    <ns-icon-svg icon-class="shujugongxiang"></ns-icon-svg>
    <ns-button type="primary">
      搜索
      <ns-icon-svg icon-class="sousuo" @click="svgClick"></ns-icon-svg>
    </ns-button>
  </div>
</template>

<script>
  export default {
    name: 'icon-svg-demo',
    data() {
      return {};
    },
    created() {

    },
    methods: {
      svgClick() {
        console.log('svg-click');
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
