import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';
import { convertUnits } from '../../utils/auto-from';

export default create({
  name: 'redio',

  data() {
    return {
      childRadio: this.value
    };
  },
  props: {
    keyRefer: {
      type: Object,
      default: ()=> ( {label: 'label', value: 'value',disabled: 'disabled'})
    },  //  label, value 对应的字段名

    value: [String, Number],
    options: { type: Array, default: []},
    type: { type: String, default: 'normal' }, //Radio 类型     normal /  button

    //尺寸可选 'mini' 'small' 'normal' 'medium' 'large';
    size: { type: String, validator: s => sizeValidator(s) },
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number]},   //normal 表示行高

    fill: { type: String, default: '#20a0ff' }, //背景颜色
    disabled: { type: Boolean, default: false }
  },

  computed: {},

  watch: {
    value(val){
      this.childRadio = val;
    }
  },

  render(h) {
    let width,height;
    this.isDef(this.width) && (width = convertUnits(this.width));
    this.isDef(this.height) && (height = convertUnits(this.height));

    const radioDom = (item) => (
      <el-radio
        label={item[this.keyRefer.value]}
        key ={item[this.keyRefer.value]}
        disabled ={item[this.keyRefer.disabled]}
      >
        { item[this.keyRefer.label] }
      </el-radio>
    );

    const radioBtnDom = (item) => (
      <el-radio-button
        label={item[this.keyRefer.value]}
        key ={item[this.keyRefer.value]}
        disabled ={item[this.keyRefer.disabled]}
        class= { this.recls('btn', [this.formsize]) }
      >
        { item[this.keyRefer.label] }
      </el-radio-button>
    );

    return (
      <el-radio-group
        class={ this.recls() }
        value = { this.childRadio }
        onInput = { e => this.handlemodel(e)}
        disabled = { this.disabled }
        style={{ width: width, height: height }}
      >
        {
          this.options.map((item) => (
            this.type === 'button'? radioBtnDom(item) : radioDom(item)
          ))
        }

    </el-radio-group>)
  },

  methods: {
    handlemodel(e){
      this.childRadio = e;
      this.$emit('input', this.childRadio)
    }
  },

  created() {
  },

  mounted() {
  },
});
