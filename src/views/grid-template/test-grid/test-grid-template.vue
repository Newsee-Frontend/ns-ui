<!--test-grid-template-->
<template>
  <el-dialog class="test-grid-template" width="1200px" title="测试操作示例" :visible.sync="visible.visible"
             top="7%" :modal-append-to-body="true" append-to-body
  >
    <!--temple container-->
    <div class="template-container">
      <!--temple secrch modules-->
      <div class="search">
        <el-input v-model="inputModel" placeholder="请输入内容" size="small" style="width: 200px"></el-input>
        <el-select v-model="selectModel" placeholder="请选择" size="small">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
      </div>
      <!--grid-->
      <bussiness-grid gridID="bussiness-grid" :gridData="gridData" :loadState="loadState"
                      :searchConditions="searchConditions" :holderInfo="holderInfo"

                      headSource="Local"
                      :LocalHead="loaclHead"

                      :firstColType="null"
                      handleColType="handle"

                      align="left"
                      :border="true"

                      layout="slot,sizes, prev, pager, next, jumper"
                      :pageSizes="[10, 20, 50, 100]"

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
  import loaclHead from './local-head'

  export default {
    name: 'test-grid-template',
    data() {
      return {
        //============= basic data =============
        funcId: '',
        //============= select modeules =============
        inputModel: '',
        options2: [{value: '选项1', label: '选项1'}, {value: '选项2', label: '选项2'}, {value: '选项3', label: '选项3'}],
        selectModel: '',
        //============= grid modeules =============
        //---- table组件属性部分 ----
        gridID: 'test-grid',//表个唯一ID值
        loaclHead: loaclHead,//本地表头数据
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
        holderInfo: {fatherCls: 'template-container', childClsList: ['search', 'panel-page']},//表格容器信息（包含父级容器和所包含的子级容器列表)
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
  .test-grid-template {
    .el-dialog__body {
      padding-bottom: 0;
    }
    .template-container {
      height: 100%;
      box-sizing: border-box;
      .search {
        padding-bottom: 30px;
      }
    }
  }
</style>
