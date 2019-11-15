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
      return this.column[this.headRefer['xtype']];
    },
    modelCode() {
      return this.column[this.headRefer['model-key']];
    },

    //表单单元格配置信息
    formConfig() {
      return this.column[this.headRefer['cell-Config']];
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

    //常规列( 常规列 / 链接列 / 表单列 )
    if (this.normalColInclude.indexOf(this.columnType) > -1) {
      injection.props = {
        field: this.column[this.headRefer['model-key']],
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

    //操作列
    else if (this.actionColInclude.indexOf(this.columnType) > -1) {
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
    else if (this.settingColInclude.indexOf(this.columnType) > -1) {
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
    } else {
    }

    console.log('当前字段');
    console.log(this.column[this.headRefer['model-key']]);
    console.log('当前列类型');
    console.log(this.columnType);

    if (this.column[this.headRefer['model-key']] === 'organizationShortName') {
      console.log('问题列');
    }

    const general = {
      props: {
        type: this.columnType,
        title: this.column[this.headRefer['label']],
        align: this.column[this.headRefer['align']],
        fixed: this.column[this.headRefer['fixed']],
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

    general.props[wk] = this.column[this.headRefer['width']];

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
  created() {},
};
