import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';
export default create({
  name: 'time-picker',

  data() {
    return {
      childTimePicker: this.value,
    };
  },

  props: {
    value: [Date, Array, String, Number],
    width: [String, Number],
    height: [String, Number],
    placeholder: { type: String }, //内容
    startPlaceholder: { type: String }, //占位内容
    endPlaceholder: { type: String }, //占位内容
    rangeSeparator: { type: String, default: '-' }, //区间的占位符
    readonly: { type: Boolean, default: false }, //只读
    disabled: { type: Boolean, default: false }, //禁用
    clearable: { type: Boolean, default: true }, //是否显示清除按钮
    editable: { type: Boolean, default: true }, //是否可编辑
    size: { type: String, validate: s => sizeValidator(s) }, //尺寸
    align: { type: String, default: 'left' }, //对齐方式
    popperClass: { type: String }, //DateTimePicker 下拉框的类名
    format: { type: String, default: 'HH:mm:ss' }, //显示在输入框中的格式
    valueFormat: { type: String, default: 'HH:mm:ss' }, //时间日期绑定值格式，不指定则绑定Data对象
    isRange: { type: Boolean, default: false }, //是否是时间范围
    //当前时间日期选择器特有的选项参考下表
    pickerOptions: {
      type: Object,
      default: function() {
        return {};
      },
    },
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
      this.childTimePicker = val;
    },
  },

  render(h) {
    return (
      <el-time-picker
        class={this.recls([this.formsize])}
        value={this.childTimePicker}
        onInput={e => this.handleModel(e)}
        readonly={this.readonly}
        disabled={this.disabled}
        clearable={this.clearable}
        placeholder={this.placeholder}
        start-placeholder={this.startPlaceholder}
        end-placeholder={this.endPlaceholder}
        range-separator={this.rangeSeparator}
        format={this.format}
        value-format={this.valueFormat}
        align={this.align}
        is-range={this.isRange}
        popper-class={this.popperClass}
        picker-options={this.pickerOptions}
        on-change={this.change.bind(this)}
        on-blur={this.onBlur.bind(this)}
        on-focus={this.onFocus.bind(this)}
        style={this.convert_style}
      />
    );
  },

  methods: {
    change(value) {
      this.$emit('change', value);
    },

    onBlur() {
      this.$emit('blur');
    },
    onFocus() {
      this.$emit('focus');
    },

    handleModel(e) {
      this.childTimePicker = e;
      this.$emit('input', this.childTimePicker);
    },
  },
});
