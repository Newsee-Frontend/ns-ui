<!--UI 组件库 - Select-tree event - 页面测试-->
<template>
  <demo-block>
    <template slot="title">event 事件示例用法</template>
    <template slot="describe">下拉菜单打开/关闭，input / select / deselect 事件，查询条件更改事件</template>
    <template slot="content">
      <ns-select-tree
        v-model="selectTreeModel"
        :options="selectTreeOptions"
        :multiple="true"
        @input="input"
        @menu-open="menuOpen"
        @menu-close="menuClose"
        @select="select"
        @deselect="deselect"
        @search-change="searchChange"
      >
      </ns-select-tree>
      <pre class="result">{{ selectTreeModel }}</pre>
      <div class="control">
        <div class="control-block form-block-line">
          <span>input 改变后的值:</span>
          <pre class="result">{{ selectTreeModel }}</pre>
          <span>select 选中的值:</span>
          <pre class="result">{{ currentSelect }}</pre>
          <span>deselect 反选中的值:</span>
          <pre class="result">{{ currentDeselect }}</pre>
        </div>
      </div>
    </template>
  </demo-block>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'select-tree-demo-event',
    data() {
      return {
        selectTreeModel: [],
        currentSelect: {},
        currentDeselect: {},
      };
    },
    computed: {
      ...mapGetters(['selectTreeOptions']),
    },
    methods: {
      input(value) {
        console.log('input事件：', value);
      },
      /**
       * select tree select every node
       * @param value - current node information which is selected
       */
      select(value) {
        console.log('select 事件:', value);
        this.currentSelect = value;
      },
      /**
       * deselect tree select every node
       * @param value - current node information which is deselected
       */
      deselect(value) {
        console.log('deselect 事件:', value);
        this.currentDeselect = value;
      },

      /**
       * menu open event
       */
      menuOpen() {
        console.log('menu-open - 下拉菜单打开事件');
      },
      /**
       * menu close event
       * @param value  - select model value
       */
      menuClose(value) {
        console.log('menu-close - 下拉菜单关闭事件', value);
      },
      /**
       * search query changes - 查询条件改变
       * @param query - 查询条件
       */
      searchChange(query) {
        console.log('search-change- 搜索查询条件更改事件', query);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
