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
    renderConfig() {
      return this.column['cell-Config'];
    },

    //渲染单元格类型
    renderType() {
      try {
        return this.renderConfig.type;
      } catch (e) {
        return undefined;
      }
    },
    /**
     *  Is it the correct rendering format：
     *    1、has current column data
     *    2、has right data format （'cell-Config')
     *    3、current column type in  list（renderColInclude)
     * @returns {boolean}
     */
    isRenderFormat() {
      try {
        if (!this.column) {
          return false;
        }

        if (!this.renderConfig) {
          return false;
        }

        if (this.renderColInclude.indexOf(this.renderType) === -1) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  render(h) {
    const injection = {
      scopedSlots: {},
      props: {},
    };

    //列头配置项
    const general = {
      props: {
        title: this.column.title,
        align: this.column.align,
        fixed: this.column.fixed,
        sortable: this.column.sortable,
        visible: !this.column.hidden,
        params: this.column.params,
        'header-class-name': ({ column }) => {
          return `column-${column.property} column-${this.columnType} ${
            this.renderConfig?.require ? 'column-required' : ''
          }`;
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

    //根据配置来判断是否塞入塞入筛选条件
    if (this.column.isFilter) {
      injection.props.filters = [{ data: '' }];
      injection.scopedSlots.filter = scope => {
        return this.$scopedSlots['filter-slot'] && this.$scopedSlots['filter-slot'](scope);
      };
    }

    // 列头插槽
    //判断首列是否是checkbox redio index(seq) 等，如果是的话，就不需要列头插槽
    if ([...this.firstColInclude, ...this.settingColInclude].indexOf(this.columnType) === -1) {
      injection.scopedSlots.header = scope => {
        return (
          <span>
            {this.column.title}
            {this.$scopedSlots['header-slot'] && this.$scopedSlots['header-slot']({ scope })}
          </span>
        );
      };
    } else {
      injection.props.type = this.column.type;
    }

    //操作列
    if (this.actionColInclude.indexOf(this.columnType) > -1) {
      injection.props['show-overflow'] = 'ellipsis';
      injection.scopedSlots = {
        default: this.$scopedSlots['btn-slot'],
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
            <span class={'el-dropdown-link el-dropdown-selfdefine'} on-click={this.showSettingDrop}>
              <i class={'el-icon-setting'} />
            </span>
          );
        },
      };
    }

    //普通列( 文字列 / 数字 )
    if (this.normalColInclude.indexOf(this.columnType) > -1) {
      // console.log('普通列( 文字列 / 数字 )');
      injection.props.field = this.column.field;
      injection.props.formatter = cell => cell.cellValue;

      /**
       * cover by formatter config
       * Note: the current usage only applies to non form rendering (normal text cell render)
       */
      if (this.column.formatter) {
        //add value formatter
        injection.props.formatter = ({ cellValue }) => {
          return typeof this.column.formatter === 'function'
            ? this.column.formatter(cellValue)
            : this.column.formatter[cellValue];
        };
      }
    }

    //渲染( 表单列 / 链接列 / 插槽列 )
    if (this.renderColInclude.indexOf(this.columnType) > -1) {
      // console.log('render列( 表单列 / 链接列 / 插槽列 )');

      injection.props.field = this.column.field;

      //default column render config
      let renderProps = {
        name: `table-render-${this.renderType}`,
        props: {
          modelCode: this.modelCode,
          column: this.column,
          formConfig: this.renderConfig,
        },
      };

      //form column
      if (this.isRenderFormat) {
        //特殊的渲染列
        if (['link'].indexOf(this.renderType) > -1) {
          injection.props['cell-render'] = {
            ...renderProps,
            events: {
              click: this.cellEvent,
            },
          };

          /**
           * cover by formatter config
           * Note: the current usage only applies to non form rendering (normal text cell render)
           */
          if (this.column.formatter) {
            //add value formatter
            injection.props.formatter = ({ cellValue }) => {
              return this.column.formatter[cellValue];
            };
          }
        } else if (['slot'].indexOf(this.renderType) > -1) {
          injection.props.field = this.column.field;
          injection.scopedSlots.default = this.$scopedSlots['cell-slot'];
        }
        //基础表单的渲染列
        else {
          injection.props['edit-render'] = {
            ...renderProps,
            events: {
              change: this.cellEvent,
              blur: this.cellEvent,
              focus: this.cellEvent,
            },
          };
        }
      }
    }
    return h(`vxe-table-column`, deepObjectMerge(general, injection));
  },
  methods: {
    /**
     * cell for form-table change event
     * @param row
     * @param rowIndex
     * @param column
     * @param columnIndex
     * @param event
     */
    cellEvent({ row, rowIndex, column, columnIndex }, event) {
      this.$emit('cell-event', { row, rowIndex, column, columnIndex }, event);
    },

    //table action in column
    tableAction(info, { row, rowIndex, column, columnIndex }) {
      this.$emit('table-action', info, { row, rowIndex, column, columnIndex });
    },

    // 设置点击
    showSettingDrop() {
      this.$emit('show-setting');
    },
  },
};
