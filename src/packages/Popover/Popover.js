import create from '../../create/create';

export default create({
  name: 'popover',

  data() {
    return {
      childPopover: this.value,
    };
  },
  props: {
    trigger: { type: String, default: 'click' },//click/focus/hover/manual
    title: String,
    content: String,
    width: [String, Number],
    placement: { type: String, default: 'bottom' }, //出现位置
    disabled: { type: Boolean, default: false },
    value: { type: Boolean, default: false }, //状态是否可见
    offset: { type: Number, default: 0 }, //出现位置的偏移量
    transition: { type: String, default: 'fade-in-linear' },
    visibleArrow: { type: Boolean, default: true },
    popperClass: String,
    openDelay: Number,
    tabindex: Number,
  },

  computed: {},

  watch: {
    value(val) {
      this.childPopover = val;
    },
  },

  render(h) {
    let { trigger, title, content, width, placement, disabled, value, offset, transition, visibleArrow, popperClass, openDelay, tabindex } = this;
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
          'input': this.handlemodel,
          'show': this.show,
          'after-enter': this.afterEnter,
          'hide': this.hide,
          'after-leave': this.afterLeave,
        },
      },
      [this.$slots.default, <template slot="reference">{this.$slots.reference}</template>],
    );
  },

  methods: {
    handlemodel: function(e) {
      this.$emit('input', e);
    },

    show: function() {
      this.$emit('show');
    },

    afterEnter: function() {
      this.$emit('after-enter');
    },

    hide: function() {
      this.$emit('hide');
    },

    afterLeave: function() {
      this.$emit('after-leave');
    },
  },
});
