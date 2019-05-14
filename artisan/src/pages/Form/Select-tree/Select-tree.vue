<!--UI 组件库 - Select-tree - 页面测试-->
<template>
  <div>
    <!--基础属性用法-->
    <selectTreeDemoBasic></selectTreeDemoBasic>
    <!--空值显示设定-->
    <selectTreeDemoEmpty></selectTreeDemoEmpty>
    <!--model/value 相关显示用法-->
    <selectTreeDemoModel></selectTreeDemoModel>
    <!--搜索模式 相关显示用法-->
    <selectTreeDemoSearch></selectTreeDemoSearch>
    <!--事件示例用法-->
    <selectTreeDemoEvent></selectTreeDemoEvent>
  </div>
</template>

<script>
  import selectTreeDemoBasic from './template/basic';
  import selectTreeDemoEmpty from './template/empty';
  import selectTreeDemoModel from './template/model';
  import selectTreeDemoSearch from './template/search';
  import selectTreeDemoEvent from './template/event';

  export default {
    name: 'select-tree-demo',
    components: { selectTreeDemoBasic, selectTreeDemoEmpty, selectTreeDemoModel, selectTreeDemoSearch, selectTreeDemoEvent },
    data() {
      return {};
    },
    computed: {},
    methods: {},
    created() {
      this.$store.dispatch('generateSelectTree');
    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
