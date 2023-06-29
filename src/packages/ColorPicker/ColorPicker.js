import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'color-picker',

  data() {
    return {
      childColorPicker: this.value,
    };
  },
  props: {
    /**
     * 绑定值
     */
    value: [Date, Array, String, Number],

    /**
     * 是否禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 尺寸
     */
    size: { type: String, validator: s => sizeValidator(s) },

    /**
     * 是否支持透明度选择
     */
    showAlpha: { type: Boolean, default: false },

    /**
     * 写入 v-model 的颜色的格式
     */
    colorFormat: { type: String },

    /**
     * ColorPicker 下拉框的类名
     */
    popperClass: { type: String },

    /**
     * 预定义颜色
     */
    predefine: { type: Array },
  },

  computed: {},

  watch: {
    value(val) {
      this.childColorPicker = val;
    },
  },

  render(h) {
    return h('el-color-picker', {
      class: this.recls([this.formsize]),
      props: {
        value: this.childColorPicker,
        size: this.size,
        disabled: this.disabled,
        showAlpha: this.showAlpha,
        colorFormat: this.colorFormat,
        popperClass: this.popperClass,
        predefine: this.predefine,
      },
      on: {
        input: e => {
          this.childColorPicker = e;
          this.$emit('input', this.childColorPicker);
        },
        change: this.change,
        'active-change': this.activeChange,
      },
    });
  },

  methods: {
    change(value) {
      /**
       * 当绑定值变化时触发
       * @event change
       * @property { String }  value 当前值
       */
      this.$emit('change', value);
    },

    activeChange(value) {
      /**
       * 面板中当前显示的颜色发生改变时触发
       * @event active-change
       * @property { String }  value 当前显示的颜色值
       */
      this.$emit('active-change', value);
    },
  },

  created() {},

  mounted() {},
});
