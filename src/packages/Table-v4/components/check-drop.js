export default {
  name: 'check-drop',
  data() {
    return {
      dropTit: '',

      checkOption: [
        { command: 'current', tit: '', menutit: '当页勾选' },
        { command: 'total', tit: '全部', menutit: '全部选择' },
      ],
    }
  },

  render(h) {
    return (
      <div class={{ "checkbox-area": true, "isText": !!this.dropTit}}>
        <el-dropdown trigger="click" on-command={this.handleCommand}>
           <span class="el-dropdown-link">
             { this.dropTit }
             <i class="el-icon-arrow-down el-icon--right" title="点击切换选择模式"/>
          </span>
          <el-dropdown-menu slot="dropdown" class="summary-menu">
            {this.checkOption.map((item, index) => {
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
      this.dropTit = this.getTitBycommand(param)
      this.$emit('check-mode-change', param);
    },

    getTitBycommand(command) {
      return this.checkOption.filter(item => item.command === command)[0].tit;
    },

  },
};
