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

import img_null from '../../assets/null.jpg';

export default create({
  name: 'table',
  components: { columnRender, summaryDrop, identifier },
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
    highlightHoverRow: { type: Boolean, default: true }, //鼠标移到行是否要高亮显示
    showEmptySlot: { type: Boolean, default: true }, //显示表格 空数据 时插槽
    emptyText: { type: String, default: '抱歉, 没有你要的结果' },
  },
  data() {
    return {
      customColumns: [],
    };
  },
  computed: {
    isMainReady() {
      //Header data must exist and loading status must be false
      return this.head && this.head.length;
    },

    //默认排序方式
    defaultSort(){
      let  defaultSortItem = this.head.find(i=> i.defaultSortType)
      return defaultSortItem ? { field: defaultSortItem.field, order: defaultSortItem.defaultSortType} : {}
    }

  },
  watch: {
    head: {
      handler: function(val) {
        this.customColumns = val.map(item => {
          return {
            field: item.field,
            visible: !item.hidden,
          };
        });

        if (this.$refs['main-table']) {
          this.$refs['main-table'].refreshColumn();
        }
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
      'highlight-hover-row': this.highlightHoverRow,
      'show-overflow': true,
      'show-header-overflow': true,
      'edit-config': this.editConfig,
      'edit-rules': this.validRules,
      'checkbox-config': {
        checkField: 'checked',
        trigger: 'default',
        strict: true,
        checkMethod: this.checkMethod,
      },
      'sort-config': {
        defaultSort: this.defaultSort,
        remote: true,
        orders: ['desc', 'asc', null]
      },
      'show-footer': this.showFooter,
      'footer-method': this.footerMethod
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
                  'sort-change': this.sortChangeEvent
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
                    key: `column-render-${$index}`,
                    props: {
                      column: item,
                      columns: this.head,
                      keyRefer: this.keyRefer,
                      customColumns: this.customColumns,
                    },
                    on: {
                      ...this.$listeners,
                      'cell-event': this.cellEvent,
                      'sync-column-render': data => {
                        // console.log(data.customColumns);

                        const target = this.$refs['main-table'];
                        ['change', 'lock'].indexOf(data.event) > -1
                          ? target.refreshColumn()
                          : target.reloadColumn(data.customColumns);
                      },
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
                              column: item,
                              columns: this.head,
                              rowIndex: scope.$rowIndex,
                              columnIndex: scope.$columnIndex,
                              rendered: true,
                            })
                          : scope.row[item.field];
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
    fullValidate(cb) {
      this.$refs['main-table'].fullValidate(cb);
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
    sortChangeEvent ({ column, property, order }) {
      this.$emit('sort-change', { column, property, order });
    }

  },
  created() {
    // alert(this.loading)
    // alert(this.data)
  },
  mounted() {},
});
