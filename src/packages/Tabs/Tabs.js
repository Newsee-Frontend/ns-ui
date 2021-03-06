import create from '../../create/create';
import TabNav from './components/tab-nav';
export default create({
  name: 'tabs',
  components: {
    TabNav,
  },

  props: {
    type: String,
    activeName: String,
    closable: Boolean,
    addable: Boolean,
    value: {},
    editable: Boolean,
    tabPosition: {
      type: String,
      default: 'top',
    },
    beforeLeave: Function,
    stretch: Boolean,
  },

  provide() {
    return {
      rootTabs: this,
    };
  },

  data() {
    return {
      currentName: this.value || this.activeName,
      panes: [],
    };
  },

  watch: {
    activeName(value) {
      this.setCurrentName(value);
    },
    value(value) {
      this.setCurrentName(value);
    },
    currentName(value) {
      if (this.$refs.nav) {
        this.$nextTick(() => {
          this.$refs.nav.$nextTick(_ => {
            this.$refs.nav.scrollToActiveTab();
          });
        });
      }
    },
  },

  methods: {
    calcPaneInstances(isLabelUpdated = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(
          vnode =>
            vnode.tag &&
            vnode.componentOptions &&
            ['ElTabPane', 'ns-tab-pane'].includes(vnode.componentOptions.Ctor.options.name)
        );
        // update indeed
        const panes = paneSlots.map(({ componentInstance }) => componentInstance);
        const panesChanged = !(
          panes.length === this.panes.length &&
          panes.every((pane, index) => pane === this.panes[index])
        );
        if (isLabelUpdated || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return;
      this.setCurrentName(tabName);
      this.$emit('tab-click', tab, event);
    },
    handleTabRemove(pane, ev) {
      if (pane.disabled) return;
      ev.stopPropagation();
      this.$emit('edit', pane.name, 'remove');
      this.$emit('tab-remove', pane.name);
    },
    handleTabAdd() {
      this.$emit('edit', null, 'add');
      this.$emit('tab-add');
    },
    setCurrentName(value) {
      const changeCurrentName = () => {
        if (this.currentName !== value) {
          this.$emit('change', value);
        }
        this.currentName = value;
        this.$emit('input', value);
      };
      if (this.currentName !== value && this.beforeLeave) {
        const before = this.beforeLeave(value, this.currentName);
        if (before && before.then) {
          before.then(() => {
            changeCurrentName();

            this.$refs.nav && this.$refs.nav.removeFocus();
          });
        } else if (before !== false) {
          changeCurrentName();
        }
      } else {
        changeCurrentName();
      }
    },
  },

  render(h) {
    let {
      type,
      handleTabClick,
      handleTabRemove,
      handleTabAdd,
      currentName,
      panes,
      editable,
      addable,
      tabPosition,
      stretch,
    } = this;

    const newButton =
      editable || addable ? (
        <span
          class="el-tabs__new-tab"
          on-click={handleTabAdd}
          tabindex="0"
          on-keydown={ev => {
            if (ev.keyCode === 13) {
              handleTabAdd();
            }
          }}
        >
          <i class="el-icon-plus"></i>
        </span>
      ) : null;

    const navData = {
      props: {
        currentName,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        editable,
        type,
        panes,
        stretch,
      },
      ref: 'nav',
    };
    const header = (
      <div class={['el-tabs__header', `is-${tabPosition}`]}>
        {newButton}
        <tab-nav {...navData}></tab-nav>
      </div>
    );
    const panels = <div class="el-tabs__content">{this.$slots.default}</div>;

    return (
      <div
        class={[
          this.recls(),
          {
            'el-tabs': true,
            'el-tabs--card': type === 'card',
            [`el-tabs--${tabPosition}`]: true,
            'el-tabs--border-card': type === 'border-card',
            arrowTabs: type === 'arrow',
          },
        ]}
      >
        {tabPosition !== 'bottom' ? [header, panels] : [panels, header]}
      </div>
    );
  },

  created() {
    if (!this.currentName) {
      this.setCurrentName('0');
    }

    this.$on('tabLabelChanged', this.calcPaneInstances.bind(null, true));
  },

  mounted() {
    this.calcPaneInstances();
  },

  updated() {
    this.calcPaneInstances();
  },
});
