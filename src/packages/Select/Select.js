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
    keyMap: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' }),
    },  //  label, value 对应的字段名
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸
    placeholder: { type: String, default: null },
    name: { type: String },
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    multipleLimit: { type: Number, default: 0 },
    collapseTags: { type: Boolean, default: false },
    filterable: { type: Boolean, default: false },
    filterMethod: { type: Function, default: null }, //自定义过滤方法
    remote: { type: Boolean, default: false }, //是否为远程搜索
    remoteMethod: { type: Function, default: null }, //远程搜索方法
    allowCreate: { type: Boolean, default: false }, //是否允许用户创建新条目，需配合 filterable 使用\\
    custom: { type: Boolean, default: false }, //自定义 下拉内容
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
      this.childSelect = val;
    },
  },

  render(h) {
    let { label, value } = this.keyMap;
    const elOption = (item) => (
      <el-option
        key={item[value]}
        value={item[value]}
        label={item[label]}
        disabled={item.disabled}
      >
        {this.custom ? <span class="fl">{item[label]}</span> : null}
        {this.custom ? <span class="fr customtemplate">{item[value]}</span> : null}
      </el-option>
    );
    return (
      <el-select
        class={[
          this.recls([this.formsize]),
          this.multiple && `${this.namespace}-select-multiple`,
        ]}
        value={this.childSelect}
        onInput={e => this.handleModel(e)}
        onChange={this.change.bind(this)}
        onVisible-change={this.visibleChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        disabled={this.disabled}
        clearable={this.clearable}
        multiple={this.multiple}
        multipleLimit={this.multipleLimit}
        collapseTags={this.collapseTags}
        filterable={this.filterable}
        filterMethod={this.filterMethod}
        remote={this.remote}
        remoteMethod={this.remoteMethod}
        allowCreate={this.allowCreate}
        loading={this.loading}
        placeholder={this.placeholder}
        style={this.convert_style}
      >
        {
          this.options.map((item) => {
            return elOption(item);
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
     * visible-Change （ 点击下拉菜单 ）
     */
    visibleChange(e) {
      this.$emit('visible-change');
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


  },
});
