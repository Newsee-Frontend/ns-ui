import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'select',

  data() {
    return {
      childSelect: this.value,
    };
  },
  props: {
    value: [Array, String, Number],
    loading: { type: Boolean, default: false },
    options: {
      type: Array,
      default: () => ([]),
    },
    width: [String, Number],
    height: [String, Number],
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸
    placeholder: { type: String, default: null },
    name: { type: String },
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    multipleLimit: { type: Number, default: 0 },
    popperClass: { type: String },
    collapseTags: { type: Boolean, default: false },//多选时是否将选中值按文字的形式展示
    filterable: { type: Boolean, default: false },
    filterMethod: { type: Function, default: null }, //自定义过滤方法
    remote: { type: Boolean, default: false }, //是否为远程搜索
    remoteMethod: { type: Function, default: null }, //远程搜索方法
    allowCreate: { type: Boolean, default: false }, //是否允许用户创建新条目，需配合 filterable 使用
    loadingText: { type: String, default: '加载中' },
    noMatchText: { type: String, default: '无匹配数据' },
    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },
  },

  computed: {
    reClass() {
      return this.recls([this.formsize, this.multiple && !this.collapseTags && 'auto_height']);
    },
    convert_style() {
      return (this.multiple && !this.collapseTags) ? {
        width: this.convert_width,
        minHeight: this.convert_height,
        lineHeight: this.convert_height,
      } : {
        width: this.convert_width,
        height: this.convert_height,
        lineHeight: this.convert_height,
      };
    },
  },

  watch: {
    value(val) {
      this.childSelect = val;
    },
  },

  render(h) {
    let { label, value } = this.keyRefer;
    const optionRender = (item) => (
      <el-option
        key={item[value]}
        value={item[value]}
        label={item[label]}
        disabled={item.disabled}
      >
      </el-option>
    );
    return (
      <el-select
        class={this.reClass}
        value={this.childSelect}
        onInput={e => this.handleModel(e)}
        onChange={this.change.bind(this)}
        onVisible-change={this.visibleChange.bind(this)}
        onRemove-tag={this.removeTag.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onClear={this.onClear.bind(this)}
        disabled={this.disabled}
        clearable={this.clearable}
        multiple={this.multiple}
        multipleLimit={this.multipleLimit}
        popperClass={this.popperClass}
        collapseTags={this.collapseTags}
        filterable={this.filterable}
        filterMethod={this.filterMethod}
        loadingText={this.loadingText}
        noMatchText={this.noMatchText}
        remote={this.remote}
        remoteMethod={this.remoteMethod}
        allowCreate={this.allowCreate}
        loading={this.loading}
        placeholder={this.placeholder}
        style={this.convert_style}
      >
        {
          this.options.map((item) => {
            return optionRender(item);
          })
        }
      </el-select>
    );
  },

  methods: {
    /**
     * 同步v-model
     * @param e
     */
    handleModel(e) {
      this.childSelect = e;
      this.$emit('input', this.childSelect);
    },

    /**
     * visible-Change （下拉框显示隐藏）
     */
    visibleChange(e) {
      this.$emit('visible-change', e);
    },

    removeTag() {
      this.$emit('remove-tag');
    },

    /**
     * select change
     * @param value
     */
    change(value) {
      this.$emit('change', value);
    },
    /**
     * on-focus
     */
    onFocus() {
      this.$emit('focus');
    },
    /**
     * on-blur
     */
    onBlur() {
      this.$emit('blur');
    },
    /**
     * 清除事件
     */
    onClear() {
      this.$emit('clear');
    },
  },
});
