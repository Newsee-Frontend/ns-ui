export default {
  name: 'table-summary',
  props: {
    footerList: Array,
  },
  data() {
    return {
      dropTit: '合计',
      summaryOption: [
        { command: 'current', tit: '分页', menutit: '分页合计' },
        { command: 'checked', tit: '勾选', menutit: '勾选合计' },
        { command: 'total', tit: '全部', menutit: '全部合计' },
      ],
    };
  },

  computed: {
    showSummaryOption({ summaryOption, footerList }) {
      return summaryOption.filter(({ command }) => footerList.indexOf(command) > -1);
    },
  },
  render(h) {
    return (
      <div class="summary-area">
        <el-dropdown trigger="click" on-command={this.handleCommand}>
          <span class="el-dropdown-link">
            {this.dropTit}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown" class="summary-menu">
            {this.showSummaryOption.map((item, index) => {
              return (
                <el-dropdown-item key={index} command={item.command}>
                  {item.menutit}
                </el-dropdown-item>
              );
            })}
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
    handleCommand(param) {
      this.dropTit = this.getTitBycommand(param);

      this.$emit('summary-change', param);
    },

    getTitBycommand(command) {
      return this.summaryOption.filter(item => item.command === command)[0].tit;
    },
  },
};
