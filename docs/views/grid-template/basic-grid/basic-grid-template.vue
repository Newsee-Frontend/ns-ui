<!--basic-grid-template-->
<template>
  <el-dialog class="basic-grid-template" width="1200px" title="基础用法示例" :visible.sync="visible.visible"
             top="7%" :modal-append-to-body="true" append-to-body
  >
    <!--temple container-->
    <div class="dialog-container" :id="gridID + '-holder'">
      <!--temple secrch modules-->
      <div class="search" :id="gridID + '-search'">
        <el-input v-model="inputModel" placeholder="请输入内容" size="small" style="width: 200px"></el-input>
        <el-select v-model="selectModel" placeholder="请选择" size="small">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
      </div>
      <!--grid-->
      <cx-base-grid :gridID="gridID" :gridHead="gridHead" :gridData="gridData" :loadState="loadState"
                    :firstColType="firstColType" :handleColType="handleColType" :ationColConfig="ationColConfig"
                    :align="align" :border="border"
                    :showAddRowOperation="showAddRowOperation"
                    :searchConditions="searchConditions" :pageSizes="pageSizes" :layout="layout"
                    :keyRefer="keyRefer" :holderInfo="holderInfo"
                    :gridCheck="gridCheck"
                    @refreshGrid="refreshGrid"
                    @cell-action="cellAction"
                    @grid-ation="gridAtion"
                    @selection-change="selectionChange"
                    @setting-submit="settingSubmit"
                    @add-row="addRow"
                    @delete-current-row="deleteCurrentRow"
      >
      </cx-base-grid>
    </div>
    <div slot="footer">
      <el-button type="primary" size="small" @click="gridSubmit">提交</el-button>
      <el-button type="danger" size="small" @click="reValidate">去除验证状态</el-button>
      <el-button size="small" @click="gridCancel">返回</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {arrContainObj, judgeType} from '../../../utils/index'
  import {tableHeaderFetch} from '../../../api/grid'
  import keyRefer from './keyRefer';
  import emptyRowData from './emptyRowData'

  export default {
    name: 'basic-grid-template',
    data() {
      return {
        //============= basic data =============
        funcId: '',
        emptyRowData: emptyRowData,
        //============= select modeules =============
        inputModel: '',
        options2: [{value: '选项1', label: '选项1'}, {value: '选项2', label: '选项2'}, {value: '选项3', label: '选项3'}],
        selectModel: '',
        //============= grid modeules =============
        keyRefer: keyRefer,
        headRefer: keyRefer.head,
        //---- table组件属性部分 ----
        gridID: 'basic-grid',//表个唯一ID值
        loadState: {data: false, head: false}, //表格数据加载状态
        gridData: {}, //列表数据
        gridHead: [],//表头数据
        align: 'left',//内容位置（居中，左、右)
        border: true,//表格是否有边框
        firstColType: 'selection',//第一列固定列类型（非自动表头配置）
        handleColType: 'handle',//固定操作列类型（非自动表头配置）
        ationColConfig: {width: '150'},//固定操作列自定义配置
        showAddRowOperation: true,//表头设置 新增行操作模块开关
        searchConditions: {
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
        },//搜索条件
        mockQuery: {page: 'normal', type: 'normal'},//固定操作列类型（非自动表头配置）
        layout: "sizes, prev, pager, next, jumper", //分页器组件组件布局，子组件名用逗号分隔
        pageSizes: [10, 20, 50, 100],  //每页显示个数选择器的选项设置
        //---- table数据处理部分 ----
        linkCodeConfig: ['houseShortName', 'houseName', 'ownerName', 'lesseeName', 'custorName', 'taskName'],
        gridCheck: {state: '', list: []},//grid check data for form in grid cell
      }
    },
    computed: {
      //表格容器信息（包含父级容器和所包含的子级容器列表)
      holderInfo() {
        return {fatherID: this.gridID + '-holder', childIDList: [this.gridID + '-search', this.gridID + '-panel']};
      }
    },
    props: {
      //是否显示 Dialog。
      visible: {
        type: Object,
        default: function () {
          return {
            visible: false
          }
        }
      },
    },
    components: {},
    created() {
      //table header data fetch（ 获取表头数据请求 ）
      this.headerFetch();
      //table data fetch（ 获取表格数据请求 ）
      this.refreshGrid();
    },
    methods: {
      /**
       * refresh grid （ 表格数据获取 / 刷新表格数据 ）
       */
      refreshGrid() {
        this.loadState.data = false;
        this.grid.fetch(
          {url: '/table/tableData/normal', query: this.searchConditions},
          res => {
            this.gridData = res;
            console.log('表格数据请求成功！！');
            console.log(this.gridData);
            this.loadState.data = true;
          }
        );
      },

      /**
       * grid ation event （操作列操作回调事件）
       * @param info
       * @param scope
       */
      gridAtion(info, scope) {
        console.log('操作列操作');
        console.log(info);
        console.log(scope);
      },

      /**
       * table header data fetch（ 获取表头数据请求 ）
       */
      headerFetch() {
        this.loadState.head = false;
        //mock head or normal head
        const query = this.mockQuery;
        console.log(query);
        //表头数据初始化
        tableHeaderFetch({funcId: this.funcId}, query).then(res => {
          console.log('获取表头数据！！！');
          console.log(res.data.resultData.columns);
          //表头数据处理，并赋值
          this.gridHead = this.headerHandle('tofront', res.data.resultData.columns);
          console.log('获取处理后的表头数据！！！');
          console.log(this.gridHead);
          this.loadState.head = true;
        }).catch(r => {
          this.$message({message: "系统错误", type: "error"});
          this.loadState.head = true;
        });
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
            const fixedKey = this.headRefer['fixed'];
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
            if (!item.hasOwnProperty(fixedKey)) {
              item[fixedKey] = false;
            }
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
          if (judgeType(val) === 'boolean') {
            return val;
          }
          return val !== "0";
        }
        else if (type === 'toback') {
          return val ? '1' : '0';
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
        console.log('cell-action-event - 表格单元格点击行为事件抛出');
        console.log(scope);
        console.log(item);
      },

      /**
       * selection change （表数据 checkbox 选择的时候）
       * @param selection
       */
      selectionChange(selection) {
        console.log('grid-selection-change - 表数据 checkbox 选择事件抛出');
        console.log(selection);
      },

      /**
       * setting head list submit （表头操作设置提交抛出回调）
       * @param query
       */
      settingSubmit(query) {
        console.log('表头操作设置提交抛出回调');
        this.gridHead = JSON.parse(JSON.stringify(query));//刷新表头数据
        const requestData = this.headerHandle('toback', query);//处理好的返回给后台的表头数据
        console.log('提交给后台的表头数据');
        console.log(requestData);
        this.loadState.head = true;
        //refresh grid（ 刷新表事件抛出回调 ）
        this.$emit("refreshGrid");
      },
      /**
       * delete current row
       * @param index
       * @param row
       * @param gridData
       */
      deleteCurrentRow(index, row, gridData) {
        const list = gridData.list;
        if (list.length < 1) return false;//empty to  break
        list.splice(index, 1);//delete
      },
      /**
       * add row to grid
       * @param gridData
       */
      addRow(gridData) {
        console.log(gridData);
        console.log(emptyRowData);
        gridData.list.push(emptyRowData);//add
      },

      /**
       * grid submit
       */
      gridSubmit() {
        this.grid.validate(this.gridCheck).then(
          () => {
            console.log('表格验证成功');
          }
        ).catch(
          () => {
            console.log('表格验证失败');
          }
        );
      },
      /**
       * reValidate
       */
      reValidate() {
        this.grid.reValidate(this.gridCheck).then(
          () => {
            console.log('表格去除验证错误提示成功');
          }
        ).catch(
          () => {
            console.log('表格去除验证错误提示失败');
          }
        );
      },
      /**
       * close dialog
       */
      gridCancel() {
        this.visible.visible = false;
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  $baseH: 39px; //基础表头高度
  .basic-grid-template {
    .el-dialog__body {
      padding-bottom: 0;
    }
    .dialog-container {
      height: 100%;
      box-sizing: border-box;
      .search {
        padding-bottom: 30px;
      }
      //表格主体部分
      .cx-grid {
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
    }
  }
</style>
