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
    return {};
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
      try {
        return this.formConfig.type;
      } catch (e) {
        return undefined;
      }
    },
    /**
     * is form column render:
     *    1、has current column data
     *    2、has right data format （'cell-Config')
     *    3、current column type in  list（formColInclude)
     * @returns {boolean}
     */
    isFormRender() {
      try {
        if (!this.column) {
          return false;
        }

        if (!this.formConfig) {
          return false;
        }

        if (this.formColInclude.indexOf(this.formType) === -1) {
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

    //内容列( 常规列 / 链接列 / 表单列 )
    else if (this.contentColumns.indexOf(this.columnType) > -1) {
      injection.props = {
        field: this.column.field,
      };

      //default column render config
      let renderProps = {
        name: `ns-table-${this.formType}`,
        props: {
          modelCode: this.modelCode,
          column: this.column,
          formConfig: this.formConfig,
        },
      };

      //form column
      if (this.isFormRender) {
        injection.props['edit-render'] = {
          ...renderProps,
          events: {
            change: this.cellEvent,
          },
        };
      }
      //normal column
      else {
        //link column
        if (this.formType === 'link') {
          console.log(2222222222);
          console.log(this.column.field);
          console.log(2222222222);
          injection.props['cell-render'] = {
            ...renderProps,
            events: {
              click: this.cellEvent,
            },
          };
        }

        //add value formatter
        injection.props.formatter = ({ cellValue }) => {
          //no formatter config => use value
          if (!this.column.formatter) return cellValue;
          //cover by formatter config
          return this.column.formatter[cellValue];
        };
      }
    }


    const general = {
      props: {
        title: this.column.title,
        align: this.column.align,
        fixed: this.column.fixed,
        'header-class-name': ({ column }) => {
          return `column-${column.property || column.type}`;
        },

        /**
         * special columns use width && type ,other use min-width
         * @type {string}
         */
        ...(this.specialColumns.indexOf(this.columnType) > -1
          ? {
            type: this.columnType,
            width: this.column.width,
          }
          : {
            'min-width': this.column.width,
          }),
      },
    };

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
