<!--新表格-表单-外部改变表头 示例-->
<template>
  <div class="win formTable-changeCol">
    <div class="ns-container">
      <demo-block>
        <template slot="title">表单表格-外部改变表头</template>
        <template slot="describe">
          复杂表格示例-当前页数总条目: <span style="color: #ff275c">{{searchConditions.pageSize}} </span>
        </template>
        <template slot="content">
          <div class="control-block form-block-line">
            <span>当前页数总条目:</span>
            <ns-input v-model.number="searchConditions.pageSize"></ns-input>
            <ns-button @click="tableLoader('form-table')">刷新表格数据</ns-button>
            <ns-button @click="tableLoader('hugeData-table',true)">更换表头数据</ns-button>
            <ns-button @click="tableLoader('form-table',true)">复原表头数据</ns-button>
          </div>
          <biz-table-v4
            ref="formTable"
            :loading="loading"
            :data="tableData.list"
            :total="total"

            :autoResize="false"
            :customHeight="600"

            :localHead="localHead"
            :searchConditions="searchConditions"

            @reload="tableLoader('form-table')"

          ></biz-table-v4>
        </template>
      </demo-block>


    </div>
  </div>
</template>


<script>
  import { tableDataService } from '../../../../service/Table/index';
  import bizTableV4 from '../../../../components/Biz-table/Biz-table-v4/Biz-table-v4';
  import { listColumnService } from '../../../../service/Table';


  export default {
    name: 'formTable-changeCol',
    components: { bizTableV4 },
    data() {
      return {
        loading: false,//表格loading 状态
        tableData: {},//表格数据
        gridBtns: [],
        localHead: null,
        //筛选器数据
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
          mockColType: 'form-table',
          mockType: 'form-table',
          total: 10000,
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
       * @param type - 如果需要自定义表头数据的情况下 - 表头的类型，关系到当前表格的展示类型
       * @param isNeedHead - 是否需要请求表头数据
       *        在本示例中：
       *          初始状态获取，表头使用业务封装中的表头请求数据
       *          后续手动改变表头数据，则额外再次请求获取改变
       */
      tableLoader(type, isNeedHead = false) {
        this.searchConditions.mockType = type;
        this.loading = true;

        const promiseList = [this.requestTableData()];
        if (isNeedHead) {
          promiseList.push(this.requestTableHeadData());
        }
        Promise.all(promiseList).then(() => {
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      },

      /**
       * 获取表格数据
       */
      requestTableData() {
        tableDataService({ query: this.searchConditions, funcId: 'funcId' }).then(res => {
          this.tableData = res.resultData || {};

          console.log('请求到的表格数据：');
          console.log(this.tableData);

          this.dataHandle(this.gridBtns);

        }).catch(() => {

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
       * 请求表头数据 - 赋予自定义本地表头数据 localHead 传入
       */
      requestTableHeadData() {
        const mockType = this.searchConditions.mockType;
        if (mockType === 'form-table') {
          listColumnService({ funcId: 'funcId', mockType: mockType }).then(res => {
            this.localHead = res.resultData.columns || [];
          });
        }
        else if (mockType === 'hugeData-table') {
          listColumnService({ funcId: 'funcId', mockType: mockType }).then(res => {
            this.localHead = res.resultData.columns || [];
          });
        }
      },

    },

    created() {

      this.tableLoader('form-table');

      setTimeout(() => {

        this.gridBtns = [
          { label: '新增授权人', value: 'addshouquanren' },
          { label: '编辑', value: 'gridEditBtn' },
          { label: '删除', value: 'gridRemoveBtn' },
        ];

        this.dataHandle(this.gridBtns);

      }, 1000);
    },


  };
</script>


<style rel="stylesheet/scss" lang="scss">
  .win.formTable-changeCol {
    .demo-block {
      h1 {
        margin: 10px 0 5px;
      }
      .demo-block-content {
        padding: 5px;
      }
    }
  }
</style>
