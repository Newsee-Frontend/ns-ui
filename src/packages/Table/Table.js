import create from '../../create/create';
import tableMain from './components/main';
import actionSummary from './components/action/actionSummary';
import errorPrompt from './components/error/error-prompt';
import LoadingBlock from '../Loading-block/Loading-block';


import refer from './mixins/refer';
import column from './mixins/column';
import check from './mixins/check';
import readyState from './mixins/readyState';
import error from './mixins/error';

export default create({
  name: 'table',
  components: { tableMain, actionSummary, errorPrompt, LoadingBlock },
  mixins: [refer, column, check, readyState, error],
  data() {
    return {
      tableHead: [],
      summaryCommand: 'current',//合计模块控制指令

    };
  },
  props: {
    keyRefer: { type: Object },  //指代属性
    head: {
      type: Array, default() {
        return [];
      },
    }, //表头
    data: {
      type: Array, default() {
        return [];
      },
    }, //表数据
    height: { type: Number, default: 500 },
    showSummary: { type: Boolean, default: true },
  },

  watch: {
    head(val) {
      this.tableHead = val;
    },
  },
  render(h) {
    const MainTable = () => {
      return h(
        `table-main`,
        {
          'class': this.recls('container'),
          props: {
            keyRefer: this.keyRefer,
            head: this.tableHead,
            data: this.data,
            height: this.height,
            showSummary: this.showSummary,
            checkStator: this.checkStator,
            ...this.$attrs,
          },
          on: {
            ...this.$listeners,
            'cell-form-change': this.cellFormChange,
            'sync-render': this.syncRender,
          },
        },
      );
    };

    return (
      <div class={this.recls()} style={{ height: this.height + 'px' }}>
        {
          this.isMainReady ? MainTable() : null
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
        {
          !this.isLoadReady ?
            <div class={'mask'}>
              {
                this.mask_head_state ? <LoadingBlock class={'table-loading head'} simple/> : null
              }
              {
                !this.mask_body_state ? <LoadingBlock class={'table-loading body'}/> : null
              }
            </div> : null
        }
        {
          h(
            `error-prompt`,
            {
              props: {
                'error-type': this.errorType,
              },
              on: {
                ...this.$listeners,
              },
            },
          )
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
      this.$emit('cell-change', value, param);
    },

  },

  created() {
    this.tableHead = this.head;

    // console.log('表头数据：');
    // console.log(this.head);
    // console.log('表数据：');
    // console.log(this.data);
    // console.log('table - $attrs:');
    // console.log(this.$attrs);
  },
  beforeDestroy() {
    this.data = null;
    this.head = null;
    this.keyRefer = null;
  },
});
