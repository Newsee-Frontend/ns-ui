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
    value: [Date, Array, String, Number],
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    readonly: { type: Boolean, default: false }, //完全只读
    disabled: { type: Boolean, default: false }, //禁用
    editable: { type: Boolean, default: false }, //文本框可输入
    clearable: { type: Boolean, default: true }, //是否显示清除按钮
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸
    placeholder: { type: String }, //占位内容
    startPlaceholder: { type: String }, //占位内容
    endPlaceholder: { type: String }, //占位内容
    type: { type: String, default: 'date' }, //显示类型
    format: { type: String, default: 'yyyy-MM-dd' }, //显示在输入框中的格式
    valueFormat: { type: String, default: 'yyyy-MM-dd' }, //时间日期绑定值格式，不指定则绑定Data对象
    align: { type: String, default: 'left' }, //对齐方式
    popperClass: { type: String }, //DateTimePicker 下拉框的类名
    rangeSeparator: { type: String, default: ' - ' }, //选择范围时的分隔符
    defaultTime: { type: [String, Array] }, //可选，选择器打开时默认显示的时间
    unlinkPanels: { type: Boolean, default: true }, //在范围选择器里取消两个日期面板之间的联动

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
      this.$emit('change', value);
    },

    handleModel(e) {
      this.childDataPicker = e;
      this.$emit('input', this.childDataPicker);
    },
    onBlur() {
      this.$emit('blur');
    },
    onFocus() {
      this.$emit('focus');
    },
  },
});
