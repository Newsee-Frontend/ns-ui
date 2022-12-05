import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';
import unionBy from 'lodash/unionBy';

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
      default: () => [],
    },
    width: [String, Number],
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸
    placeholder: { type: String, default: null },
    name: { type: String },
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    multipleLimit: { type: Number, default: 0 },
    popperClass: { type: String },
    collapseTags: { type: Boolean, default: false }, //多选时是否将选中值按文字的形式展示
    filterable: { type: Boolean, default: true },  //默认搜索
    filterMethod: { type: Function, default: null }, //自定义过滤方法
    remote: { type: Boolean, default: false }, //是否为远程搜索
    remoteMethod: { type: Function, default: null }, //远程搜索方法
    allowCreate: { type: Boolean, default: false }, //是否允许用户创建新条目，需配合 filterable 使用
    loadingText: { type: String, default: '加载中' },
    noMatchText: { type: String, default: '无匹配数据' },
    defaultFirstOption: { type: Boolean, default: true },
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
      return { width: this.convert_width };
    },
  },

  watch: {
    value(val) {
      this.childSelect = val;
    },
  },

  render(h) {
    let { label, value } = this.keyRefer;
    // 默认去重，防止报错
    let  options = unionBy(this.options, this.keyRefer.value)
    const optionRender = item => (
      <el-option
        key={item[value]}
        value={item[value]}
        label={item[label]}
        disabled={item.disabled}
      ></el-option>
    );
    return (
      <el-select
        class={this.reClass}
        size="small"
        ref="select"
        value={this.childSelect}
        nativeOnKeyup = {this.filterKeyUp.bind(this)}
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
        defaultFirstOption={this.defaultFirstOption}
        remoteMethod={this.remoteMethod}
        allowCreate={this.allowCreate}
        loading={this.loading}
        placeholder={this.placeholder}
        style={this.convert_style}
      >
        {options.map(item => {
          return optionRender(item);
        })}
        <span slot={'default'} class={'select-option-content'}>
          {this.$slots.default}
        </span>
      </el-select>
    );
  },

  methods: {
    /**
     * defaultFirstOption 在多选 输入中文的情况下失效，手动补充方法
     */
    filterKeyUp(e){
      if(e.code === 'Space' && this.defaultFirstOption && this.multiple){
        let selectRef = this.$refs.select
        let { options, query } = selectRef
        selectRef.hoverIndex = options.findIndex(option =>
          option.label && option.label.indexOf(query) > -1) || 0
      }
    },

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
