import create from '../../create/create';

export default create({
  name: 'rate',

  data() {
    return {
      childRate: this.value,
    };
  },
  props: {
    value: Number,

    disabled: { type: Boolean, default: false },
    allowHalf: { type: Boolean, default: false },
    showScore: { type: Boolean, default: false },
    showText: { type: Boolean, default: false },
    max: { type: Number, default: 5 },

    colors: {
      type: [Array, Object],
      default: () => {
        return ['#99A9BF', '#F7BA2A', '#FF9900'];
      },
    },

    texts: {
      type: Array,
      default: () => {
        return ['极差', '失望', '一般', '满意', '惊喜'];
      },
    },

    scoreTemplate: { type: String },
  },

  watch: {
    value(val) {
      this.childRate = val;
    },
  },

  render(h) {
    return h('el-rate', {
      class: this.recls(),
      domProps: {
        value: this.value,
      },
      props: {
        value: this.value,
        disabled: this.disabled,
        allowHalf: this.allowHalf,
        'show-score': this.showScore,
        showText: this.showText,
        max: this.max,
        colors: this.colors,
        texts: this.texts,
        scoreTemplate: this.scoreTemplate,
      },
      on: {
        input: val => {
          this.$emit('input', val);
        },
        change: val => {
          this.$emit('change', val);
        },
      },
    });
  },
});
