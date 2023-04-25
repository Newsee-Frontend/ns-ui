import create from '../../create/create';

import selection from './mixins/selection';
import reRender from './mixins/reRender';
import validate from './mixins/validate';
import columntype from './mixins/columntype';
import namefactory from './mixins/namefactory';
import errorType from './mixins/errorType';

import columnRender from './components/column';
import identifier from './components/identifier';
import summaryDrop from './components/summary-drop';
import checkDrop from './components/check-drop';

import img_null from '../../assets/null.jpg';
import actionDrop from './components/action-drop';

export default create({
  name: 'table',
  components: { columnRender, summaryDrop, identifier, checkDrop, actionDrop },
  mixins: [selection, reRender, validate, namefactory, columntype, errorType],
  props: {
    loading: { type: Boolean, default: true },
    keyRefer: { type: Object },
    data: { type: Array },
    head: {
      type: Array,
      default() {
        return [];
      },
    },
    isHugeData: { type: Boolean, default: false }, //大数据量渲染，不支持表单表格的功能
    height: { type: [Number, String], default: 300 },
    showFooter: { type: Boolean, default: false },
    footerList: {
      type: Array,
      default() {
        return ['current', 'total'];
      }, //drop list 展示的项， 默认（分页，全部）
    },

    footerMethod: { type: Function },
    checkMethod: { type: Function },
    editConfig: {
      type: Object,
      default: () => {
        return { trigger: 'click', mode: 'row', showStatus: true };
      },
    },

    //快捷菜单配置
    menuConfig: {
      type: Object,
      default: () => {},
    },

    highlightHoverRow: { type: Boolean, default: true }, //鼠标移到行是否要高亮显示
    showEmptySlot: { type: Boolean, default: true }, //显示表格 空数据 时插槽
    emptyText: { type: String, default: '抱歉, 没有你要的结果' },
    showCheckDrop: { type: Boolean, default: false }, //是否显示checkbox的下拉
    mergeCells: { type: Array, default: () => [] }, //临时合并指定的单元格
    mergeFooterItems: { type: Array, default: () => [] }, //临时合并表尾

    // 自动跟随某个属性的变化去重新计算表格，和手动调用 recalculate 方法是一样的效果（对于通过某个属性来控制显示/隐藏切换时可能会用到）
    syncResize: {
      type: [Boolean, String, Number],
    },

    // 增加行选择的触发
    selectTrigger: {
      type: String,
      default: 'cell',
    },
  },
  data() {
    return {
      customColumns: [],
      checkMode: '',
    };
  },
  computed: {
    isMainReady() {
      //Header data must exist and loading status must be false
      return this.head && this.head.length;
    },

    defaultSort() {
      let defaultSortItem = this.head.find(i => i.defaultSortType);
      return defaultSortItem
        ? { field: defaultSortItem.field, order: defaultSortItem.defaultSortType }
        : {};
    },
    //显示多选的下拉
    isShowCheckDrop() {
      return this.head?.[0]?.type === 'checkbox' && this.showCheckDrop;
    },
  },
  watch: {
    head: {
      handler: function(val) {
        // 获取所有列配置
        this.$nextTick(() => {
          this.$refs['main-table'] &&
            (this.customColumns = this.$refs['main-table'].getTableColumn()?.fullColumn);
        });
      },
      deep: true,
      immediate: true,
    },
  },
  render(h) {
    const props = {
      loading: this.loading,
      ...this.namefactory,
      property: 'setting',
      size: 'small',
      height: this.height,
      resizable: true,
      'keep-source': true,
      'auto-resize': true,
      'highlight-hover-row': this.highlightHoverRow,
      'show-overflow': true,
      'show-header-overflow': true,
      'edit-config': this.editConfig,
      'edit-rules': this.validRules,
      'sync-resize': this.syncResize,
      'scroll-x': { gt: -1 },
      'checkbox-config': {
        checkField: 'checked',
        trigger: this.selectTrigger,
        strict: true,
        showHeader: this.checkMode !== 'total',
        checkMethod: this.checkMethodFun,
      },

      'radio-config': {
        trigger: this.selectTrigger,
      },
      'sort-config': {
        defaultSort: this.defaultSort,
        remote: true,
        orders: ['desc', 'asc', null],
      },
      'filter-config': {
        remote: true,
      },
      'menu-config': this.menuConfig,
      'show-footer': this.showFooter,
      'footer-method': this.footerMethod,
      'merge-cells': this.mergeCells,
      'merge-footer-items': this.mergeFooterItems,
    };

    if (!this.isHugeData) {
      props.data = this.data;
    }
    return (
      <div
        class={this.recls()}
        style={`height: ${typeof this.height === 'number' ? this.height + 'px' : this.height}`}
      >
        {this.isMainReady
          ? h(
              `vxe-table`,
              {
                ref: 'main-table',
                props: props,
                on: {
                  'edit-actived': this.editActived,
                  'edit-closed': this.editClosed,
                  'edit-disabled': this.editDisabled,
                  'radio-change': this.selectChange,
                  'checkbox-change': this.selectChange,
                  'checkbox-all': this.selectAll,
                  'resizable-change': this.resizableChange,
                  'sort-change': this.sortChangeEvent,
                  'filter-change': this.filterChangeEvent,
                  'menu-click': this.menuClick,
                },
                scopedSlots: {
                  empty: scope => {
                    return (
                      <span class={'error-prompt'} v-show={this.showEmptySlot}>
                        <img class={'errorImg'} src={img_null} />
                        <p> {this.emptyText} </p>
                      </span>
                    );
                  },
                },
              },
              [
                this.head.map((item, $index) => {
                  return h(`column-render`, {
                    key: `column-render-${item.field}`,
                    props: {
                      column: item,
                      columns: this.head,
                      keyRefer: this.keyRefer,
                      showCheckDrop: this.showCheckDrop,
                    },
                    on: {
                      ...this.$listeners,
                      'cell-event': this.cellEvent,
                      'show-setting': this.showSetting,
                    },
                    scopedSlots: {
                      'header-slot': scope => {
                        return (
                          this.$scopedSlots['header-slot'] &&
                          this.$scopedSlots['header-slot']({
                            row: scope.row,
                            column: item,
                          })
                        );
                      },
                      'cell-slot': scope => {
                        return this.$scopedSlots['cell-slot']
                          ? this.$scopedSlots['cell-slot']({
                              row: scope.row,
                              data: scope.data,
                              column: {
                                ...item,
                                id: scope.column.id,
                                property: scope.column.property,
                              },
                              columns: this.head,
                              rowIndex: scope.$rowIndex,
                              columnIndex: scope.$columnIndex,
                              rendered: true,
                            })
                          : scope.row[item.field];
                      },
                      'filter-slot': scope => {
                        return (
                          this.$scopedSlots['filter-slot'] &&
                          this.$scopedSlots['filter-slot'](scope)
                        );
                      },
                      'btn-slot': scope => {
                        return (
                          this.$scopedSlots['btn-slot'] &&
                          this.$scopedSlots['btn-slot']({
                            row: scope.row,
                            data: scope.data,
                            column: item,
                            columns: this.head,
                            rowIndex: scope.$rowIndex,
                            columnIndex: scope.$columnIndex,
                            rendered: true,
                          })
                        );
                      },
                    },
                  });
                }),
              ]
            )
          : null}
        {this.showFooter
          ? h('summary-drop', {
              props: {
                footerList: this.footerList,
              },
              on: {
                ...this.$listeners,
              },
            })
          : null}

        {this.isShowCheckDrop
          ? h('check-drop', {
              on: {
                'check-mode-change': this.checkModeEvent,
              },
            })
          : null}

        {h('action-drop', {
          ref: 'actionDrop',
          props: {
            customColumns: this.customColumns,
          },
          on: {
            ...this.$listeners,
            'sync-column-render': data => {
              const target = this.$refs['main-table'];
              ['lock', 'change'].indexOf(data.event) > -1
                ? target.refreshColumn()
                : target.reloadColumn(this.customColumns);
            },
          },
        })}

        {h('identifier', {
          class: this.recls('mask'),
          props: {
            loading: this.loading,
            errorType: this.errorType,
          },
          on: {
            ...this.$listeners,
          },
        })}
      </div>
    );
  },
  methods: {
    /**
     * 选择模式切换
     * @param mode
     */
    checkModeEvent(mode) {
      this.checkMode = mode;
      this.$emit('check-mode-change', mode);
    },

    //展开 设置列
    showSetting() {
      this.$refs.actionDrop.openSetting();
    },

    checkMethodFun(params) {
      if (this.checkMode === 'total') {
        return false;
      } else {
        return !this.checkMethod || (this.checkMethod && this.checkMethod(params));
      }
    },

    /**
     * 校验
     * @param cb
     */
    fullValidate(cb) {
      console.log(this.$refs['main-table'].fullValidate);
      this.$refs['main-table'].fullValidate(errMap => {
        let valid = !errMap;
        cb && cb(valid, errMap);
      });
    },

    /**
     * table scroll to
     * @param x
     * @param y
     */
    scrollTo(x, y) {
      this.$refs['main-table'].scrollTo(x, y);
    },

    /**
     * cell for form-table change event
     * @param row
     * @param rowIndex
     * @param column
     * @param columnIndex
     */
    cellEvent({ row, rowIndex, column, columnIndex }) {
      this.$emit(
        'cell-event',
        { row, rowIndex, column, columnIndex, ...{ rows: this.data }, ...{ columns: this.head } },
        event
      );
    },

    /**
     * form edit actived in table
     * @param row
     * @param rowIndex
     * @param $rowIndex
     * @param column
     * @param columnIndex
     * @param $columnIndex
     * @param cell
     */
    editActived({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, cell }) {
      this.$emit('edit-actived', { row, $rowIndex, column, $columnIndex, cell });
      // if (this.$refs['main-table']) {
      //   this.$refs['main-table'].refreshColumn();
      // }
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
      this.$emit('edit-disabled', { row, $rowIndex, column, $columnIndex, cell });
    },

    /**
     *set row active state
     */
    setActiveRow(row) {
      this.$refs['main-table'].setActiveRow(row);
      this.$refs['main-table'].setCurrentRow(row);
    },
    /**
     * clear row active
     */
    clearActived() {
      this.$refs['main-table'].clearActived();
    },

    /**
     * 手动清空筛选条件
     * （如果不传 column 则清空所有筛选条件），数据会恢复成未筛选的状态
     * @param column 列信息
     */
    clearFilter() {
      this.$refs['main-table'].clearFilter();
    },

    /**
     * 用于 filters，修改筛选列表（在筛选条件更新之后可以调用 updateData 函数处理表格数据）
     * @param column
     * @param options
     */
    setFilter(column, options) {
      this.$refs['main-table'].setFilter(column, options);
    },

    /**
     * 获取column
     * @param colName
     * @returns {*}
     */
    getColumnByField(colName) {
      return this.$refs['main-table'].getColumnByField(colName);
    },

    /**
     * 更新数据
     */
    updateData() {
      this.$refs['main-table'].updateData();
    },

    /**
     * 清除排序
     */
    clearSort() {
      this.$refs['main-table'].clearSort();
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
    },

    /**
     * 排序事件
     * @param column 列信息
     * @param property 排序字段
     * @param order 排序方式
     */
    sortChangeEvent({ column, property, order }) {
      this.$emit('sort-change', { column, property, order });
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
    filterChangeEvent({ column, property, values, datas, filters, $table }) {
      this.$emit('filter-change', { column, property, values, datas, filters, $table });
    },

    /**
     * 当点击快捷菜单时会触发该事件
     * @param menu
     * @param row
     * @param column
     */
    menuClick({ menu, row, column }) {
      this.$emit('menu-click', { menu, row, column });
    },
  },
  created() {
    // alert(this.loading)
    // alert(this.data)
  },
  mounted() {},
});
