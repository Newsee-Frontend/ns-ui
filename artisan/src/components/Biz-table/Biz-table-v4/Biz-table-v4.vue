<!--UI 组件库 - 业务 Table-->
<template>
  <div class="biz-table" :style="`height: ${height+38}px`">


    <ns-table-v4 ref="bizTable"
                 v-bind="curProps"
                 v-on="curEvent"
    ></ns-table-v4>

    <!--合计区域-->
    <table-summary @summary-change="summaryChange"></table-summary>


    <ns-pagination
      class="biz-pagination"
      :total="total || 0" :searchConditions="searchConditions"
      :pageSizes="[10, 20, 50, 100,200,500,1000,5000,10000,50000,100000]"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></ns-pagination>

  </div>
</template>

<script>
  import keyRefer from './config/keyRefer';
  import columnConfig from './config/column-template-config';
  import rulesConfig from './config/rulesInfo';
  import tableSummary from './components/summary';

  export default {
    name: 'biz-table',
    components: { tableSummary },
    data() {
      return {
        keyRefer,
        rulesConfig,

        normalColInclude: ['text', 'number', 'date', 'select'],
        specialColInclude: ['index', 'selection', 'radio'],
        actionColInclude: ['action', 'add-row'],
        settingColInclude: ['setting'],

        height: 500,

      };
    },
    props: {
      loading: { type: Boolean },
      data: {
        type: Array, default() {
          return [];
        },
      },
      isHugeData: { type: Boolean },//大数据量渲染，不支持表单表格的功能
      localHead: { type: Array, request: false }, //本地表头数据

      total: { type: Number },//总条目
      searchConditions: { type: Object },//筛选条件

      //第一列固定列类型（非自动表头配置）
      firstColType: { type: String, default: 'selection', validator: t => ['index', 'selection', 'radio', null].indexOf(t) > -1 },
      hasActionCol: { type: Boolean, default: true },//是否有操作列
      showHeadOperation: { type: Boolean, default: true },//表头设置操作模块开关
      showAddRowOperation: { type: Boolean, default: false },//表头设置 新增行操作模块开关

      showFooter: { type: Boolean },//是否显示表尾合计
      footerMethod: { type: Function },//表尾合计的计算方法
      checkMethod: { type: Function },//控制 CheckBox 是否允许勾选的方法，该方法 Function({row}) 的返回值用来决定这一行的 CheckBox 是否可以勾选.

    },
    computed: {
      curProps() {
        const props = {
          loading: this.loading,
          isHugeData: this.isHugeData,
          head: this.finalHead,
          keyRefer: this.keyRefer,
          height: this.height,
          rulesConfig: this.rulesConfig,
          showFooter: this.showFooter,
          footerMethod: this.footerMethod,
          checkMethod: this.checkMethod,
        };
        if (!this.isHugeData) {
          props.data = this.data;
        }
        return props;
      },
      curEvent() {
        return {
          'edit-actived': this.editActived,
          'cell-event': this.cellEvent,
          'table-action': this.tableAction,
          'column-setting-submit': this.columnSettingSubmit,
          'select-change': this.selectChange,
          'select-all': this.selectAll,
        };
      },
      finalHead() {
        return [
          ...(this.firstColType ? [columnConfig[this.firstColType]] : []),
          ...(this.localHead ? this.localHead : this.tableHead),
          ...(this.hasActionCol ? [columnConfig['action']] : []),
          ...(this.showAddRowOperation ? [columnConfig['add-row']] : []),
          ...(this.showHeadOperation ? [columnConfig['setting']] : []),
        ].map(col => {
          col.resourcecolumnHidden = col.resourcecolumnHidden === true || col.resourcecolumnHidden === '1';

          const key = col.resourcecolumnCode;
          if (this.specialColInclude.indexOf(key) > -1) {
            col.fixed = 'left';
          }
          else if ([...this.actionColInclude, ...this.settingColInclude].indexOf(key) > -1) {
            col.fixed = 'right';
          }
          else {
            col.fixed = '';
          }
          return col;
        });
      },
    },


    methods: {
      /**
       * get table head data
       */
      getTableHead() {
        if (this.localHead) {
          this.loadState.head = true;
        }
        else {
          this.$store.dispatch('generateTableHead', { funcId: 'funcId', mockType: this.isFormTable ? 'form' : 'normal' }).then(() => {
            this.loadState.head = true;
          }).catch(() => {
            this.loadState.head = true;
          });
        }
      },

      /**
       * loadData table data - 加载数据（对于表格数据需要重载、局部递增场景下可能会用到）
       * @param tableData
       * @returns {Promise<any>}
       */
      loadData(tableData) {
        return new Promise((resolve, reject) => {
          this.$refs['bizTable'].loadData(tableData).then(() => {
            resolve();
          }).catch(() => {
              reject();
            },
          );
        });
      },

      /**
       * reload table data - 加载数据并恢复到初始状态（对于表格数据需要重载、局部递增的场景中可能会用到）
       * @param tableData
       * @returns {Promise<any>}
       */
      reloadData(tableData) {
        return new Promise((resolve, reject) => {
          this.$refs['bizTable'].reloadData(tableData).then(() => {
            resolve();
          }).catch(() => {
              reject();
            },
          );
        });
      },

      /**
       * update table footer - 手动更新表尾合计（对于某些需要频繁更新的场景下可能会用到）
       * @returns {Promise<any>}
       */
      updateFooter() {
        return new Promise((resolve, reject) => {
          this.$refs['bizTable'].updateFooter().then(() => {
            resolve();
          }).catch(() => {
              reject();
            },
          );
        });
      },


      /**
       * 单元格被激活编辑时会触发该事件
       * @param row
       * @param $rowIndex
       * @param column
       * @param $columnIndex
       * @param cell
       */
      editActived({ row, $rowIndex, column, $columnIndex, cell }) {
        this.$emit('edit-actived', { row, $rowIndex, column, $columnIndex, cell });
      },

      /**
       * 单元格事件 - 点击/修改
       * @param row
       * @param rowIndex
       * @param column
       * @param columnIndex
       * @param event
       */
      cellEvent({ row, rowIndex, column, columnIndex }, event) {
        this.$emit('cell-event', { row, rowIndex, column, columnIndex }, event);
      },

      /**
       * 表单表格 - 验证
       */
      fullValidate(cb) {
        this.$refs['bizTable'].fullValidate(cb);
      },

      /**
       * column setting submit - 表头设置 - 按钮提交
       * @param column - column data after setting
       */
      columnSettingSubmit(column) {
        console.log('表头设置 - 按钮提交');
        console.log(column);
      },

      /**
       * table action in column - 操作列按钮点击事件
       * @param info - 按钮信息
       * @param row - 行信息
       * @param rowIndex - 行索引
       * @param column - 列信息
       * @param columnIndex - 列索引
       */
      tableAction(info, { row, rowIndex, column, columnIndex }) {
        this.$emit('table-action', info, { row, rowIndex, column, columnIndex });
      },

      /**
       * 当选择项发生变化时会触发该事件
       * @param {checked, row, $rowIndex, column, $columnIndex}
       * @param event
       */
      selectChange({ checked, row, $rowIndex, column, $columnIndex }, event) {
        this.$emit('select-change', { checked, row, $rowIndex, column, $columnIndex }, event);
      },

      /**
       * 当用户手动勾选全选 Checkbox 时触发的事件
       * @param { selection, checked }
       * @param event
       */
      selectAll({ selection, checked }, event) {
        this.$emit('select-all', { selection, checked }, event);
      },

      /**
       * summary change - 合计行切换
       * @param param
       */
      summaryChange(param) {
        this.$emit('summary-change', param);
      },


      /**
       * set active row - 激活行编辑
       * @param row - 激活的行
       */
      setActiveRow(row) {
        this.$refs['bizTable'].setActiveRow(row);
      },

      /**
       * clear active row - 清除激活
       */
      clearActived() {
        this.$refs['bizTable'].clearActived();
      },

      /**
       * set selection state - 设置行的选中状态
       * @param rows  - 选中的对象列表（数组)
       * @param checked - 选中与否（布尔)
       */
      setSelection(rows, checked) {
        this.$refs['bizTable'].setSelection(rows, checked);
      },

      /**
       * set all selection state - 设置所有行的选中状态
       * @param checked - 选中与否（布尔)
       */
      setAllSelection(checked) {
        this.$refs['bizTable'].setAllSelection(checked);
      },
      /**
       * clear all selection state - 清空选中状态
       */
      clearSelection() {
        this.$refs['bizTable'].clearSelection();
      },


      /**
       * table scroll to - 表格滚动至对应位置
       * @param x  -  x轴坐标
       * @param y  -  y坐标
       */
      scrollTo(x, y) {
        this.$refs['bizTable'].scrollTo(x, y);
      },

      /**
       * 获取请求的表头数据
       */
      getResponseColumn() {
        return this.tableHead || [];
      },

      /**
       * 获取全部的表头数据（包括首列，操作类，设置列等)
       */
      getAllColumn() {
        return this.finalHead || [];
      },

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


    },
    created() {

    },
    beforeDestroy() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "style/index";
</style>
