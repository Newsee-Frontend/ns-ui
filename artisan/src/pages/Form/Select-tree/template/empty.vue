<!--UI 组件库 - Select-tree empty - 页面测试-->
<template>
  <demo-block>
    <template slot="title">empty 各类空值空值情况相关文字显示示例</template>
    <template slot="describe">Options空值，子节点空值，</template>
    <template slot="content">
      <ns-select-tree
        v-model="selectTreeModel"
        :options="options"
        :multiple="true"
        :noOptionsText="noOptionsText"
        :noResultsText="noResultsText"
      >
      </ns-select-tree>
      <pre class="result">{{ selectTreeModel }}</pre>
      <div class="control">
        <div class="control-block form-block-line">
          <span>切换Options空值:</span>
          <ns-switch v-model="isOptionsEmpty"></ns-switch>
          <span>Options 空值显示设定:</span>
          <ns-input v-model="noOptionsText" placeholder="请输入Options空值显示文字" size="medium"></ns-input>
        </div>
        <div class="control-block form-block-line">
          <span>搜索结果空值显示设定:</span>
          <ns-input v-model="noResultsText" placeholder="请输入搜索结果空值显示设定" size="medium"></ns-input>
        </div>
        <div class="control-block form-block-line">
          <span>子节点为空值显示设定:</span>
          <ns-input v-model="noChildrenText" placeholder="请输入子节点为空值显示设定" size="medium"></ns-input>
        </div>
      </div>
    </template>
  </demo-block>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'select-tree-demo-empty',
    data() {
      return {
        selectTreeModel: [],
        options: [],
        isOptionsEmpty: true,
        noOptionsText: '',
        noResultsText: '',
        noChildrenText: '',
      };
    },
    computed: {
      ...mapGetters(['selectTreeOptions']),
    },
    watch: {
      isOptionsEmpty(val) {
        this.options = val ? [] : this.selectTreeOptions;
      },
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
