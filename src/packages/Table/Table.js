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
      tableHead: [],
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
      this.tableHead = val;
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
            head: this.tableHead,
            data: this.data,
            showSummary: this.showSummary,
            checkStator: this.checkStator,
            ...this.$attrs,
          },
          on: {
            'cell-form-change': this.cellFormChange,
            'sync-render': this.syncRender,
            ...this.$listeners,
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
    syncRender(data) {
      this.tableHead = data;
    },


    cellFormChange(value, param) {
      this.setCheckStator(param.cellKey);//set form-cell check config (check list) in table
      this.$emit('cell-form-change', value, param);
    },

  },

  created() {
    this.tableHead = this.head;
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
