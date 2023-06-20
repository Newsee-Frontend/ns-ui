import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'date-picker',

  data() {
    return {
      childDataPicker: this.value,
    };
  },

  props: {
    /**
     * 绑定值
     */
    value: [Date, Array, String, Number],

    /**
     * 选择器的宽度
     */
    width: { type: [String, Number] },

    /**
     * 选择器的高度
     */
    height: { type: [String, Number] },

    /**
     * 完全只读
     */
    readonly: { type: Boolean, default: false },

    /**
     * 禁用
     */
    disabled: { type: Boolean, default: false }, 

    /**
     * 文本框可输入
     */
    editable: { type: Boolean, default: false }, 

    /**
     * 是否显示清除按钮
     */
    clearable: { type: Boolean, default: true }, 

    /**
     * 尺寸
     */
    size: { type: String, validator: s => sizeValidator(s) }, 

    /**
     * 占位内容
     */
    placeholder: { type: String },

    /**
     * 范围选择时开始日期的占位内容
     */
    startPlaceholder: { type: String },

    /**
     * 范围选择时结束日期的占位内容
     */
    endPlaceholder: { type: String },

    /**
     * 显示类型
     */
    type: { type: String, default: 'date' }, 

    /**
     * 显示在输入框中的格式
     */
    format: { type: String, default: 'yyyy-MM-dd' }, 

    /**
     * 时间日期绑定值格式，不指定则绑定Data对象
     */
    valueFormat: { type: String, default: 'yyyy-MM-dd' }, 

    /**
     * 对齐方式
     */
    align: { type: String, default: 'left' }, 

    /**
     * DatePicker 下拉框的类名
     */
    popperClass: { type: String },

    /**
     * 选择范围时的分隔符
     */
    rangeSeparator: { type: String, default: ' - ' },

    /**
     * 可选，选择器打开时默认显示的时间
     */
    defaultTime: { type: [String, Array] }, 

    /**
     * 在范围选择器里取消两个日期面板之间的联动
     */
    unlinkPanels: { type: Boolean, default: true }, 

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
      this.childDataPicker = val;
    },
  },

  render(h) {
    return (
      <el-date-picker
        class={this.recls([this.formsize])}
        value={this.childDataPicker}
        onInput={e => this.handleModel(e)}
        type={this.type}
        readonly={this.readonly}
        disabled={this.disabled}
        editable={this.editable}
        clearable={this.clearable}
        placeholder={this.placeholder}
        start-placeholder={this.startPlaceholder}
        end-placeholder={this.endPlaceholder}
        unlink-panels={this.unlinkPanels}
        format={this.format}
        value-format={this.valueFormat}
        align={this.align}
        popper-class={this.popperClass}
        picker-options={this.pickerOptions}
        range-separator={this.rangeSeparator}
        default-time={this.defaultTime}
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
       * @property { Array String }  value 组件绑定值。格式与绑定值一致，可受 value-format 控制
       */
      this.$emit('change', value);
    },

    handleModel(e) {
      this.childDataPicker = e;
      /**
       * 当修改值时触发
       * @event input
       * @property { Array String}  value 组件绑定值
       */
      this.$emit('input', this.childDataPicker);
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
  },
});
