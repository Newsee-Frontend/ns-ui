import create from '../../create/create';

export default create({
  name: 'popover',

  data() {
    return {
      childPopover: this.value,
    };
  },
  props: {
    /**
     * 触发方式
     * @values 'click','focus','hover','manual'
     */
    trigger: { type: String, default: 'click' },

    /**
     * 标题
     */
    title: String,

    /**
     * 显示的内容
     */
    content: String,

    /**
     * 宽度
     */
    width: [String, Number],

    /**
     * 出现位置
     * @values 'top','top-start','top-end','bottom','bottom-start','bottom-end','left','left-start','left-end','right','right-start','right-end'
     */
    placement: { type: String, default: 'bottom' },

    /**
     * Popover 是否可用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 状态是否可见
     */
    value: { type: Boolean, default: false },

    /**
     * 出现位置的偏移量
     */
    offset: { type: Number, default: 0 },

    /**
     * 定义渐变动画
     */
    transition: { type: String, default: 'fade-in-linear' },

    /**
     * 是否显示 Tooltip 箭头
     */
    visibleArrow: { type: Boolean, default: true },

    /**
     * 为 popper 添加类名
     */
    popperClass: String,

    /**
     * 触发方式为 hover 时的显示延迟，单位为毫秒
     */
    openDelay: Number,

    /**
     * Popover 组件的 tabindex
     */
    tabindex: Number,
  },

  computed: {},

  watch: {
    value(val) {
      this.childPopover = val;
    },
  },

  render(h) {
    let {
      trigger,
      title,
      content,
      width,
      placement,
      disabled,
      value,
      offset,
      transition,
      visibleArrow,
      popperClass,
      openDelay,
      tabindex,
    } = this;
    return h(
      'el-popover',
      {
        class: this.recls(),
        props: {
          trigger,
          title,
          content,
          width,
          placement,
          disabled,
          value,
          offset,
          transition,
          visibleArrow,
          popperClass,
          openDelay,
          tabindex,
        },
        on: {
          input: this.handlemodel,
          show: this.show,
          'after-enter': this.afterEnter,
          hide: this.hide,
          'after-leave': this.afterLeave,
        },
      },
      [this.$slots.default, <template slot="reference">{this.$slots.reference}</template>]
    );
  },

  methods: {
    handlemodel: function(e) {
      this.$emit('input', e);
    },

    show: function() {
      /**
       * 显示时触发
       * @event show
       */
      this.$emit('show');
    },

    afterEnter: function() {
      /**
       * 显示动画播放完毕后触发
       * @event after-enter 
       */
      this.$emit('after-enter');
    },

    hide: function() {
      /**
       * 隐藏时触发
       * @event hide 
       */
      this.$emit('hide');
    },

    afterLeave: function() {
      /**
       * 隐藏动画播放完毕后触发
       * @event after-leave 
       */
      this.$emit('after-leave');
    },
  },
});
