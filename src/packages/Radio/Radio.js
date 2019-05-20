import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'radio',

  data() {
    return {
      childRadio: this.value,
    };
  },
  props: {
    value: [String, Number],
    width: [String, Number],
    options: { type: Array, default: [] },
    type: { type: String, default: 'normal' }, //Radio 类型     normal /  button
    size: { type: String, validator: s => sizeValidator(s) },
    fill: { type: String, default: '#20a0ff' }, //背景颜色
    textColor: { type: String, default: '#ffffff' }, //按钮：字体颜色
    disabled: { type: Boolean, default: false },
    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },
  },

  computed: {},

  watch: {
    value(val) {
      this.childRadio = val;
    },
  },

  render(h) {

    const radioDom = item => {
      return (
        h(
          this.type === 'button' ? `el-radio-button` : `el-radio`,
          {
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

    return (
      <el-radio-group
        class={this.recls()}
        value={this.childRadio}
        onInput={e => this.handlemodel(e)}
        disabled={this.disabled}
        fill={this.fill}
        textColor={this.textColor}
        style={{ width: this.convert_width }}
        on-change={this.change}
      >
        {
          this.options.map(item => (radioDom(item)))
        }
      </el-radio-group>);
  },

  methods: {
    handlemodel(e) {
      this.childRadio = e;
      this.$emit('input', this.childRadio);
    },
    change(value) {
      this.$emit('change', value);
    },
  },
});
