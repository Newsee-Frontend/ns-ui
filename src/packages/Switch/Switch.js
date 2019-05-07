import create from '../../create/create';
import { convertUnits } from '../../utils/from/auto-from'

export default create({
  name: 'switch',

  data() {
    return {
      childSwitch: this.value
    };
  },
  props: {
    value: [Boolean, String, Number],
    switchWidth: { type: Number },
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number], default: '32px' },
    onText: { type: String, default: '' },
    offText: { type: String, default: '' },
    onColor: { type: String, default: '#20A0FF' },
    offColor: { type: String, default: '#C0CCDA' },
    onValue: { type: [Boolean, String, Number], default: true },
    offValue: { type: [Boolean, String, Number], default: false },
    onIconClass: { type: String, default: null },
    offIconClass: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: '' },
  },

  computed: {
  },

  watch: {
    value(val){
      this.childSwitch = val;
    }
  },

  render(h) {
    let switch_width = convertUnits(this.width);
    let switch_height = convertUnits(this.height);

    return(
      <div
        class={ this.recls() }
        style={{ width: switch_width, height: switch_height}}
      >
         <el-switch
           value ={ this.childSwitch }
           onInput = { e => this.handleModel(e) }
           activeText = { this.onText }
           inactiveText = { this.offText }
           activeColor = { this.onColor }
           inactiveColor	 = { this.offColor }
           activeValue = { this.onValue }
           iactiveValue = { this.offValue }
           activeIconClass = { this.onIconClass }
           iactiveIconClass = { this.offIconClass }
           width = { this.switchWidth }
           disabled = { this.disabled }
           name = { this.name }
         >

         </el-switch>
      </div>
    )
  },

  methods: {
    handleModel: function(e) {
      this.childSwitch = e;
      this.$emit('input', this.childSwitch);
    }
  },

  created() {
  },

  mounted() {
  },
});
