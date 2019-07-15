<!--UI 组件库 - Table - 页面测试-->
<template>
  <div class="win">
    <div class="ns-container">
      <div class="ns-container-right">
        <div class="action-module">
          <demo-block>
            <template slot="title">表格table 用法</template>
            <template slot="describe">基础用法</template>
            <template slot="content">
              <div class="control-block form-block-line">
                <span>显示新增行列:</span>
                <ns-switch v-model="showAddRowOperation"></ns-switch>
                <span>显示表头设置列:</span>
                <ns-switch v-model="showHeadOperation"></ns-switch>
                <span>是否显示合计行:</span>
                <ns-switch v-model="showSummary"></ns-switch>
                <ns-button type="primary" @click="validate">验证</ns-button>
                <ns-button @click="reset">重置</ns-button>
                <ns-button type="primary" @click="requestNew">获取新数据</ns-button>
                <ns-button type="primary" @click="requestError">模拟服务器出错</ns-button>
                <ns-button type="primary" @click="requestEmpty">模拟空数据</ns-button>
              </div>

            </template>
          </demo-block>
        </div>
        <biz-table ref="biz-table-demo1" :loadState="loadState" :data="tableData"
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
        </biz-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { tableDataService } from '../../../service/Table';


  export default {
    name: 'table-demo',
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
          mockType: null,
        },
        showAddRowOperation: true,
        showHeadOperation: true,
        showSummary: true,
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
      validate() {
        this.$refs['biz-table-demo1'].checkAll();
      },
      reset() {
        this.$refs['biz-table-demo1'].resetCheck();
      },
      requestNew() {
        this.searchConditions.organizationId = 2;
        this.searchConditions.mockType = 'no-error';
        this.getTableData();
      },
      requestError() {
        this.searchConditions.organizationId = 1;
        this.searchConditions.mockType = 'service-error';
        this.getTableData();
      },
      requestEmpty() {
        this.searchConditions.organizationId = 1;
        this.searchConditions.mockType = 'no-result';
        this.getTableData();
      },
    },
    created() {
      this.getTableData();
      console.log(2222222222222222);
      console.log('table-layout !!!- created-created');
      console.log(2222222222222222);
    },
    mounted() {

    },
    beforeDestroy() {
      this.tableData = null;
      this.searchConditions = null;
      this.loadState = null;

      console.log(2222222222222222);
      console.log('table-layout !!!- beforeDestroy-beforeDestroy');
      console.log(2222222222222222);
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .handle {
    margin: 10px 0;
    text-align: right;
  }
</style>
