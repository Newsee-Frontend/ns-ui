import create from '../../create/create';
export default create({
  name: 'slider',

  data() {
    return {
      childSlider: this.value,
    };
  },
  props: {
    /**
     * 绑定值
     */
    value: [Number, Array],

    /**
     * 是否显示 tooltip
     */
    showTooltip: { type: Boolean, default: true },

    /**
     * 是否禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 步长
     */
    step: { type: Number, default: 1 },

    /**
     * 是否显示间断点
     */
    showStops: { type: Boolean, default: false },

    /**
     * 是否显示输入框，仅在非范围选择时有效
     */
    showInput: { type: Boolean, default: false },

    /**
     * 是否为范围选择
     */
    range: { type: Boolean, default: false },

    /**
     * 最小可选择值
     */
    min: { type: Number, default: 0 },

    /**
     * 最大可选择值
     */
    max: { type: Number, default: 100 },

    /**
     * 是否竖向模式
     */
    vertical: { type: Boolean, default: false },

    /**
     * Slider 宽度
     */
    width: [Number, String],

    /**
     * Slider 高度，竖向模式时必填
     */
    height: [Number, String],

    /**
     * 自定义 tooltip message
     */
    formatTooltip: {
      type: Function,
      default: function(val) {
        return val / 1;
      },
    },
  },

  computed: {},

  watch: {
    value(val) {
      this.childSlider = val;
    },
  },

  render(h) {
    return (
      <el-slider
        value={this.childSlider}
        onInput={e => {
          this.handleModel(e);
        }}
        onChange={this.change}
        showTooltip={this.showTooltip}
        formatTooltip={this.formatTooltip}
        disabled={this.disabled}
        showStops={this.showStops}
        showInput={this.showInput}
        step={this.step}
        range={this.range}
        min={this.min}
        max={this.max}
        vertical={this.vertical}
        height={this.convert_height}
        style={{ width: `${this.convert_width}!important` }}
      ></el-slider>
    );
  },

  methods: {
    handleModel(e) {
      this.childSlider = e;
      /**
       * 数据改变时触发（使用鼠标拖曳时，活动过程实时触发）
       * @event input
       * @property { Number } value  改变后的值
       */
      this.$emit('input', this.childSlider);
    },

    change(e) {
      /**
       * 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）
       * @event change
       * @property { Number } value  改变后的值
       */
      this.$emit('change', e);
    },
  },

  created() {},

  mounted() {},
});
