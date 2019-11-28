/**
 * action summary module
 */
export default {
  name: 'action-summary',
  components: {},
  data() {
    return {
      dropTit: null,
      dropConf: [
        { command: 'current', tit: '分页' },
        { command: 'total', tit: '全部' },
      ],
    };
  },
  props: {
    initSummaryState: { type: String }, //初始 command 状态
    command: { type: String }, //用于切换
  },
  render(h) {
    return (
      <div id="action-summary" class="action-summary">
        <el-dropdown trigger="click" on-command={this.commandChange}>
          <div class="el-dropdown-link">
            <ul>
              <li>{this.dropTit}</li>
              <li>合计</li>
            </ul>
            <i class="el-icon-arrow-down el-icon--right" />
          </div>
          <el-dropdown-menu slot="dropdown">
            {this.dropConf.map(item => [
              <el-dropdown-item command={item.command} class="">
                {item.tit}
              </el-dropdown-item>,
            ])}
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    );
  },
  methods: {
    /**
     * command value change
     * @param param
     */
    commandChange(param) {
      this.dropTit = this.getTitBycommand(param);
      this.$emit('update:command', param);
    },
    getTitBycommand(command) {
      return this.dropConf.filter(item => item.command === command)[0].tit;
    },
  },
  created() {
    this.dropTit = this.getTitBycommand(this.initSummaryState);
  },
};
