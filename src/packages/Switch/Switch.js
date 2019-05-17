import create from '../../create/create';

export default create({
  name: 'switch',

  data() {
    return {
      childSwitch: this.value,
    };
  },
  props: {
    value: [Boolean, String, Number],
    switchWidth: { type: Number },
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number], default: '32px' },
    activeText: { type: String, default: '' },
    inactiveText: { type: String, default: '' },
    activeColor: { type: String, default: '#20A0FF' },
    inactiveColor: { type: String, default: '#C0CCDA' },
    activeValue: { type: [Boolean, String, Number], default: true },
    inactiveValue: { type: [Boolean, String, Number], default: false },
    activeIconClass: { type: String, default: null },
    offIconClass: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: '' },
  },


  watch: {
    value(val) {
      this.childSwitch = val;
    },
  },

  render(h) {
    return (
      <el-switch
        class={this.recls()}
        style={{ width: this.convert_width, height: this.convert_height }}

        value={this.childSwitch}
        onInput={e =>
          this.handleModel(e)
        }
        onChange={this.change}
        activeText={this.activeText}
        inactiveText={this.inactiveText}
        activeColor={this.activeColor}
        inactiveColor={this.inactiveColor}
        activeValue={this.activeValue}
        inactiveValue={this.inactiveValue}
        activeIconClass={this.activeIconClass}
        inactiveIconClass={this.inactiveIconClass}
        width={this.switchWidth}
        disabled={this.disabled}
        name={this.name}
      >
      </el-switch>
    );
  },

  methods: {
    handleModel: function(e) {
      this.childSwitch = e;
      this.$emit('input', this.childSwitch);
    },

    change: function(val) {
      this.$emit('change', val);
    },
  },
});
