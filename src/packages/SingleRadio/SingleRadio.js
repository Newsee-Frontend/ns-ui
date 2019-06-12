import create from '../../create/create';

export default create({
  name: 'single-radio',

  data() {
    return {
      childRadio: this.value
    };
  },
  props: {
    value: [String, Number, Boolean],

    label: [String, Number, Boolean],

    disabled: Boolean,

    border: Boolean
  },

  computed: {},

  watch: {
    value(val){
      this.childRadio = val
    }
  },

  render(h) {
    return(
      <el-radio
        value={this.childRadio}
        onInput={e => this.handlemodel(e)}
        onChange={this.change}
        class={this.recls()}
        label={this.label}
        disabled={this.disabled}
        border={this.border}
      >
        { this.$slots.default}
      </el-radio>
    )
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

  created() {
  },

  mounted() {
  },
});
