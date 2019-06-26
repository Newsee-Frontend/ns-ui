<!--UI 组件库 - Select-tree basic- 页面测试-->
<template>
  <demo-block>
    <template slot="title">model / vulue</template>
    <template slot="describe">显示值，模式，排序，节点 设置</template>
    <template slot="content">
      <ns-select-tree
        v-model="selectTreeModel"
        :options="selectTreeOptions"
        :multiple="true"
        size="medium"
        :model-consists="modelConsists"
        :sort-model-by="sortModelBy"
        :flat="flat"
        :default-expand-level="reNumModel(defaultExpandLevel)"
        :disable-branch-nodes="disableBranchNodes"
      >
      </ns-select-tree>
      <pre class="result">{{ selectTreeModel }}</pre>
      <div class="control">
        <div class="control-block form-block-line">
          <span>切换model/value模式:</span>
          <ns-radio v-model="modelConsists" :options="modelConsistsOpts"></ns-radio>
        </div>
        <div class="control-block form-block-line">
          <span>value/model 排序:</span>
          <ns-radio v-model="sortModelBy" :options="sortModelByOpts"></ns-radio>
        </div>
        <div class="control-block form-block-line">
          <span> 平面模式:</span>
          <ns-switch v-model="flat"></ns-switch>
          <span>节点是否可被选择:</span>
          <ns-switch v-model="disableBranchNodes"></ns-switch>
        </div>
        <div class="control-block form-block-line">
          <span>节点初始展开的层级:</span>
          <ns-input v-model.number="defaultExpandLevel" placeholder="请输入展开的层级"></ns-input>
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
        modelConsists: 'branch-first',
        modelConsistsOpts: [
          { label: '包含所有节点', value: 'all' },
          { label: '分支优先，不包含子节点', value: 'branch-first' },
          { label: '叶子优先，不包含父节点', value: 'leaf-first' },
          { label: '包含所有节点，包括不确定的节点', value: 'all-with-indeterminate' },
        ],
        sortModelBy: 'order',
        sortModelByOpts: [
          { label: '按照选择的顺序', value: 'order' },
          { label: '按照层级排序', value: 'level' },
          { label: '按照各节点级顺序', value: 'index' },
        ],
        flat: false,
        defaultExpandLevel: 3,
        disableBranchNodes: false,

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
