import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'input-number',

  data() {
    return {
      childInputNum: this.value,
    };
  },
  props: {
    /**
     * 绑定值
     */
    value: {
      type: Number,
      default: 0,
    },

    /**
     * 计数器宽度
     */
    width: { type: [String, Number] },

    /**
     * 计数器高度
     */
    height: { type: [String, Number] },

    /**
     * 计数器尺寸
     */
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },

    /**
     * 设置计数器允许的最小值
     */
    min: Number,

    /**
     * 设置计数器允许的最大值
     */
    max: Number,

    /**
     * 计数器步长
     */
    step: Number,

    /**
     * 是否只能输入 step 的倍数
     */
    stepStrictly: {
      type: Boolean,
      default: false,
    },

    /**
     * 数值精度
     */
    precision: Number, 

    /**
     * 是否禁用计数器
     */
    disabled: Boolean,

    /**
     * 是否使用控制按钮
     */
    controls: {
      type: Boolean,
      default: true,
    },

    /**
     * 控制按钮位置
     */
    controlsPosition: {
      type: String,
    },

    /**
     * 原生属性
     */
    name: String,

    /**
     * 输入框关联的label文字
     */
    label: String,

    /**
     * 输入框默认 placeholder
     */
    placeholder: String,
  },

  computed: {
    convert_style() {
      return {
        width: this.convert_width,
        height: this.convert_height,
        lineHeight: this.convert_height,
      };
    },
  },

  watch: {
    value(val) {
      this.childInputNum = val;
    },
  },

  render(h) {
    return (
      <el-input-number
        ref={this.recls()}
        class={this.recls([this.formsize])}
        style={this.convert_style}
        value={this.childInputNum}
        onInput={e => {
          this.handlerModel(e);
        }}
        onChange={this.inputChange.bind(this)}
        onBlur={this.inputBlur.bind(this)}
        onFocus={this.inputFocus.bind(this)}
        min={this.min}
        max={this.max}
        step={this.step}
        stepStrictly={this.stepStrictly}
        precision={this.precision}
        disabled={this.disabled}
        controls={this.controls}
        controlsPosition={this.controlsPosition}
        name={this.name}
        label={this.label}
        placeholder={this.placeholder}
      />
    );
  },

  methods: {
    handlerModel(e) {
      this.childInputNum = e;
      /**
       * 绑定值被改变时触发
       * @event input 
       * @property { Number } value  双绑的值
       */
      this.$emit('input', this.childInputNum);
    },

    inputChange(value) {
      /**
       * 绑定值被改变时触发
       * @event change 
       * @property { Number } value  双绑的值
       */
      this.$emit('change', value);
    },

    inputBlur(event) {
      /**
       * 在组件 Input 失去焦点时触发
       * @event blur 
       * @property { Object } event  (event: Event)
       */
      this.$emit('blur', event);
    },

    inputFocus(event) {
      /**
       * 在组件 Input 获得焦点时触发
       * @event focus 
       * @property { Object } event  (event: Event)
       */
      this.$emit('focus', event);
    },

    /**
     * @public
     * 使 input 获取焦点
     */
    focus() {
      this.$refs[this.recls()].focus();
    },

    /**
     * @public
     * 选中 input 中的文字
     */
    select() {
      this.$refs[this.recls()].select();
    },
  },
});
