<!--UI 组件库 - 标准Table - 页面布局整体测试-->
<template>
  <div class="win">
    <div class="ns-container">
      <div class="ns-container-right">
        <div class="action-module">
          <demo-block>
            <template slot="title">常规表格table用法</template>
            <template slot="describe">基础用法</template>
          </demo-block>
        </div>
        <biz-table-v3 ref="biz-normal-table" :loadState="loadState" :data="tableData"
                      :is-form-table="isFormTable"
                      :showAddRowOperation="showAddRowOperation"
                      :showHeadOperation="showHeadOperation"
                      :showSummary="showSummary"
                      :searchConditions="searchConditions"
                      @reload="getTableData"
                      @selection-change="selectionChange"
                      @cell-form-change="cellFormChange"
                      @add-row="addRow"
                      @delete-current-row="deleteCurrentRow"
                      @table-action="tableAction"
        >
        </biz-table-v3>
      </div>
    </div>
  </div>
</template>

<script>
  import { tableDataService } from '../../../service/Table/index';

  export default {
    name: 'normal-table-layout',
    data() {
      return {
        //表格数据加载状态
        loadState: {
          data: false,
          head: false,
        },
        tableData: {},//表格数据
        isFormTable: false,
        //搜索条件 searchConditions
        searchConditions: {
          companyId: '', //公司id
          departmentId: '', //部门id
          filterList: [], //条件
          pageNum: 1, //当前页数
          pageSize: 10, //每页显示条目个数
          orderBy: '', //排序：升序还是降序
          orderFieldName: '', //排序：字段名
          mainSearch: '', //输入框值
          filterConditions: [], //筛选器记录的条件
          //add by xiaosisi on 20170320 用来存储其他检索条件
          otherConditions: {},
          organizationId: 1,
          totalType: 1,
          mockType: 'normal',
        },
        showAddRowOperation: true,
        showHeadOperation: true,
        showSummary: true,
        testlist: [],
      };
    },
    methods: {
      getTableData() {
        this.loadState.data = false;
        tableDataService({ query: this.searchConditions, funcId: 'funcId' }).then(res => {
          this.tableData = res.resultData || {};

          console.log('请求到的表格数据：');
          console.log(this.tableData);
          this.tableData.list.forEach(item => {
            item.fnsclick = [
              { label: '编辑', value: 'gridEditBtn' }, { label: '删除', value: 'gridRemoveBtn' },
              { label: '停用', value: 'sstop' }, { label: '启用', value: 'work' },
            ];
          });


          this.loadState.data = true;
        }).catch(() => {
          this.loadState.data = true;
        });
      },

      selectionChange(row, index) {
        console.log('表数据 checkbox/radio 选择的时候');
        console.log(row);
        console.log(index);
      },

      /**
       * table column action
       * @param info
       * @param scope
       */
      tableAction(info, scope) {
        console.log('操作列按钮点击的时候');
        console.log(info, scope);
      },

      /**
       * form cell value change
       * @param value - change value
       * @param param
       */
      cellFormChange(value, param) {
        console.log('表格单元格表单控件change事件');
        console.log(value);
        console.log(param);
      },

      /**
       * add row to grid
       */
      addRow() {
        console.log('新增行');
      },
      /**
       * delete current row
       * @param index
       * @param row
       */
      deleteCurrentRow(index, row) {
        console.log('删除当前行');
        console.log(index, row);
      },
    },
    created() {
      this.getTableData();

      console.log('table-layout !!!- beforeDestroy-beforeDestroy');


      this.testlist = Object.freeze([
        { value: 1 },
        { value: 2 },
      ]);

      // 界面不会有响应
      // this.testlist[0].value = 100;
      this.testlist.forEach(item => {
        item.fnsclick = [
          { label: '编辑', value: 'gridEditBtn' }, { label: '删除', value: 'gridRemoveBtn' },
          { label: '停用', value: 'sstop' }, { label: '启用', value: 'work' },
        ];
      });

      console.log(this.testlist);

      // // 下面两种做法，界面都会响应
      // this.testlist = [
      //   { value: 100 },
      //   { value: 200 }
      // ];
      // this.testlist = Object.freeze([
      //   { value: 100 },
      //   { value: 200 }
      // ]);
    },
    mounted() {

    },
    beforeDestroy() {
      this.tableData = null;
      this.searchConditions = null;
      this.loadState = null;
      this.tableAction = null;
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .demo-block {
    .demo-block-content {
      display: none;
    }
  }
</style>
