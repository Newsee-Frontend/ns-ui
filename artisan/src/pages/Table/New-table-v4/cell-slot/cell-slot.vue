<!--新表格-插槽单元格 示例-->
<template>
  <div class="win formTable-cell-slot">
    <div class="ns-container">
      <demo-block>
        <template slot="title">表单表格-插槽单元格用法示例</template>
        <template slot="content">
          <div class="control-block form-block-line">
            <span>当前页数总条目:</span>
            <ns-input v-model.number="searchConditions.pageSize"></ns-input>
            <ns-button @click="requestTableData">刷新表格数据</ns-button>
            <ns-button @click="resetFilter">重置筛选条件</ns-button>
            <ns-button @click="setFilter">设置筛选条件（拥有人）</ns-button>
          </div>
<!--          <div class="table-template-block">-->
<!--            <biz-table-v4-->
<!--              ref="formTable"-->
<!--              :loading="loading"-->
<!--              :data="tableData.list"-->
<!--              :total="total"-->
<!--              @select-change="selectChange"-->
<!--              :autoResize="false"-->
<!--              :customHeight="300"-->
<!--              :searchConditions="searchConditions"-->
<!--              @table-action="tableAction"-->
<!--              @reload="requestTableData"-->
<!--            >-->

<!--              <template slot="cell-slot" slot-scope="scope">-->

<!--                &lt;!&ndash;如果插槽内容复杂 - 建议封装子组件，局部引入。&ndash;&gt;-->
<!--                &lt;!&ndash;简单情况下，直接写在插槽内部&ndash;&gt;-->
<!--                &lt;!&ndash;scope - 对外暴露的参数&ndash;&gt;-->
<!--                <cell-slot-component :scope="scope"></cell-slot-component>-->

<!--              </template>-->

<!--            </biz-table-v4>-->
<!--          </div>-->

          <div class="table-template-block">
            <biz-table-v4
              ref="formTable"
              :loading="loading"
              :data="tableData.list"
              :total="total"
              :autoResize="false"
              :customHeight="300"
              first-col-type="index"
              :searchConditions="searchConditions"
              :draggable="true"
              @table-action="tableAction"
              @drag-end="dragEnd"
              @reload="requestTableData"

            >
              <template slot="cell-slot" slot-scope="scope">

                <!--如果插槽内容复杂 - 建议封装子组件，局部引入。-->
                <!--简单情况下，直接写在插槽内部-->
                <!--scope - 对外暴露的参数-->

                <span class="drag-btn"
                      :style="{
               'color': createRgb(),
                'font-weight':600
                }">
                  {{`${scope.row.customSlot}的插槽` }}
                </span>

              </template>


            </biz-table-v4>
          </div>

        </template>
      </demo-block>


    </div>
  </div>
</template>


<script>
  import { tableDataService } from '../../../../service/Table/index';
  import bizTableV4 from '../../../../components/Biz-table/Biz-table-v4/Biz-table-v4';
  import cellSlotComponent from './cell-slot-component';

  export default {
    name: 'cell-slot',
    components: { bizTableV4, cellSlotComponent },
    data() {
      return {
        loading: false,//表格loading 状态
        tableData: {},//表格数据
        gridBtns: [],
        //筛选器数据
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
          mockColType: 'form-table',
          mockType: 'form-table',
          total: 100,
        },

      };
    },
    computed: {
      tableRef() {
        return this.$refs['formTable'];
      },
      total() {
        return this.tableData.total;
      },
    },
    methods: {
      /**
       * 单元格被激活编辑时会触发该事件
       */
      requestTableData() {
        this.loading = true;
        tableDataService({ query: this.searchConditions, funcId: 'funcId' }).then(res => {
          this.tableData = res.resultData || {};

          console.log('请求到的表格数据：');
          console.log(this.tableData);
          console.log(this.tableData.list.map(i => i.customSlot).join(','));

          this.dataHandle(this.gridBtns);

          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      },

      /**
       * 重置筛选条件
       */
      resetFilter(){
        this.$refs.formTable.clearFilter()
      },


      /**
       * 行拖拽结束
       */
      dragEnd({ data, newIndex, oldIndex}){
        console.log(data, newIndex, oldIndex);
      },
      /**
       * 设置筛选条件
       */
      setFilter(){
        const xTable = this.$refs.formTable
        const column = xTable.getColumnByField('ownerName')
        // 修改第一个选项为勾选状态
        const option = column.filters[0]
        option.data = '田洋'
        option.checked = true
        // 修改条件之后，需要手动调用 updateData 处理表格数据
        xTable.updateData()
      },

      /**
       * 单选列，多选列 （当选择项发生变化时会触发该事件）
       * @param { row, $rowIndex, column, $columnIndex, checked, selection }
       * 注意：单选列的情况下，参数：checked, selection 不存在
       * @param event
       */
      selectChange({ row, $rowIndex, column, $columnIndex, checked, selection }, event) {

        console.log('当选择项发生变化时会触发该事件');

        console.log({ row, $rowIndex, column, $columnIndex, checked, selection }, event);
      },

      /**
       * 表格加载处理
       * 可在其中做一些业务操作，如：
       *  1、增加权限按钮
       *  2、过滤数据
       *  3、其他异步请求
       * @param gridBtns  - 参数，表格的权限按钮列表数据
       */
      dataHandle(gridBtns = []) {
        //当表数据和表格权限按钮数据同时获取到位后，才进行后续操作
        if (gridBtns.length === 0) return;
        if (!this.tableData.list) return;

        //为表格增加权限按钮
        this.tableData.list.forEach(item => {
          this.$set(item, 'fnsclick', gridBtns);
        });
      },


      /**
       * table action in column - 操作列按钮点击事件
       * @param info - 按钮信息
       * @param row - 行信息
       * @param rowIndex - 行索引
       * @param column - 列信息
       * @param columnIndex - 列索引
       */
      tableAction(info, { row, rowIndex, column, columnIndex }) {
        console.log('操作列按钮点击事件');
        console.log(info);
        console.log({ row, rowIndex, column, columnIndex });
        this.$message({
          type: 'info',
          message: `当前点击按钮信息：1、名称：${info.label}. 2、字段：${info.value}.`,
        });
      },




      createRgb() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      },

    },

    created() {

      this.requestTableData();

      setTimeout(() => {

        this.gridBtns = [
          { label: '新增授权人', value: 'addshouquanren' },
          { label: '编辑', value: 'gridEditBtn' },
          { label: '删除', value: 'gridRemoveBtn' },
        ];

        this.dataHandle(this.gridBtns);

      }, 2000);
    },


  };
</script>


<style rel="stylesheet/scss" lang="scss">
  .win.formTable-cell-slot {
    .demo-block {
      h1 {
        margin: 10px 0 5px;
      }
      .demo-block-content {
        padding: 5px;
      }
    }
    .table-template-block {
      margin: 10px 0;
    }
  }
</style>
