export default {
  name: 'error-prompt',
  components: {},
  data() {
    return {};
  },
  props: {
    errorType: {type: String, default: 'noError'},
  },
  render: function (h) {
    let errCellRender = (type) => {
      switch (type) {
        case 'noData':
          return (
            <div class={"error-prompt"}>
              <img class="error-prompt_img" src='/static/img/null.jpg'/>,
              <div class="error-prompt_content">
                <span>暂无数据</span>
                {/*<span className="" on-click={}>去新增</span>*/}
              </div>
            </div>
          );
        case 'noResult':
          return (
            <div class="error-prompt">
              <img class="error-prompt_img" src="/static/img/searchNone.jpg"/>
              <div class="error-prompt_content">
                <span>抱歉,没有搜索到你要的结果</span>
              </div>
            </div>
          );
        case 'error':
          return (
            <div class="error-prompt trans">
                <img class="error-prompt_img fl" src="/static/img/error.jpg"/>
                <div class="error-prompt_content fl">
                  <p>服务器出错</p>
                  <span>蛋定！伸个懒腰喝杯水，过会再试试吧</span>
                  <el-button type="primary" size="small" on-click={this.refreshGrid}>刷新试试</el-button>
                </div>
            </div>
          );
        default:
          return null;
      }
    };
    return (errCellRender(this.errorType));
  },
  methods: {
    //刷新表事件抛出回调
    refreshGrid() {
      this.$emit("refreshGrid");
    },
  },
};

