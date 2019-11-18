import { mapGetters } from 'vuex';
import columnConfig from '../config/column-template-config';
import keyRefer from '../config/keyRefer';

export default {
  data() {
    return {
      headLoading: false,//表头loading状态
      headRefer: keyRefer.head,
      finalHead:[],
    };
  },
  computed: {
    ...mapGetters(['tableHead']),
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
        this.finalHead = this.connectHead.map(col => {
          return this.transformCol(col);
        });
      },
      deep: true,
    },
  },
  methods: {
    /**
     * get table head data
     */
    getTableHead() {
      if (this.localHead) {
        this.tableHead = this.localHead;
      }
      else {
        this.headLoading = true;
        this.$store.dispatch('generateTableHead', { funcId: 'funcId', mockType: this.searchConditions.mockType }).then(() => {

          this.finalHead = this.connectHead.map(col => this.transformCol(col));


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


    addcol() {
      this.finalHead.push(
        this.transformCol({
          'resourcecolumnName': '',//label
          'resourcecolumnCode': 'radio',//model-key
          'resourcecolumnXtype': 'radio',//筛选列类型:index/selection/radio/text/number
          'resourcecolumnWidth': '46',//列的宽度
          'resourcecolumnOrder': '0-3',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
          'resourcecolumnAlign': 'center',//对齐
          'eidtConfig': null,
        }),
      );
    },
  },
  created() {
    this.getTableHead();
  },
};
