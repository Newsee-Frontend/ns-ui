<!--UI 组件库 - 业务 Table-->
<template>
  <div v-loading="!isRender">
    <ns-table ref="biz-table"
              :data="data.list" :head="finalHead" :keyRefer="keyRefer" :height="400"
              :cellFifter="cellFifter"
              :showHeadOperation="showHeadOperation"
              :showSummary="showSummary"
              :rulesConfig="rulesConfig"
              @selection-change="selectionChange"
              @table-action="tableAction"
              @cell-action="cellAction"
              @cell-form-change="cellFormChange"
              @add-row="addRow"
              @delete-current-row="deleteCurrentRow"
              v-if="isRender"
    ></ns-table>
    <ns-pagination
      :total="data.total" :searchConditions="searchConditions"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></ns-pagination>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import columnConfig from './column-template-config';
  import cellFifter from './cell-fifter';
  import rulesConfig from '../../utils/validate/rules-config';
  import keyRefer from './keyRefer';

  export default {
    name: 'biz-table',
    data() {
      return {
        keyRefer,
        cellFifter,
        rulesConfig,
        isLoading: true,
      };
    },
    props: {
      data: { type: Object },
      isLocalHead: { type: Boolean, default: false }, //是否为本地表头数据
      head: { type: Array }, //表头数据
      //表格数据加载状态
      loadState: {
        type: Object, default() {
          return {
            data: false,
            head: false,
          };
        },
      },
      searchConditions: { type: Object },//筛选条件
      //第一列固定列类型（非自动表头配置）
      firstColType: { type: [String, Boolean, null], default: 'selection', validator: t => ['index', 'selection', 'radio', null].indexOf(t) > -1 },
      hasActionCol: { type: Boolean, default: true },//是否有操作列
      showHeadOperation: { type: Boolean, default: true },//表头设置操作模块开关
      showAddRowOperation: { type: Boolean, default: false },//表头设置 新增行操作模块开关
      showSummary: { type: Boolean, default: true },//是否显示合计行
    },


    computed: {
      ...mapGetters(['tableHead']),
      isRender() {
        return this.loadState.data && this.loadState.head;
      },
      finalHead() {
        return [
          ...(this.firstColType ? [columnConfig[this.firstColType]] : []),
          ...(this.isLocalHead ? this.head : this.tableHead),
          ...(this.hasActionCol ? [columnConfig['action']] : []),
          ...(this.showAddRowOperation ? [columnConfig['add-row']] : []),

        ].map(item => {
          item.resourcecolumnHidden = item.resourcecolumnHidden === '1' ? true : false;
          return item;
        });
      },
    },
    created() {
      this.$store.dispatch('generateTableHead', { funcId: 'funcId' }).then(() => {
        this.loadState.head = true;
      }).catch(() => {
        this.loadState.head = true;
      });
    },
    methods: {
      /**
       * 分页器当前显示条数改变
       * @param val
       */
      sizeChange(val) {
        console.log('size-change', val);
        this.$emit('reload');
      },
      /**
       * 分页器当前页切换
       * @param val
       */
      currentChange(val) {
        console.log('current-page-change', val);
        this.$emit('reload');
      },

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
      cellFormChange(value, param) {
        this.$emit('cell-form-change', value, param);
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
  .ns-pagination {
    padding: 5px;
    z-index: 99;
    background-color: #ebedef;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
</style>
