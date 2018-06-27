<template>
  <div class="bussiness-grid">
    <!--grid-->
    <cx-base-grid :gridID="gridID" :gridHead="gridHead" :gridData="gridData" :loadState="loadState"
                  :firstColType="firstColType" :handleColType="handleColType" :align="align" :border="border"
                  :searchConditions="searchConditions" :pageSizes="pageSizes" :layout="layout"
                  :keyRefer="keyRefer" :holderInfo="holderInfo"
                  @refreshGrid="refreshGrid"
                  @cell-action="cellAction"
                  @grid-ation="gridAtion"
                  @selection-change="selectionChange"
                  @setting-submit="settingSubmit"
    >
    </cx-base-grid>
  </div>
</template>
<script>
  import {arrContainObj} from '../../utils'
  import {tableHeaderFetch} from '../../api/table/table'
  import keyRefer from '../../keyRefer';
  import sw from '../../switch';

  export default {
    name: 'bussiness-grid',
    // components: {houseView, customerView, taskView},
    data() {
      return {
        //============= basic data =============
        funcId: '', //funcId
        itemOwnerId: '', //ownerId
        itemHouseId: "",
        itemHouseType: "",
        viewViserble: {
          houseView: {visible: false},
          customerView: {visible: false},
          taskView: {visible: false},
        }, //view dialog viserble switch
        //============= grid modeules =============
        keyRefer: keyRefer,
        headRefer: keyRefer.head,
        gridHead: [],//表头数据
        linkCodeConfig: ['houseShortName', 'houseName', 'ownerName', 'lesseeName', 'custorName', 'taskName'],
      }
    },
    props: {
      //============== 表格部分 =================
      loadState: {
        type: Object, default: {
          data: false,
          head: false,
        }
      },  //表格数据加载状态
      gridID: {type: String},//表唯一ID值
      gridData: {
        type: Object, default() {
          return {};
        }
      },//列表数据
      headSource: {type: String, default: 'request'},//表头数据来源
      LocalHead: {type: Array},//本地表头数据
      align: {type: String},//内容位置（居中，左、右)
      border: {type: Boolean},//表格是否有边框
      firstColType: {type: String},//第一列固定列类型（非自动表头配置）index selection
      handleColType: {type: String},//固定操作列类型（非自动表头配置） handle
      searchConditions: {
        type: Object,
        default() {
          return {
            companyId: "", //公司id
            departmentId: "", //部门id
            filterList: [], //条件
            pageNum: 1, //当前页数
            pageSize: 10, //每页显示条目个数
            orderBy: "", //排序：升序还是降序
            orderFieldName: "", //排序：字段名
            mainSearch: "", //输入框值
            filterConditions: [], //筛选器记录的条件
            //add by xiaosisi on 20170320 用来存储其他检索条件
            otherConditions: {},
            organizationId: "",
            totalType: 1
          };
        }
      },  //搜索条件 searchConditions
      holderInfo: {
        type: Object, default() {
          return {
            fatherCls: 'table-body',
            childClsList: ['search', 'panel-page']
          }
        }
      },//表格容器信息（包含父级容器和所包含的子级容器列表)
      mockQuery: {
        type: Object, default: function () {
          return {
            page: 'normal',
            type: 'normal'
          }
        }
      },//mock query
      //============== 分页器部分 =================
      layout: {type: String},  //分页器组件组件布局，子组件名用逗号分隔
      pageSizes: {type: Array},  //每页显示个数选择器的选项设置

    },
    computed: {
      //是否渲染表格及相关模块 （表头有数据，存在表格内容数据，可以为空）
      isRender() {
        return this.gridHead.length > 0 && this.gridData.list;
      },
    },
    watch: {},
    created() {
      //table header data fetch（ 获取表头数据请求 ）
      this.headerFetch();
    },
    methods: {
      /**
       * table header data fetch（ 获取表头数据请求 ）
       */
      headerFetch() {
        this.loadState.head = false;
        if (this.headSource === 'request') {
          //mock head or normal head
          const query = sw['local-debug'] ? this.mockQuery : null;
          console.log(query);
          //表头数据初始化
          tableHeaderFetch({funcId: this.funcId}, query).then(res => {
            console.log('获取服务端表头数据！！！');
            //表头数据处理，并赋值
            this.gridHead = this.headerHandle('tofront', res.resultData.columns);
            console.log(this.gridHead);
            this.loadState.head = true;
          }).catch(r => {
            this.$message({message: "系统错误", type: "error"});
            this.loadState.head = true;
          });
        }
        else if (this.headSource === 'Local') {
          console.log('获取本地表头数据！！！');
          if (!Array.isArray(this.LocalHead) || this.LocalHead.length < 1) {
            throw 'LocalHead data must be Array format, and the length of the Array must be more than 0, find it.'
          }
          this.gridHead = this.headerHandle('tofront', this.LocalHead);  //表头数据处理，并赋值
          console.log(this.gridHead);
          this.loadState.head = true;
        }
        else {
          throw 'Please set up the correct header data source ( by " headSource "  -  "request" or "Local" ).'
        }

      },

      /**
       * headerHandle （ 表格表头数据处理）
       * @param type
       * @param head
       */
      headerHandle(type, head) {
        //后台数据 =》 前台所需数据
        if (type === 'tofront') {
          return head.map(item => {
            const code = item[this.headRefer['model-code']];
            const hidden = this.headRefer['hidden'];
            const lockIconKey = this.headRefer['lockIcon'];
            //为特殊字段对应单元格增加配置字段信息
            if (arrContainObj(this.linkCodeConfig, code)) {
              item[this.headRefer['cell-Config']] = {
                switchType: true,
                type: "link",
                decimal: null,
                disabled: false,
                maxlength: null,
                max: 0,
                min: 0,
                placeHolder: null,
                require: false,
                validateRule: null
              }
            }
            item[hidden] = this.showStateCover(type, item[hidden]);
            item[lockIconKey] = false;
            return item;
          });
        }
        //前台数据 =》 后台所需数据
        else {
          return head.map(item => {
            const key = this.headRefer['hidden'];
            item[key] = this.showStateCover('toback', item[key]);
            return item
          })
        }
      },

      /**
       * showStateCover （ 表格表头显隐值转换 ）
       * @param type
       * @param val
       */
      showStateCover(type, val) {
        if (type === 'tofront') {
          return val === "0" ? true : false;
        }
        else if (type === 'toback') {
          return val ? '0' : '1';
        }
        else {
          return val;
        }
      },

      /**
       * cell-action （ 表格单元格点击行为事件 ）
       * @param scope
       * @param item
       */
      cellAction(scope, item) {
        console.log('cellAction - 表格单元格点击行为事件抛出回调');
        const modelCode = item[this.headRefer['model-code']];
        console.log(scope);
        console.log(modelCode);
        if (modelCode === 'houseShortName' || modelCode === 'houseName') {
          this.itemHouseId = item.row.houseId;
          this.itemHouseType = item.row.houseType;
          this.viewViserble.houseView.visible = true;
          alert('cell-action event , code is houseShortName or houseName, you can coding bussiness base on it');
        }
        if (modelCode === 'ownerName') {
          this.itemOwnerId = scope.row.ownerId;
          this.viewViserble.customerView.visible = true;
          alert('cell-action event , code is ownerName, you can coding bussiness base on it');
        }
        if (modelCode === 'lesseeName') {
          this.itemOwnerId = scope.row.lesseeId;
          this.viewViserble.customerView.visible = true;
          alert('cell-action event , code is lesseeName, you can coding bussiness base on it')
        }
        if (modelCode === 'custorName') {
          this.itemOwnerId = scope.row.chargeId;
          this.viewViserble.customerView.visible = true;
          alert('cell-action event , code is custorName, you can coding bussiness base on it')
        }
        if (modelCode === 'taskName') {
          this.viewViserble.taskView.visible = true;
          alert('cell-action event , code is taskName, you can coding bussiness base on it')
        }
      },

      //刷新表事件抛出回调
      refreshGrid() {
        this.$emit("refreshGrid");
      },

      /**
       * grid ation event （操作列操作回调事件）
       * @param info
       * @param scope
       */
      gridAtion(info, scope) {
        this.$emit("grid-ation", info, scope);
      },

      /**
       * selection change （表数据 checkbox 选择的时候）
       * @param selection
       */
      selectionChange(selection) {
        this.$emit("selection-change", selection);
      },

      /**
       * setting head list submit （表头操作设置提交抛出回调）
       * @param query
       */
      settingSubmit(query) {
        console.log('表头操作设置提交抛出回调');
        this.gridHead = JSON.parse(JSON.stringify(query))//刷新表头数据
        const requestData = this.headerHandle('toback', query);//处理好的返回给后台的表头数据
        console.log('提交给后台的表头数据');
        console.log(requestData);
        this.loadState.head = true;
        //refresh grid（ 刷新表事件抛出回调 ）
        this.$emit("refreshGrid");
      }

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  $baseH: 39px; //基础表头高度
  .bussiness-grid {
    //表格主体部分
    .el-table {
      thead tr th:last-child {
        padding: 0;
        height: $baseH;
        max-height: $baseH;
        line-height: $baseH;
        box-sizing: border-box;
        .cell {
          height: 100%;
          line-height: inherit;
        }
      }
    }
  }
</style>
