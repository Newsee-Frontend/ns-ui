<!--bussiness-grid-template-->
<template>
  <el-dialog class="bussiness-grid-template" width="900px" title="业务封装用法示例" :visible.sync="visible.visible"
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
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <span @click="click">改变表格高度</span>
      </div>
      <!--grid-->
      <bussiness-grid :gridID="gridID" :gridData="gridData" firstColType="selection" handleColType="handle"
                      :loadState="loadState" :searchConditions="searchConditions"
                      :showSummary="true" :holderInfo="holderInfo"
                      :sizeInfo="sizeInfo"
                      @refreshGrid="refreshGrid"
                      @grid-ation="gridAtion"
                      @selection-change="selectionChange">
      </bussiness-grid>
    </div>
    <div slot="footer">
      <el-button type="primary" size="small">提交</el-button>
      <el-button size="small" @click="cancel">返回</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {renderRange} from '../../../lib/utils/index'

  export default {
    name: 'bussiness-grid-template',
    data() {
      return {
        height: '70px',
        //============= basic data =============
        funcId: '',
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
       * close dialog
       */
      cancel() {
        this.visible.visible = false;
      }
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
