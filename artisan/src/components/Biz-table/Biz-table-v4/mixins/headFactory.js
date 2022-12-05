import columnConfig from '../config/column-template-config';
import keyRefer from '../config/keyRefer';
import { listColumnService } from '../../../../service/Table';
import { getThousandNum } from '../utils/index'
/**
 * 关于业务表格表头的一系列操作
 * 1、表头数据获取
 * 2、表头数据字段以及值的转换
 * 3、表头数据根据配置项 - 增加首列操作列等
 * 4、初始化获取表头数据
 */
export default {
  data() {
    return {
      headLoading: false,//表头loading状态
      tableHead: [],//请求到的表头数据
      finalHead: [],//最终处理好的表头数据
      headRefer: keyRefer.head,
      firstColInclude: ['index', 'checkbox', 'radio'],
      actionColInclude: ['action', 'add-row'],
      settingColInclude: ['setting'],
      searchParams: {}
    };
  },

  watch: {
    'searchConditions.mockColType': {
      handler: function(val) {
        this.getTableHead()
      },
      deep: true,
    },
  },

  methods: {
    /**
     * get table head data - 获取表头数据
     */
    async getTableHead() {
      try {
        //异步请求表头数据
        this.headLoading = true;
        if ((this.localHead || []).length === 0) {
          let res =  await  listColumnService({ funcId: 'funcId', mockColType: this.searchConditions.mockColType })
          this.tableHead = res.resultData.columns || [];
        }
        //本地表头数据 （目前只能为本地静态数据)
        this.connectHead = [
          ...(this.firstColType ? [columnConfig[this.firstColType]] : []),
          ...(this.localHead ? this.localHead : this.tableHead) || [],
          ...(this.hasActionCol ? [columnConfig['action']] : []),
          ...(this.showAddRowOperation ? [columnConfig['add-row']] : []),
          ...(this.showHeadOperation ? [columnConfig['setting']] : []),
        ]

        // 筛选器设置默认查询
        const { defaultSortType, field} = this.headRefer
        //获取排序字段
        let sortItem =  this.connectHead.find( i=> keyRefer.sortMap[i[defaultSortType]])
        if(sortItem){
          this.searchConditions.orderBy = keyRefer.sortMap[sortItem[defaultSortType]]
          this.searchConditions.orderFieldName = sortItem[field]
        }
        this.finalHead =　this.connectHead.map(  col => this.transformCol(col))
        await this.$store.dispatch('setTableHead', this.tableHead)//store head data

      }finally {
        this.headLoading = false
      }
    },

    /**
     * Convert header fields by key refer - 转化表头字段
     * @param col - 列数据对象
     */
    transformCol(col) {
      let newCol = { params : {} };
      Object.keys(this.headRefer).forEach(key => {
        /**
         *原返回数据中 resourcecolumnHidden（是否隐藏不显式) 字段值需要转换为： '1' / '0' = > true / false
         *原返回数据中 resourcecolumnOrder（是否排序) 字段值需要转换为： '1' / '0' = > true / false
         */
        if (key === 'hidden' || key === 'sortable') {
          newCol[key] = col[this.headRefer[key]] === true || col[this.headRefer[key]] === '1';
        }

        else if ( key === 'defaultSortType'){
          newCol[key] = keyRefer.sortMap[col[this.headRefer[key]]]
        }
        else if (key === 'isDictionary') {
          newCol[key] = !col[this.headRefer[key]];
        }
        else if( key === 'isFilter'){
          newCol[key] = col[this.headRefer[key]] === 'table';
        }
        else if( key === 'filter-Config' || key === 'slot-Config'){
          newCol.params[key] = col[this.headRefer[key]];
        }

        //数字 金额列自定义 formatter
        else if( key === 'formatter' &&  col.filterType === 'number'){
          newCol[key] = (val)=>{
            if(val && col.editConfig.countAfterPoint > -1){
              val = Number(val.toFixed(col.editConfig.countAfterPoint))
            }
            if(val && !col.editConfig.isMakeUpZero){
              val = parseFloat(val)
            }
            if(val && col.editConfig.isShowSeparator){
              val = getThousandNum(val)
            }
            return val
          }
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

      if (this.firstColInclude.indexOf(coltype) > -1) {
        newCol.fixed = 'left';
      }
      else if ([...this.actionColInclude, ...this.settingColInclude].indexOf(coltype) > -1) {
        newCol.fixed = 'right';
      }
      else {
        newCol.fixed = undefined;
      }

      //区分 id， name列
      let sameTitleCol = this.connectHead.find(i=> {
       return  i[this.headRefer.title] && i[this.headRefer.title] === newCol.title && i[this.headRefer.field] !==  newCol.field
      })
      if(sameTitleCol){
        if(col[this.headRefer.field] + 'Name' === sameTitleCol[this.headRefer.field]){
          //存放额外参数
          newCol.params.subTitle= '编号'
        }
      }

      return newCol;
    },

  },
  created() {
    this.getTableHead()
  },
};
