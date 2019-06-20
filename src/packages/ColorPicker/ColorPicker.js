import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'color-picker',

  data() {
    return {
      childColorPicker: this.value,
    };
  },
  props: {
    value: [Date, Array, String, Number],
    disabled: { type: Boolean, default: false }, //禁用
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸
    showAlpha: { type: Boolean, default: false },
    colorFormat: { type: String },
    popperClass: { type: String },
    predefine: { type: Array },
  },

  computed: {},

  watch: {
    value(val) {
      this.childColorPicker = val;
    },
  },

  render(h) {

    return (
      h(
        'el-color-picker',
        {
          class: this.recls([this.formsize]),
          props: {
            value: this.childColorPicker,
            size: this.size,
            disabled: this.disabled,
            showAlpha: this.showAlpha,
            colorFormat: this.colorFormat,
            popperClass: this.popperClass,
            predefine: this.predefine,
          },
          on: {
            input: e => {
              this.childColorPicker = e;
              this.$emit('input', this.childColorPicker);
            },
            change: this.change,
            'active-change': this.activeChange,
          },
        },
      )
    );
  },

  methods: {
    change(value) {
      this.$emit('change', value);
    },

    activeChange(value) {
      this.$emit('active-change', value);
    },
  },

  created() {
  },

  mounted() {
  },
});
