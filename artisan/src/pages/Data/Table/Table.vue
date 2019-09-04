<!--UI 组件库 - Table - 页面测试-->
<template>
  <div>
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
          <span>首列类型:</span>
          <ns-select v-model="firstColType" :options="firstColTypeOpts" @change="getTableData"></ns-select>
        </div>
        <div class="control-block form-block-line">
          <ns-button type="primary" @click="setSelectedRow([2,4,6,8],true)">设置选中行</ns-button>
          <ns-button type="primary" @click="setSelectedRow([6,8],false)">反选选中行</ns-button>
          <ns-button @click="resetSelectState">重置选中状态</ns-button>
          <ns-button type="primary" @click="validate">验证</ns-button>
          <ns-button @click="reset">重置</ns-button>
          <ns-button type="primary" @click="requestNew">获取新数据</ns-button>
          <ns-button type="primary" @click="requestError">模拟服务器出错</ns-button>
          <ns-button type="primary" @click="requestEmpty">模拟空数据</ns-button>
        </div>
        <biz-table ref="biz-table-demo" :loadState="loadState" :data="tableData"
                   :autoResize="false"
                   :customHeight="500"
                   :firstColType="firstColType"
                   :is-form-table="isFormTable"
                   :showAddRowOperation="showAddRowOperation"
                   :showHeadOperation="showHeadOperation"
                   :showSummary="showSummary"
                   :summary-method="summaryMethod"
                   :initSummaryState="summaryState"
                   :searchConditions="searchConditions"
                   @reload="getTableData"
                   @selection-select="selectionSelect"
                   @selection-select-all="selectionSelectAll"
                   @selection-change="selectionChange"
                   @cell-form-change="cellFormChange"
                   @add-row="addRow"
                   @delete-current-row="deleteCurrentRow"
                   @table-action="tableAction"
                   @summary-command="summaryCommand"
                   @refresh="getTableData"
        >
        </biz-table>
      </template>
    </demo-block>

    <!--<biz-table :loadState="loadState" :data="tableData" @selection-change="selectionChange" @table-action="tableAction"></biz-table>-->
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
        firstColType: 'selection',//selection index radio
        isFormTable: true,
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
        showSummary: true,//是否显示合计行
        summaryState: 'total',//合计模块控制指令状态 - 'current' / 'total'
        firstColTypeOpts: [
          { label: '索引', value: 'index' },
          { label: '多选', value: 'selection' },
          { label: '单选', value: 'radio' },
        ],
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

      /**
       * 当选择项发生变化时会触发该事件
       * @param row
       * @param index
       */
      selectionChange(row, index) {
        console.log('表数据 checkbox/radio 选择的时候');
        console.log(row);
        console.log(index);
      },

      /**
       * 当用户手动勾选数据行的 Checkbox 时触发的事件
       * @param selection
       * @param row
       */
      selectionSelect(selection, row) {
        console.log('当用户手动勾选数据行的 Checkbox 时触发的事件');
        console.log(selection);
        console.log(row);
      },

      /**
       * 当用户手动勾选全选 Checkbox 时触发的事件
       * @param selection
       */
      selectionSelectAll(selection) {
        console.log('当用户手动勾选全选 Checkbox 时触发的事件');
        console.log(selection);
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
      /**
       * 合计按钮切换
       * @param command
       */
      summaryCommand(command) {
        console.log('合计行切换，当前模式：');
        console.log(command);
        this.summaryState = command;
      },
      /**
       * 合计计算
       * 注意: 输出一个数组，对应表头长度
       * @param param  -  包含表头数据和表数据，自行根据业务逻辑判断处理
       */
      summaryMethod(param) {
        console.log('合计行计算，表头和表数据如下：');
        console.log(param);

        //通过 param 可以获取 表头 和 表 数据，其中表头数据为每列的基础传值对象数据，与后台返回的表头数据不符合。
        //在数组 columns 中的每一项表头对象中，property 字段为 对应列内容的字段名，可作为唯一标识
        //固定列，操作列，首列等有自己的property对应列内容的字段名，对应'index', 'selection', 'radio', 'action', 'add-row', 'setting'

        const { columns, data } = param;

        //可通过方法获取 较为完整的请求到的表头数据
        const allColumn = this.$refs['biz-table-demo'].getAllColumn();
        const responseColumn = this.$refs['biz-table-demo'].getResponseColumn();

        function createSummary(type) {
          const sums = [];
          columns.forEach((col, index) => {
            if (['index', 'selection', 'radio', 'action', 'add-row', 'setting'].indexOf(col.property) > -1) {
              sums.push('');
            }
            else {
              sums.push(`${type}合计-${index}`);
            }
          });
          return sums;
        }

        //分页合计
        if (this.summaryState === 'current') {
          return createSummary('分页');
        }
        //全部合计
        else if (this.summaryState === 'total') {
          return createSummary('全部');
        }
      },

      /**
       * 设置 表格中选中行
       * @param target  -  目标 - 数组 如【1，2，3，4，5，9】
       * @param state  -  设置状态 false / true
       */
      setSelectedRow(target, state) {
        if (!(['selection', 'radio'].indexOf(this.firstColType) > -1)) return;
        const list = this.firstColType === 'selection' ? target : [target[0]];
        list.forEach(item => {
          this.$refs['biz-table-demo'].setSelectedRow(this.firstColType, item, state);
        });
      },


      validate() {
        this.$refs['biz-table-demo'].checkAll();
      },
      reset() {
        this.$refs['biz-table-demo'].resetCheck();
      },
      /**
       * reset select state
       * @param type  - selection / radio
       */
      resetSelectState(type) {
        this.$refs['biz-table-demo'].resetSelectState(this.firstColType);
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
  .handle {
    margin: 10px 0;
    text-align: right;
  }
</style>
