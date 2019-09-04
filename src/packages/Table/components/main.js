import slotScope from './cell/slot-scope';

import firstTableColumn from './column/first-column';
import actionColumn from './column/action-column';

import headOperation from './head/operation';
import actionDrop from './action/actionDrop';

import column from '../mixins/column';
import refer from '../mixins/refer';
import checkOperation from '../mixins/checkOperation';

export default {
  name: 'table-main',
  components: { slotScope, firstTableColumn, actionColumn, headOperation, actionDrop },
  mixins: [refer, column, checkOperation],
  data() {
    return {
      summaryCommand: 'current',//合计模块控制指令
      settingState: {
        setting: false,
        search: false,
      },//表格头部设置模块状态值
    };
  },
  props: {
    keyRefer: { type: Object },
    head: { type: Array },
    data: { type: Array },
    isFormTable: { type: Boolean, default: false },//是否是表单表格
    border: { type: Boolean, default: true },//是否有边框
    resizable: { type: Boolean, default: true }, //对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
    height: { type: Number },//表格渲染高度默认值
    showHeadOperation: { type: Boolean, default: true },//表头设置 新增行操作模块开关
    showSummary: { type: Boolean, default: false },//是否显示合计行
    summaryMethod: { type: Function },//自定义的合计计算方法
    checkStator: { type: Object },
    cellFifter: {
      type: Function,
    },
    rulesConfig: { type: Array },
  },

  render(h) {
    const normalColumn = (item, index) => {
      return (
        h(
          `el-table-column`,
          {
            props: {
              'class-name': `table-head-${item[this.headRefer['model-key']]}`,
              property: item[this.headRefer['model-key']],
              index: index,
              key: index,
              'min-width': item[this.headRefer['width']],
              align: item[this.headRefer['align']],
              label: item[this.headRefer['label']],
              resizable: this.resizable,
              'show-overflow-tooltip': true,
              fixed: item[this.headRefer['fixed']],
            },
            scopedSlots: {
              default: scope => {

                return (
                  <slot-scope scope={scope} head-scope={item}
                              headRefer={this.headRefer} scopeRefer={this.scopeRefer}
                              rowIndex={scope.$index} colIndex={index}
                              isFormTable={this.isFormTable}
                              checkStator={this.checkStator}
                              cell-fifter={this.cellFifter}
                              rules-config={this.rulesConfig}
                              on-cell-action={this.cellAction}
                              on-cell-form-change={this.cellFormChange}/>
                );
              },
            },
          },
        )
      );
    };

    const settingColumn = () => {
      return (
        h(
          `el-table-column`,
          {
            props: {
              'class-name': `table-head-setting`,
              property: 'setting',
              key: 'table-head-setting',
              width: '25',
              align: 'center',
              fixed: 'right',
            },
            scopedSlots: {
              'header': scope => {
                return (
                  <head-operation setting-state={this.settingState}/>
                );
              },
            },
          },
        )
      );
    };

    return (
      <div>
        <el-table
          ref={'el-table'}
          data={this.data} border={this.border}
          max-height={this.height} height={this.height}
          on-selection-change={this.selectionChange}
          show-summary={this.showSummary}
          summary-method={this.summaryMethod}
          highlight-current-row={this.highlightCurrentRow}
        >
          {
            this.head.map((item, index) => {
              if (!item[this.headRefer['hidden']]) {
                const type = item[this.headRefer['xtype']];
                //序号列/选择列
                if (this.specialColInclude.indexOf(type) > -1) {
                  return <first-table-column ref={'first-table-column'}
                                             head-scope={item} headRefer={this.headRefer}
                                             on-selection-change={this.selectionChange}/>;
                }
                //操作列
                else if (this.actionColInclude.indexOf(type) > -1) {
                  return <action-column head-scope={item} headRefer={this.headRefer} scopeRefer={this.scopeRefer}
                                        on-table-action={this.tableAction}
                                        on-add-row={this.addRow}
                                        on-delete-current-row={this.deleteCurrentRow}
                  />;
                }
                else if (this.normalColInclude.indexOf(type) > -1) {
                  return normalColumn(item, index);
                }
                else {
                  return null;
                }
              }
              else {
                return null;
              }
            })
          }
          {
            this.showHeadOperation ? settingColumn() : null
          }
        </el-table>
        <actionDrop head={this.head} headRefer={this.headRefer} setting-state={this.settingState}
                    on-sync-render={this.syncRender}
        />
      </div>
    );
  },

  methods: {
    /**
     * 同步渲染
     * @param data
     */
    syncRender(data) {
      this.$emit('sync-render', data);
    },

    /**
     * 操作列点击
     * @param info
     * @param scope
     */
    tableAction(info, scope) {
      this.$emit('table-action', info, scope);
    },

    /**
     * 表格单元格点击行为事件
     * @param scope
     * @param item
     */
    cellAction(scope, item) {
      this.$emit('cell-action', scope, item);
    },

    /**
     * form cell change - 但换个 change 事件
     * @param value
     * @param param
     */
    cellFormChange(value, param) {
      this.$emit('cell-form-change', value, param);
    },

    /**
     * add row to grid - 增加行
     */
    addRow() {
      this.$emit('add-row');
    },

    /**
     * delete current row - 删除当前行
     * @param index
     * @param row
     */
    deleteCurrentRow(index, row) {
      this.$emit('delete-current-row', index, row);
    },
  },
  beforeDestroy() {
    this.settingState = null;
  },
};
