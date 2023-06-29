import create from '../../create/create';

export default create({
  name: 'drawer',

  data() {
    return {
      isHide: false,
    };
  },
  props: {
    /**
     * Drawer 打开的方向
     * @values 'left', 'right', 'top', 'bottom'
     */
    direction: {
      type: String,
      default: 'left',
      validate: d => {
        return ['left', 'right', 'top', 'bottom'].indexOf(d) > -1;
      },
    },

    /**
     * 打开的速率
     */
    speed: { type: String, default: '300ms' },

    /**
     * 过渡效果
     */
    transition: { type: String, default: 'linear' },
  },

  computed: {
    drawerCls() {
      return [
        this.recls(),
        `to-${this.direction}`,
        {
          hide: this.isHide,
        },
      ];
    },
    drawerStyle() {
      return {
        transition: `all ${this.speed} ${this.transition}`,
      };
    },
    drawerSwitchCls() {
      return [this.recls('switch')];
    },
    iconClass() {
      switch (this.direction) {
        case 'left':
          return this.isHide ? 'drawer-left' : 'drawer-right';
        case 'right':
          return this.isHide ? 'drawer-right' : 'drawer-left';
        case 'top':
          return this.isHide ? 'drawer-top' : 'drawer-bottom';
        case 'bottom':
          return this.isHide ? 'drawer-bottom' : 'drawer-top';
        default:
          return this.isHide ? 'drawer-left' : 'drawer-right';
      }
    },
  },

  watch: {},

  render(h) {
    return (
      <div class={this.drawerCls} style={this.drawerStyle}>
        <div class="over-hidden">
          <div class={this.recls('container')}>{this.$slots.default}</div>
        </div>
        <div class={this.drawerSwitchCls}>
          <icon-class icon-class={this.iconClass} on-click={this.drwaerHandle} />
        </div>
      </div>
    );
  },

  methods: {
    drwaerHandle() {
      this.isHide = !this.isHide;
      /**
       * 当切换收起展开时触发
       * @event click
       */
      this.$emit('click');
    },
  },
});
