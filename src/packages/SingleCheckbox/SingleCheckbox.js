import create from '../../create/create';

export default create({
  name: 'single-checkbox',

  data() {
    return {
      childCheckbox: this.value
    };
  },
  props: {
    value: [String, Number, Boolean],

    trueLabel: [String, Number],

    falseLabel: [String, Number],

    disabled: Boolean,

    border: Boolean,

    indeterminate: Boolean   //半选状态， 只控制样式
  },

  computed: {},

  watch: {
    value(val){
      this.childCheckbox = val;
    }
  },

  render(h) {
    return (
      <el-checkbox
        value={this.childCheckbox}
        onInput={e => { this.handlemodel(e)}}
        onChange={this.change}
        true-label={this.trueLabel}
        false-label={this.falseLabel}
        disabled={this.disabled}
        border={this.border}
        indeterminate={this.indeterminate}
      >
        { this.$slots.default}
      </el-checkbox>
    )
  },

  methods: {
    handlemodel(e) {
      this.childCheckbox = e;
      this.$emit('input', this.childCheckbox);
    },
    change(value) {
      this.$emit('change', value);
    },
  },

  created() {
  },

  mounted() {
  },
});
