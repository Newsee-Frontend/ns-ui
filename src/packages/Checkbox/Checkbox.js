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
    value: [Array,String, Number, Boolean],
    type: { type: String, default: 'normal' },
    size: { type: String, validator: s => sizeValidator(s) },
    options: { type: Array,   default:() => ([])  },
    width: { type: [String, Number] },
    disabled: { type: Boolean, default: false },
    min: { type: Number, default: 0 }, //可被勾选的 checkbox 的最小数量
    max: { type: Number }, //可被勾选的 checkbox 的最大数量
    fill: { type: String, default: '#20a0ff' }, //按钮：背景颜色
    textColor: { type: String, default: '#ffffff' }, //按钮：字体颜色
    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },
    isGroup: {
      type: Boolean,
      default: true
    },

    //单独
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    border: Boolean,
    indeterminate: Boolean
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
      return (
        h(
          isBtn ? `el-checkbox-button` : `el-checkbox`,
          {
            'class': isBtn ? [this.recls('btn', [this.formsize])] : '',
            props: {
              label: item[this.keyRefer.value],
              key: item[this.keyRefer.value],
              disabled: item[this.keyRefer.disabled],
            },
          },
          item[this.keyRefer.label],
        )
      );
    };

    const checkboxGroup = <el-checkbox-group
      className={this.recls()}
      style={{ width: this.convert_width }}
      value={this.childCheckbox}
      textColor={this.textColor}
      fill={this.fill}
      min={this.min}
      max={this.max}
      disabled={this.disabled}
      onInput={(e) => this.handleModel(e)}
      onChange={this.change}
    >
      {options.map(item => (checkboxDom(item)))}
    </el-checkbox-group>;

    const checkboxSingle =   <el-checkbox
      class={this.recls()}
      value={this.childCheckbox}
      onInput={e => { this.handleModel(e)}}
      onChange={this.change}
      true-label={this.trueLabel}
      false-label={this.falseLabel}
      disabled={this.disabled}
      border={this.border}
      indeterminate={this.indeterminate}
    >
      { this.$slots.default}
    </el-checkbox>;

    return (
      this.isGroup? checkboxGroup: checkboxSingle
    );
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
      this.$emit('change', val);
    },
  },
});
