<!--base grid component-->
<template>
  <div class="cx-grid" :id="gridID" v-loading="!isLoading" element-loading-text="拼命加载中">
    <!--grid container-->
    <template v-if="isRender">
      <div class="grid-container">
        <!-- el table encapsulation -->
        <el-table :data="gridData.list" style="width: 100%" :border="border" :max-height="maxHeight" :height="maxHeight"
                  :show-summary="showSummary" :summary-method="getSummaries" @selection-change="selectionChange"
                  @sort-change="sortChange">
          <!-- show index / selectionprops -column -->
          <el-table-column v-if="firstColRender" :type="firstColInfo[headRefer['col-type']]"
                           :label="firstColInfo[headRefer['label']]"
                           :width="firstColInfo[headRefer['width']]" align="center" :fixed="true"
                           :class-name="'grid-head-'+firstColInfo[headRefer['model-key']]">
          </el-table-column>

          <!-- normal-column -->
          <el-table-column v-if="!item[headRefer['hidden']]" v-for="(item,index) in gridHead" :index="index"
                           :key="index"
                           :label="item[headRefer['label']]" :min-width="item[headRefer['width']]" :align="align"
                           :resizable="resizable"
                           sortable="custom" :fixed="item[headRefer['fixed']]" :show-overflow-tooltip="true"
                           :class-name="'grid-head-'+item[headRefer['model-key']]">
            <!--table cell content-->
            <template slot-scope="scope">
              <!--form components in table-->
              <slot-scope :scope="scope" :item="item" :keyRefer="keyRefer" @cell-action="cellAction"></slot-scope>
            </template>
          </el-table-column>

          <!-- handle-column -->
          <el-table-column v-if="actionRender" :label="ationColInfo[headRefer['label']]"
                           :width="ationColInfo[headRefer['width']]"
                           fixed="right" :align="ationColInfo[headRefer['align']]"
                           :class-name="'grid-head-'+ationColInfo[headRefer['model-key']]"
          >
            <template slot-scope="scope">
              <template v-if="ationColInfo[headRefer['col-type']] === 'handle'">
                <action-scope :scope="scope" :keyRefer="keyRefer" @grid-ation="gridAtion"></action-scope>
              </template>
            </template>
          </el-table-column>

          <!-- head operation setting modules column -->
          <el-table-column v-if="showHeadOperation" :width="headOperationColInfo[headRefer['width']]" fixed="right"
                           :align="align"
                           :render-header="renderHeader"
                           :class-name="'grid-head-'+headOperationColInfo[headRefer['model-key']]">>
            <template slot-scope="scope"></template>
          </el-table-column>

        </el-table>
        <!-- total command modules -->
        <action-total :command="command" v-if="showSummary"></action-total>
      </div>
      <!--dropdown handle modules-->
      <action-drop :head-list="gridHead" :headSetSw="headSetSw" :keyRefer="keyRefer"
                   @setting-submit="settingSubmit"></action-drop>
    </template>
    <!--pagination for table componetn-->
    <actionPanel :gridID="gridID" :total="gridData.total" :layout="layout" :pageSizes="pageSizes"
                 :searchConditions="searchConditions"
                 @refreshGrid="refreshGrid" :style="{visibility: isRender?'visible':'hidden'}">
    </actionPanel>
  </div>
</template>
<script>
  import eventBus from '../../../utils/eventBus'
  import {arrContainObj, debounce, addEventHandler, countRange, renderRange, getTotalList} from '../../../utils/index'
  import {actionDrop, actionTotal, actionScope, slotScope, actionPanel} from './ComReg'

  export default {
    name: 'default-base-grid',
    data() {
      return {
        maxHeight: 500,//表格渲染高度默认值
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
      }
    },
    components: {
      actionDrop, actionTotal, actionScope, slotScope, actionPanel
    },
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
      showSummary: {type: Boolean, default: false},//合计行模块显示开关
      showHeadOperation: {type: Boolean, default: true},//表头设置操作模块开关
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
      pageSizes: {type: Array},  //每页显示个数选择器的选项设置
      autoResize: {type: Boolean, default: true},//表格高度是否自适应窗口变化
      resizable: {type: Boolean, default: true}, //对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
      holderInfo: {
        type: Object, default() {
          return {
            fatherCls: 'table-body',
            childClsList: ['search', 'panel-page'],
          }
        }
      }//表格容器信息（包含父级容器和所包含的子级容器列表)
    },
    computed: {
      //是否处于加载状态中
      isLoading() {
        return this.loadState.data && this.loadState.head;
      },
      //是否渲染表格及相关模块 （表头有数据，存在表格内容数据，可以为空）
      isRender() {
        return this.gridHead.length > 0 && this.gridData.list;
      },
      //处理后表头数据
      finalHead() {
        const d = JSON.parse(JSON.stringify(this.gridHead));
        const h = this.headMachining(d);
        return h
      },
      //当前页 - 分页合计列表数据
      getTotalList() {
        let totalInfo;
        if (this.command.order === 'current') {
          //get current page data total list
          totalInfo = getTotalList(this.headRefer, this.gridData.list, this.gridHead);
          console.log('计算当前合计列 - current');
          console.log(totalInfo);
          // totalInfo = this.gridData.totalInfo;
        }
        if (this.command.order === 'total') {
          totalInfo = this.gridData.allTotal;
          console.log('计算全部合计列 - total');
          console.log(totalInfo);
        }

        let arr = [];
        const hidden = this.headRefer['hidden'];//key - hidden
        //否则从表格数据的相应字段中 获取各个表格字段值所对应的值 推入到合计行数组中
        for (let item of this.gridHead) {
          //只有在当前表头列显示的情况下才进行如下操作
          if (item[hidden] === false) {
            const key = item[this.headRefer['model-key']];
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
      //首列渲染开关
      firstColRender() {
        return arrContainObj(this.firstCol, this.firstColType);
      },
      //操作列渲染开关
      actionRender() {
        return arrContainObj(this.handleCol, this.handleColType);
      },
      //首列的配置
      firstColInfo() {
        return {
          [this.headRefer['col-type']]: this.firstColType,
          [this.headRefer['label']]: this.firstColType === 'index' ? "#" : null,//label
          [this.headRefer['model-key']]: 'firstCol',
          [this.headRefer['width']]: "60",
        }
      },
      //操作列的配置
      ationColInfo() {
        return {
          [this.headRefer['col-type']]: this.handleColType,
          [this.headRefer['label']]: this.ationColConfig.label || '操作',
          [this.headRefer['model-key']]: 'fnsclick',
          [this.headRefer['width']]: this.ationColConfig.width || "150",
          [this.headRefer['align']]: this.ationColConfig.align || "center",
        }
      },
      //表头设置列的配置
      headOperationColInfo() {
        return {
          [this.headRefer['col-type']]: 'headOperation',
          [this.headRefer['label']]: '',
          [this.headRefer['model-key']]: 'headOperation',
          [this.headRefer['width']]: "23",
        }
      }
    },
    created() {
      alert(this.showHeadOperation);
      //获取 指代属性 head 对象
      this.headRefer = this.keyRefer.head;
    },
    mounted() {
      // get init render height
      this.maxHeight = countRange(this.holderInfo);
      //listen to renderRange change
      this.listenRenderRange();
      //listen to window resize and adjust the height of the table
      this.listenResize()
    },
    updated() {
      //when component updated，calculating the height of the table ，then run and render gird.
      renderRange(this.holderInfo);
    },
    beforeDestroy() {
      //remove event Listener
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder);
      }
    },
    methods: {
      /**
       * render header (渲染列头设置模块)
       * @param h
       * @param column
       * @param $index
       * @returns {*}
       */
      renderHeader(h, {column, $index}) {
        return h(this.$SN + 'grid-operation', {
            attrs: {headSetSw: this.headSetSw},
          }
        );
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
       * selection change （表数据 checkbox 选择的时候）
       * @param selection
       */
      selectionChange(selection) {
        this.$emit("selection-change", selection);
      },

      /**
       * get summaries
       * @param param
       * @returns {computed.getTotalList}
       */
      getSummaries(param) {
        const {columns, data} = param;
        return this.getTotalList;
      },
      //listen to renderRange change
      listenRenderRange() {
        eventBus.$on('buildRange', (val) => {
          this.maxHeight = val;
        });
      },

      //listen to window resize and adjust the height of the table
      listenResize() {
        if (this.autoResize) {
          this.__resizeHanlder = debounce(() => {
            //calculating the height of the table ，then run and render gird.
            renderRange(this.holderInfo);
          }, this.resizeRate);

          addEventHandler(window, 'resize', this.__resizeHanlder);
        }
      },
      /**
       * judge array contain another Obj
       * @param arr
       * @param obj
       * @returns {boolean}
       */
      arrContainObj(arr, obj) {
        if (Object.prototype.toString.call(arr) === '[object Array]') {
          let i = arr.length;
          while (i--) {
            if (arr[i] === obj) {
              return true;
            }
          }
          return false;
        }
        else {
          this.throw("the object of the judgment must be a array format ，you better find it");
        }
      },

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style/base-grid";
</style>
