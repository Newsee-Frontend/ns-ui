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
    /**
     * 绑定值
     */
    value: [Date, Array, String, Number],

    /**
     * 宽度
     */
    width: [String, Number],

    /**
     * 高度
     */
    height: [String, Number],

    /**
     * 非范围选择时的占位内容
     */
    placeholder: { type: String },

    /**
     * 范围选择时开始日期的占位内容
     */
    startPlaceholder: { type: String },

    /**
     * 范围选择时开始日期的占位内容
     */
    endPlaceholder: { type: String },

    /**
     * 选择范围时的分隔符
     */
    rangeSeparator: { type: String, default: '-' },

    /**
     * 完全只读
     */
    readonly: { type: Boolean, default: false },

    /**
     * 禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 是否显示清除按钮
     */
    clearable: { type: Boolean, default: true },

    /**
     * 文本框可输入
     */
    editable: { type: Boolean, default: true },

    /**
     * 输入框尺寸
     */
    size: { type: String, validate: s => sizeValidator(s) },

    /**
     * 对齐方式
     */
    align: { type: String, default: 'left' },

    /**
     * TimePicker 下拉框的类名
     */
    popperClass: { type: String },

    /**
     * 显示在输入框中的格式
     */
    format: { type: String, default: 'HH:mm:ss' }, 

    /**
     * 时间日期绑定值格式，不指定则绑定Data对象
     */
    valueFormat: { type: String, default: 'HH:mm:ss' },

    /**
     * 是否是时间范围
     */
    isRange: { type: Boolean, default: false }, 

    /**
     * 当前时间日期选择器特有的选项参考下表
     */
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
        editable={this.editable}
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
      /**
       * 用户确认选定的值时触发
       * @event change
       * @property { String } value  组件绑定值
       */
      this.$emit('change', value);
    },

    onBlur() {
      /**
       * 当 input 失去焦点时触发
       * @event blur
       */
      this.$emit('blur');
    },
    onFocus() {
      /**
       * 当 input 获得焦点时触发
       * @event focus
       */
      this.$emit('focus');
    },

    handleModel(e) {
      this.childTimePicker = e;
      this.$emit('input', this.childTimePicker);
    },
  },
});
