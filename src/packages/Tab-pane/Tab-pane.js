import create from '../../create/create';

export default create({
  name: 'tab-pane',
  data() {
    return {
      index: null,
      loaded: false,
    };
  },
  props: {
    /**
     * 选项卡标题
     */
    label: String,

    /**
     * 是否禁用
     */
    disabled: Boolean,

    /**
     * 与选项卡绑定值 value 对应的标识符，表示选项卡别名
     */
    name: String,

    /**
     * 标签是否可关闭
     */
    closable: Boolean,

    /**
     * 标签是否延迟渲染
     */
    lazy: Boolean,
  },

  computed: {
    isClosable() {
      return this.closable || this.$parent.closable;
    },
    active() {
      const active = this.$parent.currentName === (this.name || this.index);
      if (active) {
        this.loaded = true;
      }
      return active;
    },
    paneName() {
      return this.name || this.index;
    },
  },

  watch: {
    label() {
      this.$parent.$emit('tabLabelChanged');
    },
  },

  render(h) {
    let { lazy, loaded, active, paneName } = this;
    let isShow = active ? 'block' : 'none';
    if (!lazy || loaded || active) {
      return (
        <div
          class={[
            this.recls(),
            {
              'el-tab-pane': true,
            },
          ]}
          role="tabpanel"
          style={{ display: isShow }}
          aria-hidden={!active}
          id={`pane-${paneName}`}
          aria-labelledby={`tab-${paneName}`}
        >
          {this.$slots.default}
        </div>
      );
    }
  },
});
