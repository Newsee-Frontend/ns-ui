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
    label: String,
    disabled: Boolean,
    name: String,
    closable: Boolean,
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
