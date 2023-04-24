import create from '../../create/create';

import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'input',
  data() {
    return {
      childIpt: '',
    };
  },
  props: {
    /**
     * 绑定值
     */
    value: [String, Number],

    /**
     * 宽度
     *  @values 120px; 120都支持
     */
    width: { type: [String, Number] },

    /**
     * 高度
     *  @values 120px; 120都支持
     */
    height: { type: [String, Number] },

    /**
     * 原生属性
     */
    name: { type: String, default: '' },

    /**
     * 类型
     * @values text，textarea
     */
    type: { type: String, default: 'text' },

    /**
     * 输入框占位文本
     */
    placeholder: { type: String, default: null },

    /**
     * 尺寸
     * @values 'mini', 'small', 'normal', 'medium', 'large'
     * @values 该尺寸只改宽度， 高度固定32px
     */
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },

    /**
     * 输入框头部图标
     */
    prefixIcon: { type: String },

    /**
     * 输入框尾部图标
     */
    suffixIcon: { type: String },

    /**
     * 输入框行数，只对 type="textarea" 有效
     */
    rows: { type: Number, default: 3 },

    /**
     * 原生属性，最小输入长度
     */
    minlength: { type: [Number, String] },

    /**
     * 最大输入长度
     */
    maxlength: { type: [Number, String], default: 300 },

    /**
     * 禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 原生属性，自动获取焦点
     */
    autofocus: { type: Boolean, default: false },

    /**
     * 原生属性，是否只读
     */
    readonly: { type: Boolean, default: false },

    /**
     * 是否可清空
     */
    clearable: { type: Boolean, default: false },

    /**
     * 原生属性，设置最大值
     */
    max: Number,

    /**
     * 原生属性，设置最小值
     */
    min: Number,
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
      this.childIpt = val;
    },
  },
  render(h) {
    const ipticon = (type, icon) => {
      return icon ? (
        <icon-svg slot={type} icon-class={icon} on-click={this.iconClick.bind(this, type)}/>
      ) : null;
    };
    return (
      <el-input
        class={this.recls([this.formsize])}
        value={this.childIpt}
        onInput={e => this.handleModelInput(e)}
        type={this.type}
        name={this.name}
        placeholder={this.placeholder}
        disabled={this.disabled}
        rows={this.rows}
        min={this.min}
        max={this.max}
        minlength={this.minlength}
        maxlength={this.maxlength}
        autofocus={this.autofocus}
        readonly={this.readonly}
        clearable={this.clearable}
        on-change={this.change.bind(this)}
        on-blur={this.blur.bind(this)}
        on-clear={this.clear.bind(this)}
        on-focus={this.focus.bind(this)}
        style={this.convert_style}
      >
        {ipticon('prefix', this.prefixIcon)}
        {ipticon('suffix', this.suffixIcon)}

        <template slot="prefix">{this.$slots.prefix}</template>
        <template slot="suffix">{this.$slots.suffix}</template>
      </el-input>
    );
  },

  methods: {
    handleModelInput(e) {
      this.childIpt = e;
      /**
       * 在 Input 值改变时触发
       */
      this.$emit('input', this.childIpt);
    },

    change(value) {
      /**
       * 仅在输入框失去焦点或用户按下回车时触发
       * @property (value: String|Number)
       */
      this.$emit('change', value);
    },


    blur(event) {
      /**
       * 在 Input 失去焦点时触发
       *  @property (event: Event)
       */
      this.$emit('blur', event);
    },

    focus(event) {
      /**
       * 在 Input 获得焦点时触发
       *  @property (event: Event)
       */
      this.$emit('focus', event);
    },

    /**
     * clear
     * @param event
     */
    clear(event) {
      /**
       * 在点击由 clearable 属性生成的清空按钮时触发
       */
      this.$emit('clear', event);
    },


    iconClick(type) {
      /**
       * 前后icon的点击事件， 配置prefixIcon、suffixIcon 才会触发
       * @property (val: String|Number, type:String )
       * @property type: prefix 前置icon点击; suffix 后置icon点击
       */
      this.$emit('iconClick', this.childIpt, type);
    },
  },

  created() {
    this.childIpt = this.value;
  },
});
