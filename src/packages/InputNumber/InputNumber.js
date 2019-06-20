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
    value: {
      type: Number,
      default: 0,
    },
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },
    min: Number,
    max: Number,
    step: Number,
    stepStrictly: Number,  //是否只能输入 step 的倍数
    precision: Number, //数值精度
    disabled: Boolean,
    controls: {
      type: Boolean,
      default: true,
    },
    controlsPosition: {
      type: String,
    },
    name: String,
    label: String,
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
      this.$emit('input', this.childInputNum);
    },
    /**
     * change
     * @param value
     */
    inputChange(value) {
      this.$emit('change', value);
    },
    /**
     * blur
     * @param event
     */
    inputBlur(event) {
      this.$emit('blur', event);
    },
    /**
     * focus
     * @param event
     */
    inputFocus(event) {
      this.$emit('focus', event);
    },

    /**
     *  method focus
     */
    focus() {
      this.$refs[this.recls()].focus();
    },

    /**
     *  method select
     */
    select() {
      this.$refs[this.recls()].select();
    },
  },
});
