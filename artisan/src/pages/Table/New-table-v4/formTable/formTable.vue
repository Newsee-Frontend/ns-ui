<!--新表格-表单 示例-->
<template>
  <div class="win">
    <div class="ns-container">
      <demo-block>
        <template slot="title">复杂表格用法示例</template>
        <template slot="describe">
          复杂表格示例-当前页数总条目: <span style="color: #ff275c">{{searchConditions.pageSize}} </span>
        </template>
        <template slot="content">
          <div class="control-block form-block-line">
            <ns-button @click="scrollTo(200,200)">表格滚动至</ns-button>
            <ns-button @click="scrollTo(0,0)">表格滚动复位</ns-button>
            <ns-button @click="fullValidate">表单表格验证</ns-button>
            <ns-select v-model="firstColType" :options="firstColTypeOpts"></ns-select>
            <span>{{tableData[0].createDate}}</span>
            <span>{{tableData[0].level}}</span>
            <span>{{tableData[0].sex.picked.value}}</span>
            <span>{{tableData[0].isChecked.picked.value}}</span>
          </div>
          <div class="control-block form-block-line">
            <ns-button @click="setActiveRow(2)">设置第二行激活</ns-button>
            <ns-button @click="clearActived">取消激活状态</ns-button>
            <ns-button @click="setSelection([2,3,4],true)">设置第二，三，四行选中</ns-button>
            <ns-button @click="setAllSelection(true)">设置全部选中</ns-button>
            <ns-button @click="clearSelection">清除所有选中状态</ns-button>
          </div>
          <biz-table-v4
            ref="formTable"
            :loading="loading"
            :data="tableData"
            :total="total"
            :localHead="tableHead"
            :searchConditions="searchConditions"

            :firstColType="firstColType"

            show-footer
            :footer-method="footerMethod"
            :checkMethod="checkMethod"

            @edit-actived="editActived"
            @cell-event="cellEvent"
            @table-action="tableAction"
            @reload="getTableData"
            @summary-change="summaryChange"
            @select-change="selectChange"
            @select-all="selectAll"

          ></biz-table-v4>
        </template>
      </demo-block>


    </div>
  </div>
</template>


<script>
  import bizTableV4 from '../../../../components/Biz-table/Biz-table-v4/Biz-table-v4';
  import getData from './getTableData';
  import tableHead from './head';

  export default {
    name: 'new-formTable',
    components: { bizTableV4 },
    data() {
      return {
        data: {},
        summaryState: 'current',//合计行切换状态
        loading: false,
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


        isCheckedOptions: [],//是否审核的options，激活单元格动态生成

        firstColType: 'selection',//selection index radio
        firstColTypeOpts: [
          { label: '索引', value: 'index' },
          { label: '多选', value: 'selection' },
          { label: '单选', value: 'radio' },
        ],

      };
    },
    computed: {
      tableRef() {
        return this.$refs['formTable'];
      },
      tableData() {
        return this.data.list;
      },
      total() {
        return this.data.total;
      },
    },
    methods: {

      nextPage() {
        if (this.$route.name === 'gridDemo1') return;
        this.$router.push('gridDemo1');
      },

      getTableData() {
        this.loading = true;
        this.data = getData.mockData(1000, this.searchConditions.pageSize);

        // this.tableData = mockTableFromData(100, this.searchConditions.pageSize);
        this.loading = false;
      },

      /**
       * 单元格被激活编辑时会触发该事件
       * @param row
       * @param $rowIndex
       * @param column
       * @param $columnIndex
       * @param cell
       */
      editActived({ row, $rowIndex, column, $columnIndex, cell }) {
        console.log('单元格被激活编辑时会触发该事件');
        console.log({ row, $rowIndex, column, $columnIndex, cell });

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
            this.isCheckedOptions = [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }];
          }

          //将options数据赋予表数据中对应字段
          row['isChecked'].options = this.isCheckedOptions;
        }

      },

      /**
       * 单元格事件 - 点击/修改
       * @param row
       * @param rowIndex
       * @param column
       * @param columnIndex
       * @param event
       */
      cellEvent({ row, rowIndex, column, columnIndex }, event) {
        console.log('单元格事件 - 点击/修改');
        console.log({ row, rowIndex, column, columnIndex });
        console.log(event);

        //当前单元格事件触发在是否审核字段单元格上时
        if (column.resourcecolumnCode === 'isChecked') {
          const isChecked = row.isChecked.picked.value;
          console.log(isChecked);

          //当是否审核字段值为已审核（1)时候，请求获取审核类型下拉opeions数据
          if (isChecked === 1) {
            //模拟数据，这里可以发起服务端请求获取数据
            row.checkedType.picked.value = 1;
            row.checkedType.options = [
              { label: '市级审核', value: 1 },
              { label: '省级审核', value: 2 },
              { label: '国家级审核', value: 3 },
            ];
          }
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
            this.$message({ type: 'success', message: '校验成功！' });
          }
          else {
            let html = '';
            Object.values(errMap).forEach(errList => {
              errList.forEach(params => {
                let { rowIndex, column, rules } = params;
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
      tableAction(info, { row, rowIndex, column, columnIndex }) {
        console.log('操作列按钮点击事件');
        console.log(info);
        console.log({ row, rowIndex, column, columnIndex });
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
      footerMethod({ columns, data }) {
        console.log('表尾合计的计算方法');
        console.log(columns);
        console.log(data);
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
              if (['age', 'level'].indexOf(modelKey) > -1) {

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
       * @param {row,$rowIndex,column,$columnIndex}
       */
      checkMethod({ row, $rowIndex, column, $columnIndex }) {
        //第一行 checkbox 禁用
        if ($rowIndex === 0) {
          return false;
        }
        //年龄字段 小于30的禁用
        return row.age > 30;
      },

      /**
       * 当选择项发生变化时会触发该事件
       * @param {checked, row, $rowIndex, column, $columnIndex}
       * @param event
       */
      selectChange({ checked, row, $rowIndex, column, $columnIndex }, event) {
        console.log('当选择项发生变化时会触发该事件');
        console.log({ checked, row, $rowIndex, column, $columnIndex }, event);
      },

      /**
       * 当用户手动勾选全选 Checkbox 时触发的事件
       * @param { selection, checked }
       * @param event
       */
      selectAll({ selection, checked }, event) {
        console.log('当用户手动勾选全选 Checkbox 时触发的事件');
        console.log({ selection, checked }, event);
      },


      setActiveRow(index) {
        console.log('设置激活行');
        this.tableRef.setActiveRow(this.tableData[index]);
      },
      clearActived() {
        console.log('清除选中行');
        this.tableRef.clearActived();
      },


      /**
       * set selection state - 设置行的选中状态
       * @param rows  - 选中的对象列表（数组)
       * @param checked - 选中与否（布尔)
       */
      setSelection(rows, checked) {
        const targets = rows.map(i => this.tableData[i]);
        console.log(2222222);
        console.log(targets);
        this.tableRef.setSelection(targets, checked);
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
      this.getTableData();
    },


  };
</script>
