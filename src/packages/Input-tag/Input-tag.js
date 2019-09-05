import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'input-tag',

  data() {
    return {
      childSelect: this.value,
    };
  },
  props: {
    value: [Array, String, Number],
    options: {
      type: Array,
      default: () => ([]),
    },
    width: [String, Number],
    height: {
      type: [String, Number],
      default: 32,
    },
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸
    placeholder: { type: String, default: null },
    name: { type: String },
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    multipleLimit: { type: Number, default: 0 },
    collapseTags: { type: Boolean, default: false },//多选时是否将选中值按文字的形式展示
    prefixIcon: String,
    suffixIcon: String,
    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },
  },

  computed: {
    reClass() {
      return this.recls([this.formsize, 'multiple']);
    },
    convert_style() {
      return {
        width: this.convert_width,
        minHeight: this.convert_height,
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
        multiple={true}
        multipleLimit={this.multipleLimit}
        collapseTags={this.collapseTags}
        placeholder={this.placeholder}
        style={this.convert_style}
        popperClass="input-tag-popper"
      >
        {
          this.options.map((item) => {
            return optionRender(item);
          })
        }

        {this.prefixIcon ?
          <icon-svg slot="prefix" icon-class={this.prefixIcon} on-click={this.iconClick.bind(this, 'prefix')}/> : null}

        {this.suffixIcon ?
          <icon-svg slot="prefix" class="icon-right"  icon-class={this.suffixIcon} on-click={this.iconClick.bind(this, 'suffix')}/> : null}
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

    /**
     * icon click
     */
    iconClick(type) {
      this.$emit('iconClick', this.childSelect, type);
    },


  },
});
