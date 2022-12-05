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
    value: [String, Number],
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    name: { type: String, default: '' },
    type: { type: String, default: 'text' }, //text，textarea
    placeholder: { type: String, default: null },
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },
    prefixIcon: { type: String }, //输入框头部图标
    suffixIcon: { type: String }, //输入框尾部图标
    rows: { type: Number, default: 3 },
    minlength: { type: [Number, String] }, //最小输入长度
    maxlength: { type: [Number, String], default: 300 }, //最大输入长度
    disabled: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    max: Number,
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
        <icon-svg slot={type} icon-class={icon} on-click={this.iconClick.bind(this, type)} />
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
      this.$emit('input', this.childIpt);
    },
    /**
     * change
     * @param value
     */
    change(value) {
      this.$emit('change', value);
    },
    /**
     * blur
     * @param event
     */
    blur(event) {
      this.$emit('blur', event);
    },


    /**
     * focus
     * @param event
     */
    focus(event) {
      this.$emit('focus', event);
    },

    /**
     * clear
     * @param event
     */
    clear(event) {
      this.$emit('clear', event);
    },

    /**
     * icon-click
     * @param type
     */
    iconClick(type) {
      this.$emit('iconClick', this.childIpt, type);
    },
  },

  created() {
    this.childIpt = this.value;
  },
});
