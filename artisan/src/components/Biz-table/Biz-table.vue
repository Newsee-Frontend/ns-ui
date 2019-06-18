<!--UI 组件库 - 业务 Table-->
<template>
  <div v-loading="!isRender">
    <ns-table ref="biz-table"
              :data="data" :head="finalHead" :keyRefer="keyRefer" :height="400"
              :cellFifter="cellFifter"
              :showHeadOperation="showHeadOperation"
              @selection-change="selectionChange"
              @table-action="tableAction"
              @cell-action="cellAction"
              @add-row="addRow"
              @delete-current-row="deleteCurrentRow"
              v-if="isRender"
    ></ns-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import columnConfig from './column-template-config';
  import cellFifter from './cell-fifter';
  import keyRefer from './keyRefer';

  export default {
    name: 'biz-table',
    data() {
      return {
        keyRefer,
        cellFifter,
        isLoading: true,
      };
    },
    props: {
      data: { type: Array, default: [] },
      loadState: {
        type: Object, default() {
          return {
            data: false,
            head: false,
          };
        },
      },  //表格数据加载状态
      firstColType: { type: String, default: 'selection', validator: t => ['index', 'selection', 'radio', null].indexOf(t) > -1 },//第一列固定列类型（非自动表头配置）
      hasActionCol: { type: Boolean, default: true },
      showHeadOperation: { type: Boolean, default: true },//表头设置操作模块开关
      showAddRowOperation: { type: Boolean, default: false },//表头设置 新增行操作模块开关
    },


    computed: {
      ...mapGetters(['tableHead', 'tableData']),
      isRender() {
        return this.loadState.data && this.loadState.head;
      },
      finalHead() {
        if (this.tableHead) {
          return [
            ...(this.firstColType ? [columnConfig[this.firstColType]] : []),
            ...this.tableHead,
            ...(this.hasActionCol ? [columnConfig['action']] : []),
            ...(this.showAddRowOperation ? [columnConfig['add-row']] : []),

          ].map(item => {
            item.resourcecolumnHidden = item.resourcecolumnHidden === '1' ? true : false;
            return item;
          });
        }
        return [];
      },
    },
    created() {
      this.$store.dispatch('generateTableHead', {}).then(() => {
        this.loadState.head = true;

      }).catch(() => {
        this.loadState.head = true;
      });
    },
    methods: {
      selectionChange(row, index) {
        this.$emit('selection-change', row, index);
      },
      tableAction(info, scope) {
        this.$emit('table-action', info, scope);
      },
      cellAction(scope, item) {
        console.log('表格单元格点击行为事件');
        console.log(scope, item);
      },
      /**
       * add row to grid
       */
      addRow() {
        this.$emit('add-row');
      },
      /**
       * delete current row
       * @param index
       * @param row
       */
      deleteCurrentRow(index, row) {
        this.$emit('delete-current-row', index, row);
      },
      checkAll() {
        this.$refs['biz-table'].checkAll();
      },
      resetCheck() {
        this.$refs['biz-table'].resetCheck();
      },
    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
