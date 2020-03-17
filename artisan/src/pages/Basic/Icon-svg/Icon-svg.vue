<!--UI 组件库 - Icon-svg - 页面测试-->
<template>
  <div class="win">
    <demo-block>
      <template slot="title">图标-SVG 用法</template>
      <template slot="describe">基础用法</template>
      <template slot="content">
        <ns-icon-svg icon-class="fold"></ns-icon-svg>
        <ns-icon-svg icon-class="renwu"></ns-icon-svg>
        <ns-icon-svg icon-class="bianji-"></ns-icon-svg>
        <ns-icon-svg icon-class="shujugongxiang"></ns-icon-svg>
        <ns-button type="primary">
          搜索
          <ns-icon-svg icon-class="sousuo" @click="svgClick"></ns-icon-svg>
        </ns-button>
      </template>
    </demo-block>
    <demo-block>
      <template slot="title">图标-SVG 用法2</template>
      <template slot="describe">基础用法2</template>
      <template slot="content">
        <ns-icon-svg icon-class="bug"></ns-icon-svg>
      </template>
    </demo-block>
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
