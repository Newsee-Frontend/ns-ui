import columnConfig from '../config/column-template-config';
import keyRefer from '../config/keyRefer';
import { listColumnService } from '../../../../service/Table';

export default {
  data() {
    return {
      headLoading: false,//表头loading状态
      tableHead: [],//请求到的表头数据
      finalHead: [],//最终处理好的表头数据
      headRefer: keyRefer.head,
    };
  },
  computed: {
    connectHead() {
      return [
        ...(this.firstColType ? [columnConfig[this.firstColType]] : []),
        ...(this.localHead ? this.localHead : this.tableHead) || [],
        ...(this.hasActionCol ? [columnConfig['action']] : []),
        ...(this.showAddRowOperation ? [columnConfig['add-row']] : []),
        ...(this.showHeadOperation ? [columnConfig['setting']] : []),
      ];
    },
  },
  watch: {
    connectHead: {
      handler: function(val) {
        console.log('connectHead - connectHead - 变化');
        console.log('connectHead - connectHead - 变化');
        this.finalHead = val.map(col => {
          return this.transformCol(col);
        });
        console.log(this.finalHead);
      },
      deep: true,
      // immediate: true,
    },
  },
  methods: {
    /**
     * get table head data - 获取表头数据
     */
    getTableHead() {
      //本地表头数据
      if (this.localHead) {
        this.finalHead = this.connectHead.map(col => {
          return this.transformCol(col);
        });
      }
      //异步请求表头数据
      else {
        this.headLoading = true;
        listColumnService({ funcId: 'funcId', mockType: this.searchConditions.mockType }).then(res => {
          this.tableHead = res.resultData.columns || [];

          console.log('请求到的表头数据：');
          console.log(this.tableHead);

          this.$store.dispatch('setTableHead', this.tableHead);//store head data

          this.headLoading = false;

        }).catch(() => {
          this.headLoading = false;
        });
      }
    },

    /**
     * Convert header fields by key refer - 转化表头字段
     * @param col - 列数据对象
     */
    transformCol(col) {
      let newCol = {};

      Object.keys(this.headRefer).forEach(key => {
        /**
         *原返回数据中 resourcecolumnHidden（是否隐藏不显式) 字段值需要转换为： '1' / '0' = > true / false
         */
        if (key === 'hidden') {
          newCol[key] = col[this.headRefer[key]] === true || col.resourcecolumnHidden === '1';
        }
        //其他字段正常转换
        else {
          newCol[key] = col[this.headRefer[key]];
        }
      });

      /**
       * 新加 fixed 字段 - 原返回数据中没有该字段，故手动增加
       */
      const coltype = newCol.type;

      if (this.specialColInclude.indexOf(coltype) > -1) {
        newCol.fixed = 'left';
      }
      else if ([...this.actionColInclude, ...this.settingColInclude].indexOf(coltype) > -1) {
        newCol.fixed = 'right';
      }
      else {
        newCol.fixed = undefined;
      }

      return newCol;
    },

  },
  created() {
    this.getTableHead();
  },
};
