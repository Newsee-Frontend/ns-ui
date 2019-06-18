import create from '../../create/create';
import tableMain from './components/main';
import actionSummary from './components/action/actionSummary';

import column from './mixins/column';
import refer from './mixins/refer';
import check from './mixins/check';

export default create({
  name: 'table',
  components: { tableMain, actionSummary },
  mixins: [refer, column, check],
  data() {
    return {
      summaryCommand: 'current',//合计模块控制指令
    };
  },
  props: {
    keyRefer: { type: Object },  //指代属性
    gridID: { type: String },//表格ID值
    head: { type: Array }, //表头数据
    data: {
      type: Array, default() {
        return [];
      },
    }, //表格显示的数据
    showSummary: { type: Boolean, default: true },
  },

  watch: {
    head(val) {
      console.log('head');
      console.log(val);
    },
  },

  render(h) {
    const Table = () => {
      return h(
        `table-main`,
        {
          'class': this.recls('container'),
          props: {
            keyRefer: this.keyRefer,
            head: this.head,
            data: this.data,
            showSummary: this.showSummary,
            checkStator: this.checkStator,
            ...this.$attrs,
          },
          on: {
            'selection-change': this.selectionChange,
            'table-action': this.tableAction,
            'cell-action': this.cellAction,
            'add-row': this.addRow,
            'delete-current-row': this.deleteCurrentRow,
            'form-change': this.formChange,
          },
        },
      );
    };

    return (
      <div class={this.recls()}>
        {
          Table()
        }
        {
          this.showSummary ?
            <action-summary command={this.summaryCommand}  {...{
              on: {
                'update:command': value => {
                  this.summaryCommand = value;
                },
              },
            }}
            /> : null
        }

      </div>
    );
  },

  methods: {
    selectionChange(row, index) {
      this.$emit('selection-change', row, index);
    },

    tableAction(info, scope) {
      this.$emit('table-action', info, scope);
    },

    cellAction(scope, item) {
      this.$emit('cell-action', scope, item);
    },


    formChange(value, param) {
      this.setCheckStator(param.cellKey);//set form-cell check config (check list) in table
      this.$emit('form-change', value, param);
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
  },

  created() {
    console.log('表头数据：');
    console.log(this.head);
    console.log('表数据：');
    console.log(this.data);
    console.log('table - $attrs:');
    console.log(this.$attrs);
  },

  mounted() {
  },
});
