import create from '../../utils/create';

export default create({
  name: 'tabs',

  data() {
    return {
      childTabs: this.value
    };
  },
  props: {
    fatherTabs: String,
    type: { type: String, default: 'card' },
    activeName: { type: String, default: '' },
    closable: { type: Boolean, default: false },
    addable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false }
  },

  computed: {},

  watch: {
    value(val){
      this.childTabs = val;
    }
  },

  render(h) {
    return(
      <el-tabs
        className={this.recls()}
        value={this.childTabs}
        onInput={e => this.handleModel(e)}
        type={this.type}
        active-name={this.activeName}
        closable={this.closable}
        addable={this.addable}
        editable={this.editable}
        on-tab-click={this.tabClick.bind(this)}
        on-tab-remove={this.tabRemove.bind(this)}
        on-tab-add={this.tabAdd.bind(this)}
        on-edit={this.edit.bind(this)}
      >
        {this.$slots.default}
      </el-tabs>
    )
  },

  methods: {
    handleModel: function(val){
      this.$emit('input', val);
    },

    //tab 被选中时触发 参数被选中的标签 tab 实例
    tabClick(tab) {
      this.$emit('tabClick', tab);
    },
    //点击 tab 移除按钮后触发 参数被删除的标签的 name
    tabRemove(name) {
      this.$emit('tabRemove', name);
    },
    //点击 tabs 的新增按钮后触发
    tabAdd() {
      this.$emit('tabAdd');
    },
    //点击 tabs 的新增按钮或 tab 被关闭后触发   参数(targetName, action)
    edit(targetName, action) {
      this.$emit('edit', targetName, action);
    },
  },

  created() {
  },

  mounted() {
  },
});
