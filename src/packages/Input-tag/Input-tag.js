import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';
import { addEventHandler, removeEventHandler, stopPropagation } from '../../utils/event';

export default create({
  name: 'input-tag',

  data() {
    return {
      childSelect: this.value,
      isFocus: false,
      isHover: false,
    };
  },
  props: {
    value: [Array, String, Number],
    options: {
      type: Array,
      default: () => [],
    },
    width: [String, Number], //select 不对外暴露高度设置
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸
    placeholder: { type: String, default: null },
    name: { type: String },
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    multipleLimit: { type: Number, default: 0 },
    collapseTags: { type: Boolean, default: false }, //多选时是否将选中值按文字的形式展示
    prefixIcon: String, //头部图标
    suffixIcon: String, //尾部图标
    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },
  },

  computed: {
    reClass() {
      return [
        ...this.recls([
          this.formsize,
          'multiple',
          this.prefixIcon ? 'prefix' : '',
          this.suffixIcon ? 'suffix' : '',
          this.collapseTags ? '' : 'auto_height',
        ]),
        ...[`${this.isFocus ? 'is-focus' : ''}`],
        ...[`${this.isHover ? 'is-hover' : ''}`],
        'form-element__pseudo',
      ];
    },
    convert_style() {
      return {
        width: this.convert_width,
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
    const optionRender = item => (
      <el-option
        key={item[value]}
        value={item[value]}
        label={item[label]}
        disabled={item.disabled}
      ></el-option>
    );

    return (
      <div
        class={this.reClass}
        on-click={$event => this.inputTagClick($event)}
        on-mouseenter={this.inputTagMouseenter.bind(this)}
        on-mouseleave={this.inputTagMouseleave.bind(this)}
      >
        {this.prefixIcon ? (
          <div class={this.recls('icon')}>
            <icon-svg icon-class={this.prefixIcon} on-click={this.iconClick.bind(this, 'prefix')} />
          </div>
        ) : null}
        <el-select
          value={this.childSelect}
          onInput={e => this.handleModel(e)}
          size="small"
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
          {this.options.map(item => {
            return optionRender(item);
          })}
        </el-select>
        {this.suffixIcon ? (
          <div class={this.recls('icon')}>
            <icon-svg icon-class={this.suffixIcon} on-click={this.iconClick.bind(this, 'suffix')} />
          </div>
        ) : null}
      </div>
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

    inputTagClick(e) {
      stopPropagation(e);
      this.isFocus = true;
      this.$emit('click');
    },
    inputTagMouseenter() {
      this.isHover = true;
    },
    inputTagMouseleave() {
      this.isHover = false;
    },

    /**
     * select change
     * @param value
     */
    change(value) {
      this.$emit('change', value);
    },

    removeTag() {
      this.$emit('remove-tag');
    },

    /**
     * 清除事件
     */
    onClear() {
      this.isFocus = false;
      this.$emit('clear');
    },

    /**
     * on-focus
     */
    onFocus() {
      this.isFocus = true;
      this.$emit('focus');
    },

    /**
     * on-blur
     */
    onBlur() {
      this.$emit('blur');
    },

    /**
     * icon click
     */
    iconClick(type) {
      this.$emit('iconClick', type, this.childSelect);
    },
  },
  mounted() {
    //listen drop modules click event
    addEventHandler(document.body, 'click', _ => (this.isFocus = false));
  },
  beforeDestroy() {
    //remove event Listener
    removeEventHandler(document.body, 'click', _ => (this.isFocus = false));
  },
});
