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
    keyRefer: {
      type: Object, default() {
        return {}
      }
    },//指代属性
  },
  render(h) {
    /**
     * action render
     * @param list    action button information list
     * @param scope   scope data
     * @returns {*}
     */
    let actionRender = (list, scope) => {
      return <div class="action-scope">
        {
          //single button
          <el-button class="fl" type="text"
                     on-click={this.gridAtion.bind(this, list[0], scope)}>{list[0].label}</el-button>
        }
        {
          //more than 2 operation buttons, use drop-down menu to display
          list.length > 2 ?
            < el-dropdown class="fl" trigger="click">
              <span class="el-dropdown-link">
                {this.dropTit}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                {
                  list.map((item, index) => [
                      index > 0 ?
                        <el-dropdown-item class="" key={index}
                                          nativeOnClick={this.gridAtion.bind(this, item, scope)}>{item.label}
                        </el-dropdown-item>
                        : null
                    ]
                  )
                }
              </el-dropdown-menu>
            </el-dropdown> :
            // 普通按钮
            list.length === 2 ?
              <el-button type="text" on-click={this.gridAtion.bind(this, list[0], scope)}>
                {list[1].label}
              </el-button> :
              null
        }
        {
          //clear float
          <div class="clear" style={{dispaly: 'none'}}></div>
        }
      </div>
    };
    return this.actionList.length > 0 ? actionRender(this.actionList, this.scope) : null;
  },
  created() {
  },
  computed: {
    scopeRefer() {
      return this.keyRefer.scope;
    },
    //get action button list form scope
    actionList() {
      const key = this.scopeRefer['actionBtnList'];
      if (this.scope.row.hasOwnProperty(key)) {
        return this.scope.row[key];
      }
      else {
        return [];
      }
    }
  },
  methods: {
    //操作列点击
    gridAtion(info, scope, event) {
      this.$emit("grid-ation", info, scope);
    },
  }
};

