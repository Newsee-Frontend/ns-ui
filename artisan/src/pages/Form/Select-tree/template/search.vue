<!--UI 组件库 - Select-tree basic- 页面测试-->
<template>
  <demo-block>
    <template slot="title">search 搜索模式</template>
    <template slot="describe">显示值，模式，排序，节点 设置</template>
    <template slot="content">
      <ns-select-tree
        v-model="selectTreeModel"
        :options="selectTreeOptions"
        :multiple="true"
        :isFuzzyMatching="isFuzzyMatching"
        :filterMatchKeys="filterMatchKeys"
        :flattenSearchResults="flattenSearchResults"
      >
      </ns-select-tree>
      <pre class="result">{{ selectTreeModel }}</pre>
      <div class="control">
        <div class="control-block form-block-line">
          <span>是否启用模糊查询:</span>
          <ns-switch v-model="isFuzzyMatching"></ns-switch>
        </div>
        <div class="control-block form-block-line">
          <span>是否启用扁平化的搜索结果:</span>
          <ns-switch v-model="flattenSearchResults"></ns-switch>
        </div>
      </div>
    </template>
  </demo-block>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'select-tree-demo-model',
    data() {
      return {
        selectTreeModel: [],
        isFuzzyMatching: true,//是否启用模糊查询（前端查询)
        flattenSearchResults: false,//扁平化的搜索结果，父子节点以扁平化的展示形式出现
        filterMatchKeys: ['label'],
      };
    },
    computed: {
      ...mapGetters(['selectTreeOptions']),
    },
    methods: {},
    created() {

    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
