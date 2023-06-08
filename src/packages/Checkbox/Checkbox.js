import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'checkbox',

  data() {
    return {
      childCheckbox: this.value,
    };
  },
  props: {
    /**
     * 绑定值
     * @model
     */
    value: [Array, String, Number, Boolean],

    /**
     * 绑定值
     * @value button|default
     */
    type: { type: String, default: 'normal' },

    /**
     * 尺寸
     * @values 'mini', 'small', 'normal', 'medium', 'large'
     */
    size: { type: String, validator: s => sizeValidator(s) },

    /**
     * 选择项
     */
    options: { type: Array, default: () => [] },

    /**
     * 宽度
     */
    width: { type: [String, Number] },

    /**
     * 禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 可被勾选的 checkbox 的最小数量
     */
    min: { type: Number, default: 0 },

    /**
     * 可被勾选的 checkbox 的最大数量
     */
    max: { type: Number },

    /**
     * 按钮：背景颜色
     */
    fill: { type: String, default: '#20a0ff' },

    /**
     * 按钮：字体颜色
     */
    textColor: { type: String, default: '#ffffff' },

    /**
     * 选择项映射
     */
    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },

    /**
     * 是否是多选的
     */
    isGroup: { type: Boolean, default: true },

    /**
     * 选中时的值
     */
    trueLabel: [String, Number],

    /**
     * 没有选中时的值
     */
    falseLabel: [String, Number],
  },
  watch: {
    value(val) {
      this.childCheckbox = val;
    },
  },

  render(h) {
    let options = this.options || [];

    const checkboxDom = item => {
      const isBtn = this.type === 'button';
      return h(
        isBtn ? `el-checkbox-button` : `el-checkbox`,
        {
          class: isBtn ? [this.recls('btn', [this.formsize])] : '',
          props: {
            label: item[this.keyRefer.value],
            key: item[this.keyRefer.value],
            disabled: item[this.keyRefer.disabled],
          },
        },
        item[this.keyRefer.label]
      );
    };

    const checkboxGroup = (
      <el-checkbox-group
        class={this.recls()}
        style={{ width: this.convert_width }}
        value={this.childCheckbox}
        textColor={this.textColor}
        fill={this.fill}
        min={this.min}
        max={this.max}
        disabled={this.disabled}
        onInput={e => this.handleModel(e)}
        onChange={this.change}
      >
        {options.map(item => checkboxDom(item))}
      </el-checkbox-group>
    );

    const checkboxSingle = (
      <el-checkbox
        class={`${this.recls()} ${this.recls('single')}`}
        value={this.childCheckbox}
        onInput={e => {
          this.handleModel(e);
        }}
        onChange={this.change}
        true-label={this.trueLabel}
        false-label={this.falseLabel}
        disabled={this.disabled}
      >
        {this.$slots.default}
      </el-checkbox>
    );

    return this.isGroup ? checkboxGroup : checkboxSingle;
  },

  methods: {
    /**
     * handle model
     * @param e
     */
    handleModel: function(e) {
      this.childCheckbox = e;
      this.$emit('input', this.childCheckbox);
    },

    /**
     * change
     * @param val
     */
    change: function(val) {
      /**
       * 当绑定值变化时触发的事件
       * @property {String} val  -更新后的值
       */
      this.$emit('change', val);
    },
  },
});
