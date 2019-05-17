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
    value: Array,
    type: { type: String, default: 'normal' },
    size: { type: String, validator: s => sizeValidator(s) },
    options: { type: Array, default: [] },
    width: { type: [String, Number] },
    disabled: { type: Boolean, default: false },
    min: { type: Number, default: 0 }, //可被勾选的 checkbox 的最小数量
    max: { type: Number }, //可被勾选的 checkbox 的最大数量
    fill: { type: String, default: '#20a0ff' }, //按钮：背景颜色
    textColor: { type: String, default: '#ffffff' }, //按钮：字体颜色

    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },  //  label, value 对应的字段名
  },

  computed: {},

  watch: {
    value(val) {
      this.childCheckbox = val;
    },
  },

  render(h) {
    const checkboxDom = (item) => (
      <el-checkbox
        key={item[this.keyRefer.value]}
        label={item[this.keyRefer.value]}
        disabled={item[this.keyRefer.disabled]}
        name={this.name}
      >
        {item[this.keyRefer.label]}
      </el-checkbox>
    );

    const checkBtnDom = (item) => (
      <el-checkbox-button
        class={[this.recls('btn', [this.formsize])]}
        key={item[this.keyRefer.value]}
        label={item[this.keyRefer.value]}
        disabled={item[this.keyRefer.disabled]}>
        {item[this.keyRefer.label]}
      </el-checkbox-button>
    );

    return (
      <el-checkbox-group
        class={this.recls()}
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
        {this.options.map((item) => (
          this.type === 'button' ? checkBtnDom(item) : checkboxDom(item)
        ))}
      </el-checkbox-group>
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

  created() {
  },

  mounted() {
  },
});
