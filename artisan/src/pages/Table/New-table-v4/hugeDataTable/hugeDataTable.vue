<!--新表格-大数据量 示例-->
<template>
  <div class="win">
    <!-- 容器左边 -->
    <div class="ns-container">

      <demo-block>
        <template slot="title">复杂表格用法示例</template>
        <template slot="describe">
          超大数据量表格示例，当前页数总条目: <span style="color: #ff275c">{{searchConditions.pageSize}} </span>
        </template>
        <template slot="content">
          <div class="control-block form-block-line">
            <ns-button @click="getTableData('loadData')">loadData</ns-button>
            <ns-button @click="getTableData('reloadData')">reloadData</ns-button>

          </div>
          <biz-table-v4
            ref="hugeDataTable"
            :loading="loading"
            :total="total"
            isHugeData
            :localHead="tableHead"
            :searchConditions="searchConditions"
            @reload="getTableData()"

          ></biz-table-v4>
        </template>
      </demo-block>

    </div>
  </div>
</template>


<script>
  import bizTableV4 from '../../../../components/Biz-table/Biz-table-v4/Biz-table-v4';
  import getData from './getTableData';
  // import tableHead from './simple-column';
  import tableHead from './xxxxxxxxxx';

  export default {
    name: 'new-hugeDataTable',
    components: { bizTableV4 },
    data() {
      return {
        loading: false,
        data: {},
        tableHead,

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
      };
    },
    computed: {
      tableData() {
        return this.data.list;
      },
      total() {
        return this.data.total;
      },
    },
    methods: {
      getTableData(type = 'reloadData') {
        this.loading = true;

        this.data = getData(10000, this.searchConditions.pageSize);

        let hugeDataTable = this.$refs['hugeDataTable'];

        if (hugeDataTable) {
          if (type === 'reloadData') {

            hugeDataTable.reloadData(this.tableData).then(() => {
              this.loading = false;
            });
          }
          else {

            hugeDataTable.loadData(this.tableData).then(() => {
              this.loading = false;
            });
          }

        }
        else {
          this.loading = false;
        }
      },
    },

    created() {

    },
    mounted() {
      this.getTableData('reloadData');
    },

  };
</script>
