<!--新表格-表单 示例-->
<template>
  <div class="win formTable-template">
    <div class="ns-container">
      <demo-block>
        <template slot="title">表单表格-用法示例</template>
        <template slot="describe">
          复杂表格示例-当前页数总条目: <span style="color: #ff275c">{{searchConditions.pageSize}} </span>
        </template>
        <template slot="content">
          <div class="control-block form-block-line">
            <span>当前页数总条目:</span>
            <ns-input v-model.number="searchConditions.pageSize"></ns-input>
            <ns-button @click="requestTableData">刷新表格数据</ns-button>
            <ns-select v-model="firstColType" :options="firstColTypeOpts" @change="()=> tableKey= new Date().valueOf() "></ns-select>
            <ns-button @click="scrollTo(200,200)">表格滚动至(200,200)</ns-button>
            <ns-button @click="scrollTo(0,0)">表格滚动复位</ns-button>

          </div>
          <div class="control-block form-block-line">
            <ns-button @click="fullValidate">表单表格验证</ns-button>
            <ns-button @click="setActiveRow(2)">设置第二行激活</ns-button>
            <ns-button @click="clearActived">取消激活状态</ns-button>
            <ns-button @click="setSelection('checkbox',[2,3,4],true)">设置第二，三，四行选中</ns-button>
            <ns-button @click="setSelection('checkbox',[2,3,4],false)">清除第二，三，四行选中</ns-button>
            <ns-button @click="setAllSelection(true)">设置全部选中</ns-button>
            <ns-button @click="clearSelection('checkbox')">清除所有选中状态</ns-button>
          </div>
          <biz-table-v4
            :key="tableKey"
            ref="formTable"
            :loading="loading"
            :data="tableData.list"
            :total="total"

            :autoResize="false"
            customHeight="500px"
            :showPagination="false"

            :localHead="localHead"
            :searchConditions="searchConditions"

            :firstColType="firstColType"

            show-footer
            :footer-method="footerMethod"
            :checkMethod="checkMethod"

            @edit-actived="editActived"
            @cell-event="cellEvent"
            @table-action="tableAction"
            @reload="requestTableData"
            @summary-change="summaryChange"
            @select-change="selectChange"
            @select-all="selectAll"
          >
            <template #cell-slot="{column, row, rowIndex}">
              <span>1231</span>
              <ns-input></ns-input>
            </template>
          </biz-table-v4>

<!--          <biz-table-v4-->
<!--            ref="formTable"-->
<!--            :loading="loading"-->
<!--            :data="tableData.list"-->
<!--            :total="total"-->

<!--            :autoResize="false"-->
<!--            :customHeight="200"-->

<!--            :localHead="localHead"-->
<!--            :searchConditions="searchConditions"-->

<!--            :firstColType="firstColType"-->

<!--            show-footer-->
<!--            :footer-method="footerMethod"-->
<!--            :checkMethod="checkMethod"-->

<!--            @edit-actived="editActived"-->
<!--            @cell-event="cellEvent"-->
<!--            @table-action="tableAction"-->
<!--            @reload="requestTableData"-->
<!--            @summary-change="summaryChange"-->
<!--            @select-change="selectChange"-->
<!--            @select-all="selectAll"-->

<!--          ></biz-table-v4>-->
        </template>
      </demo-block>


    </div>
  </div>
</template>


<script>
  import {tableDataService} from '../../../../service/Table/index';
  import bizTableV4 from '../../../../components/Biz-table/Biz-table-v4/Biz-table-v4';
  import {listColumnService} from '../../../../service/Table';


  export default {
    name: 'formTable-template',
    components: {bizTableV4},
    data() {
      return {
        loading: false,//表格loading 状态
        tableData: {},//表格数据
        gridBtns: [],
        summaryState: 'current',//合计行切换状态

        localHead: null,
        tableKey: '',

        //筛选器数据
        searchConditions: {
          companyId: '', //公司id
          departmentId: '', //部门id
          filterList: [], //条件
          pageNum: 1, //当前页数
          pageSize: 1, //每页显示条目个数
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


        isCheckedOptions: [],//是否审核的options，激活单元格动态生成

        firstColType: 'checkbox',//checkbox index radio
        firstColTypeOpts: [
          {label: '索引', value: 'index'},
          {label: '多选', value: 'checkbox'},
          {label: '单选', value: 'radio'},
        ],

      };
    },
    watch: {
      'tableData.list': {
        handler: function (val) {
          console.log('tableData.list');
          console.log('tableData.list');
          console.log(val[0].isChecked.picked.value);
          console.log('tableData.list');
          console.log('tableData.list');
        },
        deep: true,
      },
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
        tableDataService({query: this.searchConditions, funcId: 'funcId'}).then(res => {
          this.tableData = res.resultData || {};

          console.log('请求到的表格数据：');
          console.log(this.tableData);

          this.dataHandle(this.gridBtns);

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
          listColumnService({funcId: 'funcId', mockType: mockType}).then(res => {
            this.localHead = res.resultData.columns || [];
          });
        }
        else if (mockType === 'hugeData-table') {
          listColumnService({funcId: 'funcId', mockType: mockType}).then(res => {
            this.localHead = res.resultData.columns || [];
          });
        }
      },


      /**
       * 单元格被激活编辑时会触发该事件
       * @param row
       * @param $rowIndex
       * @param column
       * @param $columnIndex
       * @param cell
       */
      editActived({row, $rowIndex, column, $columnIndex, cell}) {
        console.log('单元格被激活编辑时会触发该事件');
        console.log({row, $rowIndex, column, $columnIndex, cell});

        /**
         * === 示例：激活单元格，为其下拉表单控件新增 options 数据 ===
         */

        //当前激活单元格 判断字段为 'isChecked' 的情况下，我们为其下拉控件新增options
        if (column.property === 'isChecked') {

          /**
           * 如果已经有option数据，则我们不重复添加
           * 若当前单元格下拉内容需根据当前行数据变化（相同字段不同单元下拉options数据不同)，则需要每次都去请求
           */
          if (!this.isCheckedOptions || !this.isCheckedOptions.length) {
            //模拟数据，这里可以发起服务端请求获取数据
            this.isCheckedOptions = [{label: '已审核', value: 1}, {label: '未审核', value: 0}];
          }


          //是否为字典项数据
          const isDictionary = column.editRender.props.column.isDictionary;

          /**
           *
           * 获取到表头相应的渲染的options字段位置,将options数据赋予表数据中对应字段
           * 注意：如实非常明确该字段是否为字典项，则可直接进行复制，无需判断
           *
           * 1、字典项（内部数据源):
           *      options 取值=> editor-config => options
           * 2、非字典项 （外部数据源):
           *      options 取值=> row => 对应key => options
           */
          if (isDictionary) {
            column.editRender.props.formConfig.options = this.isCheckedOptions;
          }
          else {
            row[column.property].options = this.isCheckedOptions;
          }
        }
      },

      /**
       * 单元格事件 - 点击/修改
       * @param { row, rowIndex, column, columnIndex, rows, columns }
       *  注释：1、row - 行数据 , 2、rowIndex - 行索引, 3、column - 列数据, 4、columnIndex - 列索引 , 5、rows - 全部表格数据 , 6、columns - 全部列数据
       * @param event
       */
      cellEvent({row, rowIndex, column, columnIndex, rows, columns}, event) {
        console.log('单元格事件 - 点击/修改');
        console.log({row, rowIndex, column, columnIndex, rows, columns});
        console.log(event);
        console.log(column);

        //当前单元格事件触发在是否审核字段单元格上时
        if (column.field === 'isChecked') {

          //是否为字典项数据
          const isDictionary = column.isDictionary;

          const isChecked = row.isChecked.picked.value;

          //当是否审核字段值为已审核（1)时候，请求获取审核类型下拉opeions数据
          if (isChecked === 1) {

            //以下操作模拟数据，这里可以发起服务端请求获取数据
            row.checkedType.picked.value = 1;

            //循环全部表头数据,找到对应字段下，赋值给表头 cell-Config 下 options 值
            columns.forEach(col => {
              if (col.field === 'checkedType') {
                row.checkedType.options = [
                  {label: '市级审核', value: 1},
                  {label: '省级审核', value: 2},
                  {label: '国家级审核', value: 3},
                ];
              }
            });

          }
          //当是否审核字段值为未审核（0)时候
          else {
            //以下操作模拟数据，这里可以发起服务端请求获取数据
            row.checkedType.picked.value = null;
            //循环全部表头数据,找到对应字段下，赋值给表头 cell-Config 下 options 值
            columns.forEach(col => {
              if (col.field === 'checkedType') {
                row.checkedType.options = [];
              }
            });
          }
        }
        //以下两个示例是 link 类型 的点击事件
        else if (column.field === 'taskName') {
          this.$message.success(`我是：${column.title},字段名：${column.field},点击链接触发`);
        }
        else if (column.field === 'level') {
          this.$message.success(`我是：${column.title},字段名：${column.field},点击链接触发`);
        }

      },

      /**
       * 表格表单验证
       */
      fullValidate() {
        this.tableRef.fullValidate((valid, errMap) => {
          console.log('表格表单验证中，验证结果如下：');
          console.log(valid);
          console.log(errMap);
          if (valid) {
            this.$message({type: 'success', message: '校验成功！'});
          }
          else {
            let html = '';
            Object.values(errMap).forEach(errList => {
              errList.forEach(params => {
                let {rowIndex, column, rules} = params;
                rules.forEach(rule => {
                  html += `<div style="line-height: 20px">第${rowIndex}行,${column.title}：${rule.message}</div>`;
                });
              });
            });


            this.$message({
              type: 'error',
              dangerouslyUseHTMLString: true,
              message: `<div>${html}</div>`,
            });
          }
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
      tableAction(info, {row, rowIndex, column, columnIndex}) {
        console.log('操作列按钮点击事件');
        console.log(info);
        console.log({row, rowIndex, column, columnIndex});
        this.$message({
          type: 'info',
          message: `当前点击按钮信息：1、名称：${info.label}. 2、字段：${info.value}.`,
        });
      },

      /**
       * summary change - 合计行切换
       * @param param
       */
      summaryChange(param) {
        console.log('合计行切换');
        console.log(param);
        this.summaryState = param;
        //触发表尾合计实时计算,切换的时候一定要写，不然无法更新表尾数据
        this.tableRef.updateFooter();
      },

      /**
       * 表尾合计的计算方法
       * @param columns  - 列数据
       * @param data     - 表数据
       * @returns {*[]}
       */
      footerMethod({columns, data}) {
        // console.log('表尾合计的计算方法');
        // console.log(columns);
        // console.log(data);
        return [
          columns.map((column, columnIndex) => {
            const modelKey = column.property;
            //全部合计时候
            if (this.summaryState === 'total') {
              return '全部合计的数据';
            }
            //分页合计时候
            else if (this.summaryState === 'current') {
              //在特定字段内开始操作
              if (['age'].indexOf(modelKey) > -1) {

                //累加
                let val = 0;
                data.forEach(item => {
                  val += item[modelKey];
                });

                //可以进行保留小数等数据处理
                return val.toFixed(2);
              }
            }
            return null;
          }),
        ];
      },


      /**
       * 控制 CheckBox 是否允许勾选的方法，
       * @param {row}
       */
      checkMethod({row}) {
        //年龄字段 小于30的禁用
        return row.age > 30;
      },

      /**
       * 单选列，多选列 （当选择项发生变化时会触发该事件）
       * @param { row, $rowIndex, column, $columnIndex, checked, selection }
       * 注意：单选列的情况下，参数：checked, selection 不存在
       * @param event
       */
      selectChange({row, $rowIndex, column, $columnIndex, checked, selection}, event) {

        console.log(`当前列操作类型：${this.firstColType}`);
        console.log('当选择项发生变化时会触发该事件');

        console.log({row, $rowIndex, column, $columnIndex, checked, selection}, event);
      },

      /**
       * 当用户手动勾选全选 Checkbox 时触发的事件
       * @param { selection, checked }
       * @param event
       */
      selectAll({selection, checked}, event) {
        console.log('当用户手动勾选全选 Checkbox 时触发的事件');
        console.log({selection, checked}, event);
      },


      setActiveRow(index) {
        console.log('设置激活行');
        this.tableRef.setActiveRow(this.tableData.list[index]);
      },
      clearActived() {
        console.log('清除选中行');
        this.tableRef.clearActived();
      },


      /**
       * set selection state - 设置行的选中状态
       * @param type - 类型，单选还是多选
       * @param indexList  - 选中的索引列表
       * @param checked - 选中与否（布尔)
       */
      setSelection(type, indexList, checked) {
        const targets = indexList.map(i => this.tableData.list[i]);
        this.tableRef.setSelection('checkbox', targets, checked);
      },

      /**
       * set all selection state - 设置所有行的选中状态
       * @param checked - 选中与否（布尔)
       */
      setAllSelection(checked) {
        this.tableRef.setAllSelection(checked);
      },

      /**
       * clear all selection state - 清空选中状态
       */
      clearSelection() {
        this.tableRef.clearSelection();
      },


      /**
       * table scroll to - 表格滚动至对应位置
       * @param x  -  x轴坐标
       * @param y  -  y坐标
       */
      scrollTo(x, y) {
        this.tableRef.scrollTo(x, y);
      },

    },

    created() {

      this.requestTableData();

      setTimeout(() => {

        this.gridBtns = [
          {label: '新增授权人', value: 'addshouquanren'},
          {label: '编辑', value: 'gridEditBtn'},
          {label: '删除', value: 'gridRemoveBtn'},
        ];

        this.dataHandle(this.gridBtns);

      }, 2000);
    },


  };
</script>


<style rel="stylesheet/scss" lang="scss">
  .win.formTable-template {
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
