<!--UI 组件库 - Table - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">表格table 用法</template>
      <template slot="describe">基础用法</template>
      <template slot="content">

        <biz-table ref="biz-table-demo1" :loadState="loadState" :data="Data"
                   :showAddRowOperation="showAddRowOperation"
                   :showHeadOperation="showHeadOperation"
                   @selection-change="selectionChange"
                   @add-row="addRow"
                   @delete-current-row="deleteCurrentRow"
                   @table-action="tableAction">
        </biz-table>
        <div class="control-block form-block-line">
          <span>显示新增行列:</span>
          <ns-switch v-model="showAddRowOperation"></ns-switch>
          <span>显示表头设置列:</span>
          <ns-switch v-model="showHeadOperation"></ns-switch>
        </div>
        <div class="handle">
          <ns-button type="primary" @click="validate">验证</ns-button>
          <ns-button @click="reset">重置</ns-button>
        </div>
      </template>
    </demo-block>


    <biz-table :loadState="loadState" :data="Data" @selection-change="selectionChange" @table-action="tableAction"></biz-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'table-demo',
    data() {
      return {
        //表格数据加载状态
        loadState: {
          data: false,
          head: false,
        },
        showAddRowOperation: true,
        showHeadOperation: true,
      };
    },
    computed: {
      ...mapGetters(['tableData']),
      Data() {
        return this.tableData.map(item => {
          item.fnsclick = [
            { label: '编辑', value: 'gridEditBtn' }, { label: '删除', value: 'gridRemoveBtn' },
            { label: '停用', value: 'stop' }, { label: '启用', value: 'work' },
          ];
          return item;
        });
      },

    },
    created() {
      this.$store.dispatch('generateTableData', { query: {}, funcId: 'funcId' }).then(() => {
        this.loadState.data = true;
      }).catch(() => {
        this.loadState.data = true;
      });

    },
    methods: {
      selectionChange(row, index) {
        console.log('表数据 checkbox/radio 选择的时候');
        console.log(row);
        console.log(index);
      },
      tableAction(info, scope) {
        console.log('操作列按钮点击的时候');
        console.log(info, scope);
      },
      /**
       * add row to grid
       */
      addRow() {
        console.log('新增行');
      },
      /**
       * delete current row
       * @param index
       * @param row
       */
      deleteCurrentRow(index, row) {
        console.log('删除当前行');
        console.log(index, row);
      },
      validate() {
        this.$refs['biz-table-demo1'].checkAll();
      },
      reset() {
        this.$refs['biz-table-demo1'].resetCheck();
      },
    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .handle {
    margin: 10px 0;
    text-align: right;
  }
</style>
