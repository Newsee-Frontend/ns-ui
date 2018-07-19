//pagination modules
export default {
  name: 'action-panel',
  data() {
    return {
      pagerCount: 5
    }
  },
  props: {
    gridID: {type: String},
    //搜索条件 searchConditions
    searchConditions: {
      type: Object, default() {
        return {
          pageNum: 1, //当前页数
          pageSize: 10, //每页显示条目个数
        }
      }
    },
    //总条目数
    total: {type: Number},
    //组件布局，子组件名用逗号分隔
    layout: {type: String, default: "slot,sizes, prev, pager, next, jumper"},
    //每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      }
    }
  },
  computed: {
    //pagination total information
    panelDescribe() {
      const page = Math.ceil(this.total / this.searchConditions.pageSize);
      return "共" + this.total + "条" + "/" + page + "页";
    }
  },
  render(h) {
    return (
      <div class={"panel-page"} id={this.gridID + '-panel'}>
        {
          <span class="panel-pre_text fl">{this.panelDescribe}</span>
        }
        {
          <el-pagination class="fl" current-page={this.searchConditions.pageNum} page-sizes={this.pageSizes} page-size={this.searchConditions.pageSize}
                         total={this.total} layout={this.layout} pager-count={this.pagerCount}
                         on-size-change={this.sizeChange} on-current-change={this.currentChange}>
          </el-pagination>
        }
        {
          <el-button class="fl panel-po_btn" size="small">确定</el-button>
        }
        {
          <div class="clear" style="dispaly: 'none'"></div>
        }
      </div>
    )
  },
  created() {
  },
  mounted() {

  },
  methods: {
    //page-size change
    sizeChange(val) {
      this.searchConditions.pageSize = val;
      this.$emit("refreshGrid");
    },
    /**
     * current-page change
     * @param val
     */
    currentChange(val) {
      this.searchConditions.pageNum = val;
      this.$emit("refreshGrid");
    },
  },
};

