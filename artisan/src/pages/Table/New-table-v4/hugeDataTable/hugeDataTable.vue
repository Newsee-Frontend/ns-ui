<!--新表格-大数据量 示例-->
<template>
  <div class="win">
    <!-- 容器左边 -->
    <div class="ns-container">
      <!--右边主题内容区域-->
      <div class="ns-container-right">
        <!--action-module (search / button)-->
        <div class="action-module handle">

          <h1>大数据量表格用法示例</h1>
          <h3> 超大数据量表格示例，当前页数总条目: <span style="color: #ff275c">{{searchConditions.pageSize}} </span></h3>

          <div class="control-block form-block-line">

            <ns-button @click="getTableData">刷新表格数据</ns-button>
            <ns-button @click="getTableData('no-result')">模拟空数据</ns-button>
            <ns-button @click="searchConditions.mockColType='service-error'">模拟服务异常</ns-button>
            <ns-button @click="loading = true">模拟loading状态</ns-button>
            <ns-button @click="setSelection('radio',1,true)">设置第二行选中</ns-button>
            <ns-button @click="setSelection('radio',1,false)">清除第二行选中</ns-button>
            <ns-button @click="clearSelection('radio')">清除所有选中状态</ns-button>
          </div>
        </div>

        <biz-table-v4
          ref="hugeDataTable"
          :loading="loading"
          :data="tableData.list"
          :total="total"
          isHugeData
          firstColType="checkbox"
          :searchConditions="searchConditions"
          @select-change="selectChange"
          @reload="getTableData()"
        ></biz-table-v4>
      </div>
    </div>
  </div>
</template>


<script>
  import bizTableV4 from '../../../../components/Biz-table/Biz-table-v4/Biz-table-v4';
  import { tableDataService } from '../../../../service/Table/index';

  export default {
    name: 'new-hugeDataTable',
    components: { bizTableV4 },
    data() {
      return {
        loading: false,
        tableData: {},
        gridBtns: [],
        searchConditions: {
          companyId: '', //公司id
          departmentId: '', //部门id
          filterList: [], //条件
          pageNum: 1, //当前页数
          pageSize: 100, //每页显示条目个数
          orderBy: '', //排序：升序还是降序
          orderFieldName: '', //排序：字段名
          mainSearch: '', //输入框值
          filterConditions: [], //筛选器记录的条件
          //add by xiaosisi on 20170320 用来存储其他检索条件
          otherConditions: {},
          organizationId: 1,
          totalType: 1,
          mockColType: 'hugeData-table',
          mockType: 'hugeData-table',
          total: 10000,
        },
      };
    },
    computed: {
      total() {
        return this.tableData.total;
      },
      tableRef() {
        return this.$refs['hugeDataTable'];
      },
    },
    methods: {
      getTableData(type = 'hugeData-table') {

        this.searchConditions.mockColType = 'hugeData-table';
        this.searchConditions.mockType = type;

        this.loading = true;

        tableDataService({ query: this.searchConditions, funcId: 'funcId' }).then(res => {
          this.tableData = res.resultData || {};

          console.log('请求到的表格数据：');
          console.log(this.tableData);

          this.tableLoader(this.gridBtns);

          this.loading = false;

        }).catch(() => {
          this.loading = false;
        });
      },
      /**
       * 表格加载处理
       * 可在其中做一些业务操作，如：
       *  1、增加权限按钮
       *  2、过滤数据
       *  3、其他异步请求
       * @param gridBtns  - 参数，表格的权限按钮列表数据
       */
      tableLoader(gridBtns = []) {
        //当表数据和表格权限按钮数据同时获取到位后，才进行后续操作
        if (gridBtns.length === 0) return;
        if (!this.tableData.list) return;

        //为表格增加权限按钮
        this.tableData.list.forEach((item, index) => {
          if (index === 1) {
            this.$set(item, 'fnsclick', [
              { label: '新增授权人', value: 'addshouquanren' },
              { label: '编辑', value: 'gridEditBtn' },
            ]);
          }
          else {
            this.$set(item, 'fnsclick', gridBtns);
          }

        });
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
       * set selection state - 设置行的选中状态
       * @param type - 类型，单选还是多选
       * @param index  - 选中的索引
       * @param checked - 选中与否（布尔)
       */
      setSelection(type, index, checked) {
        this.tableRef.setSelection('radio', this.tableData.list[index], checked);
      },

      /**
       * clear all selection state - 清空选中状态
       * @param type
       */
      clearSelection(type) {
        this.tableRef.clearSelection(type);
      },

    },

    created() {
      setTimeout(() => {
        this.gridBtns = [
          { label: '新增授权人', value: 'addshouquanren' },
          { label: '编辑', value: 'gridEditBtn' },
          { label: '删除', value: 'gridRemoveBtn' },
        ];

        this.tableLoader(this.gridBtns);

      }, 2000);

    },
    mounted() {
      this.getTableData();
    },

  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .form-block-line {
    height: 32px;
    line-height: 32px;
    margin: 5px 0;
  }
</style>


