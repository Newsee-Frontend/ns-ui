<!--UI 组件库 - 业务 Table-->
<template>
  <div class='biz-table' :style='{
    ...heightStyle
  }'>


    <!--表格-->
    <ns-table ref="bizTable" v-bind="curProps" v-on="curEvent">
      <template #cell-slot="scope">
        <slot name="cell-slot" v-bind="scope"></slot>
      </template>

      <!--表格操作列按钮插槽-->
      <template #btn-slot="{ row, rowIndex, column, columnIndex }">
        <action-cell :btnList="row[keyRefer.scope.actionBtnList]"
                     @btnClick=" tableAction($event, {row, rowIndex, column, columnIndex})"></action-cell>
      </template>

      <!--筛选条件插槽 -->
      <template #filter-slot="{ $panel, column }">
        <template v-for="option in column.filters">
          <filter-components v-bind="{ $panel, column }"
                             v-model="option.data"
                             @input="$panel.changeOption($event, !!option.data, option)"
          >
            <!--复杂控件 插槽暴露-->
            <template v-if="$scopedSlots[column.field]">
              <slot :name="column.field" v-bind="{ $panel, column }"></slot>
            </template>
          </filter-components>
        </template>
      </template>
    </ns-table>

    <!--分页器-->
    <ns-pagination
      class="biz-pagination"
      :total="total || 0" :searchConditions="searchConditions"
      :pageSizes="[0, 10, 20, 50, 100,200,1000,5000,10000,50000,100000]"
      @size-change="sizeChange"
      @current-change="currentChange"
      v-show="showPagination"
    ></ns-pagination>

  </div>
</template>

<script>
import dataRender from './mixins/dataRender';
import headFactory from './mixins/headFactory';
import resizeHeight from './mixins/resize-height';
import menuRender from './mixins/menuRender';
import keyRefer from './config/keyRefer';
import rulesConfig from './config/rulesInfo';
import actionCell from './components/action-cell';
import filterComponents from './components/filter-components';

export default {
  name: 'biz-table',
  mixins: [dataRender, headFactory, resizeHeight, menuRender],
  components: {
    actionCell,
    filterComponents,
  },
  data() {
    return {
      keyRefer,
      rulesConfig,
      pageSizes: [10, 20, 50, 100],//[0, 10, 20, 50, 100,200,1000,5000,10000]

      //翻页存的所有选中
      allPagesSelectList: new Map(),  //键值对存储便于查找
      isChangePager: false,
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
    firstColType: {
      type: String,
      default: 'checkbox',
      validator: t => ['index', 'checkbox', 'radio', null].indexOf(t) > -1,
    },
    hasActionCol: { type: Boolean, default: true },//是否有操作列
    showHeadOperation: { type: Boolean, default: true },//表头设置操作模块开关
    showAddRowOperation: { type: Boolean, default: false },//表头设置 新增行操作模块开关

    showFooter: { type: Boolean },//是否显示表尾合计
    footerList: Array,
    footerMethod: { type: Function },//表尾合计的计算方法
    showPagination: { type: Boolean, default: true },//是否显示分页器
    checkMethod: { type: Function },//控制 CheckBox 是否允许勾选的方法，该方法 Function({row}) 的返回值用来决定这一行的 CheckBox 是否可以勾选.
    layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
    pagerCount: { type: Number, default: 7 },
    showEmptySlot: { type: Boolean, default: true },//显示表格 空数据 时插槽
    emptyText: { type: String },//空数据时的文案
    reserve: {
      type: Boolean,
      default: false,
    },  // 是否开启跨页选择
    rowId: {
      type: String,
      default: 'id',
    },
  },

  computed: {
    //表头 / 表数据 获取 - 是否准备完毕
    fetchReady() {
      return !(this.loading || this.headLoading);
    },

    //表头/表数据获取，以及渲染完毕（大数据表格) - 是否全部准备完毕
    tableLoading() {
      return !this.fetchReady || this.renderLoading;
    },

    curProps() {
      const props = {
        loading: this.tableLoading,
        isHugeData: this.isHugeData,
        head: this.finalHead,
        keyRefer: this.keyRefer,
        height: this.height,
        rulesConfig: this.rulesConfig,
        showFooter: this.showFooter,
        footerMethod: this.footerMethod,
        checkMethod: this.checkMethod,
        highlightHoverRow: true,
        emptyText: this.emptyText,
        showCheckDrop: true,
        menuConfig: this.menuConfig,
        defaultSort: this.defaultSort
      };
      if (!this.isHugeData) {
        props.data = this.data;
      }
      return props;
    },
    curEvent() {
      return {
        reload: this.reload,
        'edit-actived': this.editActived,
        'edit-closed': this.editClosed,
        'edit-disabled': this.editDisabled,

        'cell-event': this.cellEvent,
        'table-action': this.tableAction,
        'column-setting-submit': this.columnSettingSubmit,
        'column-setting-reset': this.columnSettingReset,
        'select-change': this.selectChange,
        'select-all': this.selectAll,
        'summary-change': this.summaryChange,
        'resizable-change': this.resizableChange,
        'sort-change': this.sortChange,
        'filter-change': this.filterChange,
        'menu-click': this.menuClick
      };
    },
  },

  watch: {
    loading(val) {
      if (val) {
        //开启跨页选择的时候，非change 页码的其他， 会被清空
        if (this.reserve) {
          //选择页码引起的加载， 不需要清空跨页的list
          if (!this.isChangePager) {
            if (this.allPagesSelectList.size > 0) {
              this.$notify({
                title: '提示',
                message: '您跨页选择的行数据已被清空，有需要请重新添加',
                duration: 3000,
                type: 'warning',
              });
              this.allPagesSelectList.clear();
            }
          }

        } else {
          //自动触发选择选择为空
          this.selectAll({ selection: [], checked: false });
        }
        this.isChangePager = false;
      }
    },
  },

  methods: {
    /**
     * loadData table data - 加载数据（对于表格数据需要重载、局部递增场景下可能会用到）
     * @param tableData
     * @returns {Promise<any>}
     */
    loadData(tableData) {
      return new Promise((resolve, reject) => {
        this.$refs['bizTable'].loadData(tableData).then(() => {
          resolve();
        }).catch(err => {
            reject(err);
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
        }).catch(err => {
            reject(err);
          },
        );
      });
    },

    //重新刷新
    reload() {
      this.$emit('reload');
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
      console.log('form edit actived in table');
      this.$emit('edit-actived', { row, $rowIndex, column, $columnIndex, cell });
    },

    /**
     * form edit closed in table
     * @param row
     * @param rowIndex
     * @param $rowIndex
     * @param column
     * @param columnIndex
     * @param $columnIndex
     * @param cell
     */
    editClosed({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, cell }) {
      console.log('form edit closed in table');
      this.$emit('edit-closed', { row, $rowIndex, column, $columnIndex, cell });
    },

    /**
     * form edit disabled in table
     * @param row
     * @param rowIndex
     * @param $rowIndex
     * @param column
     * @param columnIndex
     * @param $columnIndex
     * @param cell
     */
    editDisabled({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, cell }) {
      console.log('form edit closed in table');
      this.$emit('edit-disabled', { row, $rowIndex, column, $columnIndex, cell });
    },


    /**
     * 单元格事件 - 点击/修改
     * @param { row, rowIndex, column, columnIndex, rows, columns }
     *  注释：1、row - 行数据 , 2、rowIndex - 行索引, 3、column - 列数据, 4、columnIndex - 列索引 , 5、rows - 全部表格数据 , 6、columns - 全部列数据
     * @param event
     */
    cellEvent({ row, rowIndex, column, columnIndex, rows, columns }, event) {
      this.$emit('cell-event', { row, rowIndex, column, columnIndex, rows, columns }, event);
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
     * column setting reset - 表头设置 - 列表设置恢复默认
     * @param column - column data after setting
     */
    columnSettingReset(column) {
      console.log('表头设置 - 列表设置恢复默认');
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
     * 单选列，多选列 （当选择项发生变化时会触发该事件）
     * @param { row, $rowIndex, column, $columnIndex, checked, selection }
     * 注意：单选列的情况下，参数：checked, selection 不存在
     * @param event
     */
    selectChange({ row, $rowIndex, column, $columnIndex, checked, selection }, event) {
      this.$emit('select-change', { row, $rowIndex, column, $columnIndex, checked, selection }, event);
      this.$refs['bizTable'].refreshColumn();
    },

    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     * @param { selection, checked }
     * @param event
     */
    selectAll({ selection, checked }, event) {
      console.log(12312312312312312, { selection, checked })
      this.$emit('select-all', { selection, checked }, event);
      this.$refs['bizTable'].refreshColumn();
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
     * @param type - 类型，单选还是多选
     * @param rows  - 选中的对象
     *              ~ checkbox - 选中的行数据列表（数组)
     *              ~ radio - 单个行数据
     * @param checked - 选中与否（布尔)
     */
    setSelection(type, rows, checked) {
      this.$refs['bizTable'].setSelection(type, rows, checked);
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
     * @param type - 类型，单选还是多选
     */
    clearSelection(type) {
      this.$refs['bizTable'].clearSelection(type);
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

    /**
     * column resizable change - 当列宽拖动发生变化时会触发该事件
     * @param $rowIndex
     * @param column
     * @param columnIndex
     * @param $columnIndex
     * @param $event
     */
    resizableChange({ $rowIndex, column, columnIndex, $columnIndex, $event }) {
      this.$emit('resizable-change', { $rowIndex, column, columnIndex, $columnIndex, $event });

      console.log({ $rowIndex, column, columnIndex, $columnIndex, $event });
      console.log(`拖动后，当前列宽度为：${column.resizeWidth}`);
    },

    /**
     * sortChange - 当排序事件触发
     * @param column
     * @param property
     * @param order
     */
    sortChange({ column, property, order }) {
      this.searchConditions.orderBy = order;
      this.searchConditions.orderFieldName = order ? property : '';
      this.searchConditions.pageNum = 1;

      this.$emit('reload');
    },

    /**
     * 筛选事件
     * @param column 列信息
     * @param property 筛选字段
     * @param values 筛选values
     * @param datas  数据
     * @param filters 所有筛选的条件
     * @param $table 整个表格控件
     */
    filterChange({ column,  property, values, datas, filters, $table}) {
      console.log(filters)
    },

    /**
     * 用于 filters，修改筛选列表（在筛选条件更新之后可以调用 updateData 函数处理表格数据）
     * @param column
     * @param options
     */
    setFilter(column, options){
      this.$refs['bizTable'].setFilter(column, options);
    },


    /**
     * 获取column
     * @param colName
     * @returns {*}
     */
    getColumnByField(colName){
      return this.$refs['bizTable'].getColumnByField(colName)
    },

    /**
     * 更新数据
     */
    updateData(){
      this.$refs['bizTable'].updateData()
    },

    /**
     * 手动清空筛选条件
     * （如果不传 column 则清空所有筛选条件），数据会恢复成未筛选的状态
     *  @param column
     */
    clearFilter(column) {
      this.$refs['bizTable'].clearFilter(column);
    }

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
