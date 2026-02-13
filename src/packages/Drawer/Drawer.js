import create from '../../create/create';

export default create({
  name: 'drawer',

  data() {
    return {
      isHide: false,
      isDragging: false,
      drawerSize: null,
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

    /**
     * 是否可拖拽调整大小
     */
    resizable: { type: Boolean, default: true },

    /**
     * 最小宽度/高度
     */
    minSize: { type: Number, default: 100 },

    /**
     * 最大宽度/高度
     */
    maxSize: { type: Number, default: 800 },
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
      const style = {
        transition: this.isDragging ? 'none' : `all ${this.speed} ${this.transition}`,
      };
      if (this.drawerSize !== null) {
        if (this.isHorizontal) {
          style.width = `${this.drawerSize}px`;
        } else {
          style.height = `${this.drawerSize}px`;
        }
      }
      return style;
    },
    isHorizontal() {
      return this.direction === 'left' || this.direction === 'right';
    },
    resizeEdgeStyle() {
      const base = {
        position: 'absolute',
        zIndex: 10,
        background: 'transparent',
      };
      if (this.direction === 'left') {
        return { ...base, right: 0, top: 0, width: '2px', height: '100%', cursor: 'ew-resize' };
      } else if (this.direction === 'right') {
        return { ...base, left: 0, top: 0, width: '2px', height: '100%', cursor: 'ew-resize' };
      } else if (this.direction === 'top') {
        return { ...base, left: 0, bottom: 0, width: '100%', height: '2px', cursor: 'ns-resize' };
      } else if (this.direction === 'bottom') {
        return { ...base, left: 0, top: 0, width: '100%', height: '2px', cursor: 'ns-resize' };
      }
      return base;
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
        <div class="over-hidden" ref="overHidden">
          <div class={this.recls('container')} ref="container">
            {this.$slots.default}
          </div>
        </div>
        <div class={this.drawerSwitchCls}>
          <icon-class icon-class={this.iconClass} on-click={this.drwaerHandle} />
        </div>
        {this.resizable && <div style={this.resizeEdgeStyle} on-mousedown={this.onMouseDown} />}
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
    onMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      const rect = this.$el.getBoundingClientRect();
      this.isDragging = true;
      this.startPos = this.isHorizontal ? e.clientX : e.clientY;
      this.startSize = this.isHorizontal ? rect.width : rect.height;
      document.addEventListener('mousemove', this.onDragging);
      document.addEventListener('mouseup', this.onDragEnd);
    },
    onDragging(e) {
      if (!this.isDragging) return;
      const currentPos = this.isHorizontal ? e.clientX : e.clientY;
      let delta = currentPos - this.startPos;
      if (this.direction === 'right' || this.direction === 'bottom') {
        delta = -delta;
      }
      let newSize = this.startSize + delta;
      newSize = Math.max(this.minSize, Math.min(this.maxSize, newSize));
      this.drawerSize = newSize;
      this.$emit('resize', newSize);
    },
    onDragEnd() {
      this.isDragging = false;
      this.$el.style.cursor = '';
      this.$emit('resizeEnd');
      document.removeEventListener('mousemove', this.onDragging);
      document.removeEventListener('mouseup', this.onDragEnd);
    },
  },

  beforeDestroy() {
    document.removeEventListener('mousemove', this.onDragging);
    document.removeEventListener('mouseup', this.onDragEnd);
  },
});
