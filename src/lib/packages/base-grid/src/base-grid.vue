<!--base grid component-->
<template>
  <div class="cx-grid" ref="gridID" :id="gridID" v-loading="!isLoading" element-loading-text="拼命加载中">
    <!--grid container-->
    <template>
      <div class="grid-container" v-if="isRender">
        <!-- el table encapsulation -->
        <el-table :class="{'top-gap':firstRowHasError.value}" :data="actualGridData.list" :border="border"
                  :max-height="sizeInfo.maxHeight" :height="sizeInfo.maxHeight"
                  :show-summary="showSummaryFinal" :summary-method="getSummaries"
                  @selection-change="selectionChange" @sort-change="sortChange">
          <!-- show index / selection -column -->
          <el-table-column v-if="firstColRender" :type="firstColInfo[headRefer['col-type']]"
                           :label="firstColInfo[headRefer['label']]"
                           :width="firstColInfo[headRefer['width']]" align="center" :fixed="true"
                           :class-name="'grid-head-'+firstColInfo[headRefer['model-code']]"
                           :key="'grid-head-'+firstColInfo[headRefer['model-code']]">
          </el-table-column>
          <!-- show radio -column -->
          <el-table-column v-if="firstColInfo[headRefer['col-type']] === 'radio'"
                           :label="firstColInfo[headRefer['label']]"
                           :width="firstColInfo[headRefer['width']]" align="center" :fixed="true"
                           :class-name="'grid-head-'+firstColInfo[headRefer['model-code']]">
            <template slot-scope="scope">
              <el-radio v-model="radioModel" :label="scope.$index" @change.native="selectionChange(scope.row,scope.$index)">{{null}}</el-radio>
            </template>
          </el-table-column>
          <!-- normal-column -->
          <el-table-column v-if="!item[headRefer['hidden']]" :class-name="'grid-head-'+item[headRefer['model-code']]"
                           v-for="(item,index) in gridHead" :index="index" :key="index"
                           :min-width="item[headRefer['width']]" :align="align" :label="item[headRefer['label']]"
                           :resizable="resizable" sortable="custom" :show-overflow-tooltip="true"
                           :fixed="errorType === 'noError' && item[headRefer['fixed']]">
            <!--table cell content-->
            <template slot-scope="scope">
              <!--form components in table-->
              <slot-scope :gridID="gridID" :keyRefer="keyRefer" :scope="scope" :item="item"
                          :rowIndex="scope.$index" :colIndex="index"
                          :firstRowHasError="firstRowHasError" :gridCheck="gridCheck" :topGapForErrMsg="topGapForErrMsg"
                          :wrapperHeight="wrapperHeight"
                          @cell-action="cellAction" @set-formCell-check="setFormCellCheck"></slot-scope>
            </template>
          </el-table-column>

          <!-- handle-column -->
          <el-table-column v-if="actionRender" :label="ationColInfo[headRefer['label']]"
                           :width="ationColInfo[headRefer['width']]"
                           fixed="right" :align="ationColInfo[headRefer['align']]"
                           :class-name="'grid-head-'+ationColInfo[headRefer['model-code']]"
                           :key="'grid-head-'+ationColInfo[headRefer['model-code']]"
          >
            <template slot-scope="scope">
              <template v-if="ationColInfo[headRefer['col-type']] === 'handle'">
                <action-scope :scope="scope" :keyRefer="keyRefer" @grid-ation="gridAtion"></action-scope>
              </template>
            </template>
          </el-table-column>
          <!-- add row data modules column -->
          <el-table-column v-if="addRowColRender"
                           :class-name="'grid-head-'+ addRowColInfo[headRefer['model-code']]"
                           :key="'grid-head-'+ addRowColInfo[headRefer['model-code']]"
                           :width="addRowColInfo[headRefer['width']]" fixed="right"
                           align="center" :render-header="addRow_render"
          >
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteCurrentRow(scope.$index, scope.row)"></i>
            </template>
          </el-table-column>
          <!-- head operation setting modules column -->
          <el-table-column v-if="headOperationColRender"
                           :class-name="'grid-head-'+ headOperationColInfo[headRefer['model-code']]"
                           :key="'grid-head-'+ headOperationColInfo[headRefer['model-code']]"
                           :width="headOperationColInfo[headRefer['width']]" fixed="right"
                           :align="align" :render-header="headOperation_render"
          >
            <template slot-scope="scope"></template>
          </el-table-column>

        </el-table>
        <!-- total command modules -->
        <action-summary :command="command" v-if="showSummaryFinal"></action-summary>
      </div>

      <!--dropdown handle modules-->
      <action-drop :head-list="gridHead" :headSetSw="headSetSw" :keyRefer="keyRefer"
                   @setting-submit="settingSubmit"></action-drop>

      <!-- error status display -->
      <error-prompt :errorType="errorType" @refreshGrid="refreshGrid"></error-prompt>

    </template>
    <!--pagination for table componetn-->
    <actionPanel :gridID="gridID" :total="gridData.total" :layout="layout" :pageSizes="pageSizes"
                 :pagerCount="pagerCount" :searchConditions="searchConditions"
                 @refreshGrid="refreshGrid"
                 :style="{display: showActionPanel?'block':'none'}">
    </actionPanel>
  </div>
</template>
<script>
  import eventBus from '../../../utils/eventBus'
  import {arrContainObj, debounce, addEventHandler, countRange, renderRange, getTotalList} from '../../../utils/index'
  import {actionDrop, actionSummary, actionScope, slotScope, actionPanel, errorPrompt} from './ComReg'

  export default {
    name: 'default-base-grid',
    data() {
      return {
        headRefer: {},
        firstCol: ['index', 'selection'], //special-column
        handleCol: ['handle'], //special-column
        headSetSw: {
          set: false,
          search: false
        },//表格头部设置模块状态值
        command: {
          order: 'current',
        },//合计模块控制指令
        resizeRate: 50,//表格渲染刷新频率
        storeGridData: null,//存储Grid列表数据
        radioModel: '',//radio model
        firstRowHasError: {
          value: false
        },//第一行数中 表单 单元格是否存在验证错误的情况
      }
    },
    components: {actionDrop, actionSummary, actionScope, slotScope, actionPanel, errorPrompt},
    props: {
      keyRefer: {type: Object},  //指代属性
      loadState: {type: Object, default: {data: false, head: false}},   //表格数据加载状态
      gridID: {type: String},//表格ID值
      gridHead: {
        type: Array, default: function () {
          return [];
        }
      }, //表头数据
      gridData: {
        type: Object, default() {
          return {};
        }
      }, //表格显示的数据
      align: {type: String, default: 'left'},//单元格内容位置
      border: {type: Boolean, default: true},//是否有边框
      resizable: {type: Boolean, default: true}, //对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
      firstColType: {type: String, default: 'selection'},//第一列固定列类型（非自动表头配置）
      handleColType: {type: String, default: 'handle'},//固定操作列类型（非自动表头配置）
      ationColConfig: {
        type: Object, default: function () {
          return {
            label: '操作',
            width: '150'
          }
        }
      },//固定操作列自定义配置
      showPanel: {type: Boolean, default: true},//分页器显示开关
      showHeadOperation: {type: Boolean, default: true},//表头设置操作模块开关
      showAddRowOperation: {type: Boolean, default: false},//表头设置 新增行操作模块开关
      mockQuery: {
        type: Object, default: function () {
          return {
            page: 'normal',
            type: 'normal'
          }
        }
      }, //模拟数据请求参数值
      searchConditions: {
        type: Object,
        default() {
          return {
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
          };
        }
      },//搜索条件 searchConditions
      layout: {type: String}, //组件布局，子组件名用逗号分隔
      pagerCount: {type: Number},//页码按钮的数量，当总页数超过该值时会折叠
      pageSizes: {type: Array},  //每页显示个数选择器的选项设置
      sizeInfo: {
        type: Object, default: function () {
          return {
            maxHeight: 500//表格渲染高度默认值
          }
        }
      },//尺寸信息
      initDynamicSize: {type: Boolean, default: true},//是否为动态尺寸 （初始化渲染动态）
      autoResize: {type: Boolean, default: true},//表格高度是否自适应窗口变化
      holderInfo: {
        type: Object, default() {
          return {
            fatherID: 'table-body',
            childIDList: ['search', 'panel-page'],
          }
        }
      },//表格容器信息（包含父级容器和所包含的子级容器列表)
      sumDataSource: {type: String, default: 'sumtotal'},  //全部数据合计行数据来源 (list / sumtotal )
      sumFixedNum: {type: Number, default: 2},  //当前页合计 数字 保留几位小数

      gridCheck: {
        type: Object, default() {
          return {
            state: '', list: []
          }
        }
      },//grid check data for form in grid cell
      topGapForErrMsg: {type: Number, default: 20},//表格第一行顶部留白间距（为验证错误信息腾出空间)
    },
    computed: {
      //是否处于加载状态中
      isLoading() {
        return this.loadState.data && this.loadState.head;
      },
      //是否渲染表格及相关模块 （表头有数据，存在表格内容数据，可以为空）
      isRender() {
        if (!this.gridData) {
          return false;
        }
        if (!this.gridData.hasOwnProperty('list')) {
          return false;
        }
        return this.gridHead.length > 0 && this.gridData.list;
      },
      //错误类型
      errorType() {
        //只有在加载状态中结束后（ 即：表头和表数据都请求完成后，无论请求是否成功 ），才会去判断是否错误以及具体是哪种错误类型
        if (this.isLoading) {
          if (this.gridHead.length === 0) {
            return 'error';
          }
          if (!this.gridData.list) {
            return 'noData';
          }
          if (this.gridData.list.length === 0) {
            return 'noResult';
          }
          return 'noError';
        }
        else {
          return 'noError';//初始状态都为 ‘noError’
        }
      },
      /**
       * is show summary row ( 是否显示合计行 )
       * base on:
       * 1、 error type is not 'noError'
       * 2、 if one of the row types is numbe
       */
      showSummaryFinal() {
        const colType = this.headRefer['xtype'];
        //In the grid, if one of the row types is number, grid shoud show summary row.
        const hasNum = this.gridHead.some(item => {
          return item[colType] === 'number';
        });
        return hasNum && this.errorType === 'noError';
      },
      /**
       * 是否显示分页器 （ 根据数据状态判断 ）
       * 1、组件控制开关 - showPanel （false / true)
       * 2、errorType 为 'error' / 'noData' 时，不显示 （没有表头或者表格数据出错)
       */
      showActionPanel() {
        return this.showPanel && (this.errorType !== 'error' && this.errorType !== 'noData');
      },
      //首列渲染开关
      firstColRender() {
        return arrContainObj(this.firstCol, this.firstColType) && this.errorType === 'noError';
      },
      //操作列渲染开关
      actionRender() {
        return arrContainObj(this.handleCol, this.handleColType) && this.errorType === 'noError';
      },
      //新增行操作列渲染开关
      addRowColRender() {
        return this.showAddRowOperation && (this.errorType === 'noError' || this.errorType === 'noResult');//开关开启 + 只要表头/表数据正常即可
      },
      //表头设置列渲染开关
      headOperationColRender() {
        return this.showHeadOperation && (this.errorType === 'noError' || this.errorType === 'noResult');//开关开启 + 只要表头/表数据正常即可
      },
      //首列的配置
      firstColInfo() {
        return {
          [this.headRefer['col-type']]: this.firstColType,
          [this.headRefer['label']]: this.firstColType === 'index' ? "#" : null,//label
          [this.headRefer['model-code']]: 'firstCol',
          [this.headRefer['width']]: "60",
        }
      },
      //操作列的配置
      ationColInfo() {
        return {
          [this.headRefer['col-type']]: this.handleColType,
          [this.headRefer['label']]: this.ationColConfig.label || '操作',
          [this.headRefer['model-code']]: 'fnsclick',
          [this.headRefer['width']]: this.ationColConfig.width || "150",
          [this.headRefer['align']]: this.ationColConfig.align || "center",
        }
      },
      //新增行操作列的配置
      addRowColInfo() {
        return {
          [this.headRefer['col-type']]: 'addRow',
          [this.headRefer['label']]: '',
          [this.headRefer['model-code']]: 'addRow',
          [this.headRefer['width']]: "50",
        }
      },
      //表头设置列的配置
      headOperationColInfo() {
        return {
          [this.headRefer['col-type']]: 'headOperation',
          [this.headRefer['label']]: '',
          [this.headRefer['model-code']]: 'headOperation',
          [this.headRefer['width']]: "23",
        }
      },
      //处理后表头数据
      finalHead() {
        const d = JSON.parse(JSON.stringify(this.gridHead));
        return this.headMachining(d);
      },
      //实际处理后的表格数据
      actualGridData() {
        //全部合计来源于表数据最后一项时 (list)
        if (this.sumDataSource === 'list') {
          if (this.storeGridData === null) {
            this.storeGridData = JSON.parse(JSON.stringify(this.gridData));//copy grid list data only once
          }
          //实际长度大于size值时，删除列表数据最后一位
          if (this.gridData.list.length > this.gridData.size) {
            this.gridData.list.pop();
          }
        }
        //除此之外，直接输出 gridData 即可，不做操作
        return this.gridData;
      },
      //all sum data form grid data
      sumtotalData() {
        if (this.sumDataSource !== 'list') return null;
        const dl = this.storeGridData.list.length;
        const sl = this.storeGridData.size;
        console.log('storeGridData 长度', dl);
        console.log('size 长度', sl);
        if (dl === 0) return {};
        if (dl > sl) {
          return this.storeGridData.list[dl - 1];
        }
        else {
          return {};
        }
      },
      /*
      * get total sum data list (获取合计行数据)
      * 当前业务环节下，获取全部合计行数据，有2种方式
      * 1、类型值为：list，则全部合计行数据来源于表数据 list 字段（数组）最后行。
      *    需要判断 size 字段值 和 list 数组长度的值，
      *    * 如果前者大于后者:
      *        则截取最后一行数据，并在合计行模块中显示，
      *        还需要在原始表数据中删除最后一行。
      *    * 如果前者小于等于后者:
      *        则说明后台并没有在表数据 list 数组中插入合计行数据，则前台无法获取合计行数据，放空值即可，无需其他操作。
      * 2、类型值为：sumtotal，则全部合计行数据来源于后台获取表数据 sumtotal 字段，直接获取即可，无需其他操作。
      */
      getTotalList() {
        let totalInfo;
        //current page sum
        if (this.command.order === 'current') {
          //get current page data total list
          totalInfo = getTotalList(this.headRefer, this.gridData.list, this.gridHead, this.sumFixedNum);
        }
        //all apge sum
        if (this.command.order === 'total') {
          //judge sumtotal data is exists，if it exists, use it, or use {}
          totalInfo = this.sumtotalData ? this.sumtotalData : this.gridData.sumtotal;
        }
        console.log('计算的合计行类型为：' + this.command.order);
        console.log(totalInfo);

        let arr = [];
        const hidden = this.headRefer['hidden'];//key - hidden
        //否则从表格数据的相应字段中 获取各个表格字段值所对应的值 推入到合计行数组中
        for (let item of this.gridHead) {
          //只有在当前表头列显示的情况下才进行如下操作
          if (item[hidden] === false) {
            const key = item[this.headRefer['model-code']];
            const totalVal = totalInfo[key];
            arr.push(totalVal ? totalVal : '');
          }
        }
        //如果首列为 'index' 或 'selection' 的情况下，则在合计行数组头部插入一个空字符串
        if (this.firstColType) {
          arr.unshift('');
        }
        //如果存在操作列的情况下，则在合计行数组尾部插入一个空字符串
        if (this.handleColType) {
          arr.push('');
        }
        return arr;
      },

      //wrapperHeight
      wrapperHeight() {
        return parseInt(this.sizeInfo.maxHeight) - 41 - (this.showSummaryFinal ? 42 : 0);
      }
    },
    watch: {
      gridCheck: {
        handler(newValue, oldValue) {
          if (newValue.state === 'empty-check-list') {
            newValue.list = [];
            newValue.state = '';
          }
        },
        deep: true
      },
    },
    created() {
      //获取 指代属性 head 对象
      this.headRefer = this.keyRefer.head;
    },
    mounted() {
      this.initMounted();//初始化挂载

    },
    updated() {
      //when component updated，calculating the height of the table ，then run and render gird.
      // renderRange(this.holderInfo);
    },
    beforeDestroy() {
      //remove event Listener
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder);
      }
      if (this.initDynamicSize) {
        eventBus.$off('buildRange')
      }
    },
    methods: {
      /**
       * init mounted
       */
      initMounted() {
        if (this.initDynamicSize) {
          // get init render height
          this.sizeInfo.maxHeight = countRange(this.holderInfo);
          //listen to renderRange change
          this.listenRenderRange();
          console.log(this.sizeInfo.maxHeight);
        }
        if (this.autoResize) {
          //listen to window resize and adjust the height of the table
          this.listenResize();
        }
      },

      /**
       * render header (渲染列头设置模块)
       * @param h
       * @param column
       * @param $index
       * @returns {*}
       */
      headOperation_render(h, {column, $index}) {
        return h(this.$SN + 'grid-operation', {
            attrs: {headSetSw: this.headSetSw},
          }
        );
      },


      /**
       * render header (渲染 新增行 列模块)
       * @param h
       * @param column
       * @param $index
       * @returns {*}
       */
      addRow_render(h, {column, $index}) {
        return [
          h('i', {
            class: 'el-icon-circle-plus',
            on: {click: this.addRow}
          }),
        ]
      },

      /**
       * table head machining
       * @param head
       * @returns {boolean}
       */
      headMachining(head) {
        //为特殊字段对应单元格增加配置字段信息
        head.map((item, index) => {
          const code = item[this.headRefer['model-code']];
          if (arrContainObj(this.linkCodeConfig, code)) {
            item[this.headRefer['cell-Config']] = {
              switchType: true,
              type: "link",
              decimal: null,
              disabled: false,
              maxlength: null,
              max: 0,
              min: 0,
              placeHolder: null,
              require: false,
              validateRule: null
            }
          }
        });
        return head;
      },

      //排序
      sortChange({column, prop, order}) {
        //        console.log(column)
        //        console.log(prop)
        //        console.log(order)
        //升序排序
        if (order === "ascending") {
          this.searchConditions.orderBy = "ASC";
          this.searchConditions.orderFieldName = prop;
        }
        //降序排序
        else if (order === "descending") {
          this.searchConditions.orderBy = "DESC";
          this.searchConditions.orderFieldName = prop;
        }
        else {
          this.searchConditions.orderBy = "";
          this.searchConditions.orderFieldName = "";
        }
      },

      //刷新表事件抛出回调
      refreshGrid() {
        this.$emit("refreshGrid");
      },

      /**
       * grid ation event （操作列操作回调事件）
       * @param info
       * @param scope
       */
      gridAtion(info, scope) {
        this.$emit("grid-ation", info, scope);
      },

      /**
       * cell action event （表格单元格点击行为事件抛出回调）
       * @param scope
       * @param item
       */
      cellAction(scope, item) {
        this.$emit("cell-action", scope, item);
      },

      /**
       * setting head list submit （表头操作设置提交抛出回调）
       * @param query
       */
      settingSubmit(query) {
        this.$emit("setting-submit", query);
      },
      /**
       * selection change （表数据 checkbox/radio 选择的时候）
       * @param selection
       * @param index
       */
      selectionChange(selection, index) {
        console.log('表数据 checkbox/radio 选择的时候');
        console.log(selection);
        console.log(index);
        this.$emit("selection-change", selection);
      },

      /**
       * get summaries
       * @param param
       * @returns {computed.getTotalList}
       */
      getSummaries(param) {
        const {columns, data} = param;
        if (this.showSummaryFinal) {
          return this.getTotalList;
        }
      },
      //listen to renderRange change
      listenRenderRange() {
        eventBus.$on('buildRange', (val) => {
          this.sizeInfo.maxHeight = val;
        });
      },

      //listen to window resize and adjust the height of the table
      listenResize() {
        this.__resizeHanlder = debounce(() => {
          //calculating the height of the table ，then run and render gird.
          renderRange(this.holderInfo);
        }, this.resizeRate);
        addEventHandler(window, 'resize', this.__resizeHanlder);
      },


      /**
       * delete current row
       * @param index
       * @param row
       */
      deleteCurrentRow(index, row) {
        this.$emit("delete-current-row", index, row, this.actualGridData);
      },

      /**
       * add row to grid
       */
      addRow() {
        this.$emit("add-row", this.actualGridData);
      },

      /**
       * set form-cell check config (check list) in grid
       * @param key
       */
      setFormCellCheck(key) {

        // console.log('当前受到验证的表单控件-key：');
        // console.log(key);
        // console.log('当前验证列表：');
        // console.log(this.gridCheck);

        //empty check list when reset grid
        if (key === 'empty-check-list') {
          this.gridCheck.list = [];
        }
        //other status => submit/change/blur validate
        else {
          if (!arrContainObj(this.gridCheck.list, key)) {
            this.gridCheck.list.push(key);
          }
        }
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style/base-grid";
</style>
