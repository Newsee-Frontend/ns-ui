import keyRefer from '../mixins/keyRefer';
import columntype from '../mixins/columntype';
import actionDrop from './action-drop';
import { deepObjectMerge } from '../../../utils/library/basic';

export default {
  name: '',
  components: { actionDrop },
  mixins: [keyRefer, columntype],
  props: {
    column: { type: Object },
    columns: { type: Array },
    customColumns: { type: Array },
    keyRefer: { type: Object },
  },
  data() {
    return {
      formCellList: [
        'link',
        'input',
        'rate',
        'time',
        'date',
        'datetime',
        'checkbox',
        'radio',
        'select',
        'select-unit',
      ],
    };
  },
  computed: {
    columnType() {
      return this.column.type;
    },
    modelCode() {
      return this.column.field;
    },

    //表单单元格配置信息
    formConfig() {
      return this.column['cell-Config'];
    },
    //表单单元格类型
    formType() {
      return this.formConfig[this.scopeRefer['type']];
    },
    //是否为表单渲染
    isFormRender() {
      try {
        if (!this.column) {
          return false;
        }

        if (!this.formConfig) {
          return false;
        }

        if (this.formCellList.indexOf(this.formType) === -1) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  render(h) {
    const injection = {};

    //操作列
    if (this.actionColInclude.indexOf(this.columnType) > -1) {
      injection.props = {
        'cell-render': {
          name: 'ns-table-action-cell',
          props: {
            column: this.column,
            scopeRefer: this.scopeRefer,
          },
          events: {
            click: this.tableAction,
          },
        },
      };
    }
    //设置列
    if (this.settingColInclude.indexOf(this.columnType) > -1) {
      injection.scopedSlots = {
        default: () => {
          return [];
        },
        header: scope => {
          return (
            <action-drop
              customColumns={this.customColumns}
              on-sync-column-render={this.syncColRender}
              on-column-setting-submit={this.columnSettingSubmit}
            />
          );
        },
      };
    }

    //常规列( 常规列 / 链接列 / 表单列 )
    else if (this.normalColInclude.indexOf(this.columnType) > -1) {
      injection.props = {
        field: this.column.field,
      };

      if (this.isFormRender) {
        let renderProps = {
          name: `ns-table-${this.formType}`,
          props: {
            modelCode: this.modelCode,
            column: this.column,
            formConfig: this.formConfig,
          },
        };

        if (this.formType === 'link') {
          injection.props['cell-render'] = {
            ...renderProps,
            events: {
              click: this.cellEvent,
            },
          };
        } else {
          injection.props['edit-render'] = {
            ...renderProps,
            events: {
              change: this.cellEvent,
            },
          };
        }
      }
    }


    const general = {
      props: {
        type: this.columnType,
        title: this.column.title,
        align: this.column.align,
        fixed: this.column.fixed,
        'header-class-name': ({ column }) => {
          return `column-${column.property || column.type}`;
        },
      },
    };

    /**
     * special columns use width ,other use min-width
     * @type {string}
     */
    const wk = this.specialColumns.indexOf(this.columnType) > -1 ? 'width' : 'min-width';

    general.props[wk] = this.column.width;

    return h(`vxe-table-column`, deepObjectMerge(general, injection));
  },
  methods: {
    /**
     * cell for form-table change event
     * @param row
     * @param rowIndex
     * @param column
     * @param columnIndex
     */
    cellEvent({ row, rowIndex, column, columnIndex }) {
      // this.$refs.xTable.updateStatus(scope)
      // console.log('cellEvent-cellEvent-cellEvent');
      // console.log(this.$parent);
      // console.log(this.$parent.$options);
      // console.log(this.$parent.$options.name);
      // this.$parent.updateStatus()
      this.$emit('cell-event', { row, rowIndex, column, columnIndex }, event);
    },

    //table action in column
    tableAction(info, { row, rowIndex, column, columnIndex }) {
      this.$emit('table-action', info, { row, rowIndex, column, columnIndex });
    },

    /**
     * sync column render
     * @param event
     * @param customColumns
     */
    syncColRender({ event, customColumns }) {
      this.$emit('sync-column-render', { event, customColumns });
    },

    /**
     * column setting submit
     * @param column - column data after setting
     */
    columnSettingSubmit(column) {
      this.$emit('column-setting-submit', column);
    },
  },
  created() {
  },
};
