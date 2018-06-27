export default {
  name: 'total-command',
  components: {},
  data() {
    return {
      dropTit: '合计',
      dropConf: [{command: 'current', tit: '分页合计'}, {command: 'total', tit: '全部合计'}],
      titMap: {
        current: '分页合计',
        total: '全部合计',
      }
    };
  },
  props: {
    command: {
      type: Object, default: function () {
        return {
          order: 'current',
        }
      }
    },
  },

  render(h) {
    return (
      <div id="total-command" class="total-command">
        <el-dropdown trigger="click" on-command={this.commandChange}>
          <span class="el-dropdown-link">{this.dropTit}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            {
              this.dropConf.map(item => [
                  <el-dropdown-item command={item.command} class="">{item.tit}</el-dropdown-item>
                ]
              )
            }
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    )
  },
  created() {
  },
  computed: {},
  mounted() {

  },
  watch: {},
  methods: {
    /**
     * command value change
     * @param param
     */
    commandChange(param) {
      this.dropTit = this.titMap[param];
      this.command.order = param;
    }
  },
  beforeDestroy() {

  },

};

