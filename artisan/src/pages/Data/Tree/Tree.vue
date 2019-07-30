<!--UI 组件库 - Tree - 页面测试-->
<template>
  <div class="tree-wrapper">
    <!--默认 tree-->
    <normal-tree></normal-tree>

    <!--缓存 tree-->
    <vuex-tree></vuex-tree>

    <!--懒加载tree-->
    <lazy-tree></lazy-tree>

    <!--多选 tree-->
    <multiple-tree></multiple-tree>
  </div>
</template>

<script>
  import normalTree from './template/normal-tree'
  import vuexTree from './template/vuex-tree'
  import lazyTree from './template/lazy-tree'
  import multipleTree from './template/multiple-tree'

  export default {
    name: '',

    components: {
      normalTree,
      vuexTree,
      lazyTree,
      multipleTree
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .title-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .title-icon {
    float: right;
    color: #20a0ff;
  }
</style>
