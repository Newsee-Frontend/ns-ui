<!--bussiness-grid-template-->
<template>
  <el-dialog class="bussiness-grid-template" width="1200px" title="业务封装用法示例" :visible.sync="visible.visible"
             top="7%" :modal-append-to-body="true" append-to-body
  >
    <!--temple container-->
    <div class="dialog-container" :id="gridID + '-holder'">
      <!--temple secrch modules-->
      <div class="search" :id="gridID + '-search'">
        <el-input v-model="inputModel" placeholder="请输入内容" size="small" style="width: 200px"></el-input>
        <el-select v-model="selectModel" placeholder="请选择" size="small" @change="selectChange">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search()">搜索</el-button>
        <!--<span @click="click">改变表格高度</span>-->
      </div>
      <!--grid-->
      <bussiness-grid :gridID="gridID" :gridData="gridData" firstColType="radio" handleColType="handle"
                      :loadState="loadState" :searchConditions="searchConditions"
                      :showAddRowOperation="false"
                      :holderInfo="holderInfo"
                      :pagerCount="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :sizeInfo="sizeInfo"
                      :gridCheck="gridCheck"
                      :sumDataCustom="sumDataCustom"
                      :hideSummaryForced="true"
                      @refreshGrid="refreshGrid"
                      @grid-ation="gridAtion"
                      @selection-change="selectionChange"
                      @add-row="addRow"
                      @delete-current-row="deleteCurrentRow"
      >
      </bussiness-grid>
    </div>
    <div slot="footer">
      <el-button type="primary" size="small" @click="gridSubmit">提交</el-button>
      <el-button type="danger" size="small" @click="reValidate">去除验证状态</el-button>
      <el-button size="small" @click="gridCancel">返回</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import emptyRowData from './emptyRowData'

  export default {
    name: 'bussiness-grid-template',
    data() {
      return {
        height: '70px',

        //============= basic data =============
        funcId: '',
        emptyRowData: emptyRowData,
        //============= select modeules =============
        inputModel: '',
        options2: [{value: 'less200', label: '总金额小于200'}, {value: 'more200', label: '总金额大于200'}],
        selectModel: '',
        //============= grid modeules =============
        //---- table组件属性部分 ----
        gridID: 'bussiness-grid',//表个唯一ID值
        loadState: {data: false, head: false}, //表格数据加载状态
        gridData: {}, //列表数据
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
        sizeInfo: {
          maxHeight: 300
        },
        gridCheck: {state: '', list: []},//grid check data for form in grid cell
        sumDataCustom: {},//全部数据合计行数据自定义（外部传入）
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
    created() {
      //table data fetch（ 获取表格数据请求 ）
      this.refreshGrid();
    },
    methods: {
      search() {
        console.log(this.gridData);
        this.gridData.list[0].sum = (Math.random() * 1000).toFixed(2);
        this.sumDataCustom = {
          Remark: "",
          TaxRate: "",
          actualSum: (Math.random() * 1000).toFixed(2),
          address: "",
          chargeCustomer: "",
          chargeStandard: "",
          city: "",
          date: "",
          email: "",
          mobile: "",
          ownerName: "",
          province: "",
          sex: "",
          sum: (Math.random() * 1000).toFixed(2),
          taskName: "",
          unit: "",
          zip: "",
        };
        console.log(this.gridData);
        this.sizeInfo.maxHeight = 500;
        console.log(this.sizeInfo.maxHeight);
      },
      selectChange(val) {
        this.searchConditions.filterConditions = [];
        this.searchConditions.filterConditions.push(val);
        this.refreshGrid();
      },

      click() {
        this.sizeInfo.maxHeight = 350;
        console.log(this.sizeInfo.maxHeight)
      },
      /**
       * refresh grid （ 表格数据获取 / 刷新表格数据 ）
       */
      refreshGrid() {
        this.loadState.data = false;
        this.grid.fetch(
          {url: '/table/tableData/fnsclick', query: this.searchConditions},
          res => {
            this.gridData = res;
            console.log('表格数据请求成功！！');
            console.log(this.gridData);

            this.gridData.list.forEach(item => {
              item.fnsclick = [
                {label: '编辑', value: 'gridEditBtn'}, {label: '删除', value: 'gridRemoveBtn'},
                {label: '停用', value: 'stop'}, {label: '启用', value: 'work'},
              ];
            });

            this.sumDataCustom = {
              Remark: "",
              TaxRate: "",
              actualSum: "99999999.00",
              address: "",
              chargeCustomer: "",
              chargeStandard: "",
              city: "",
              date: "",
              email: "",
              mobile: "",
              ownerName: "",
              province: "",
              sex: "",
              sum: "99999999.00",
              taskName: "",
              unit: "",
              zip: "",
            };
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
       * selection change （表数据 checkbox 选择的时候）
       * @param selection
       */
      selectionChange(selection) {
        console.log('grid-selection-change - 表数据 checkbox 选择事件抛出');
        console.log(selection);
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
  .bussiness-grid-template {
    .el-dialog__body {
      padding-bottom: 0;
    }
    .dialog-container {
      height: 100%;
      box-sizing: border-box;
      .search {
        padding-bottom: 30px;
      }
    }
  }
</style>
