//action col for table
export default {
  name: 'action-scope',
  components: {},
  data() {
    return {
      dropTit: '更多',
    };
  },
  props: {
    scope: {type: Object},//scope from table
  },

  render(h) {
    return (
      <div class="action-scope">
        {
          //single button
          <el-button class="fl" type="text" on-click={this.gridAtion.bind(this, this.actionList[0], this.scope)}>{this.actionList[0].label}</el-button>
        }
        {
          //more than 2 operation buttons, use drop-down menu to display
          this.actionList.length > 2 ?
            < el-dropdown class="fl" trigger="click">
              <span class="el-dropdown-link">{this.dropTit}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                {
                  this.actionList.map((item, index) => [
                      index > 0 ?
                        <el-dropdown-item class="" key={index} nativeOnClick={this.gridAtion.bind(this, item, this.scope)}>{item.label}
                        </el-dropdown-item>
                        : null
                    ]
                  )
                }
              </el-dropdown-menu>
            </el-dropdown> :
            // 普通按钮
            this.actionList.length === 2 ?
              <el-button type="text" on-click={this.gridAtion.bind(this, this.actionList[0], this.scope)}>{this.actionList[1].label}</el-button> :
              null
        }
        {
          //clear float
          <div class="clear" style={{dispaly: 'none'}}></div>
        }
      </div>
    )
  },
  created() {
  },
  computed: {
    //get action button list form scope
    actionList() {
      return this.scope.row.fnsclick;
    }
  },
  mounted() {

  },
  watch: {},
  methods: {
    //操作列点击
    gridAtion(info, scope, event) {
      this.$emit("grid-ation", info, scope);
    },
  },
  beforeDestroy() {

  },

};

