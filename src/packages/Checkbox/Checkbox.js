import create from '../../utils/create';
import { sizeValidator } from '../../utils/props/validator';
import { convertUnits } from '../../utils/auto-from';

export default create({
  name: 'checkbox',

  data() {
    return {
      childCheckbox: this.value,
      checkAll: false,
      isIndeterminate: false   // 控制 全选按钮是否是indeterminate状态
    };
  },
  props: {
    value: Array,
    type: { type: String, default: 'normal' },
    //尺寸可选 'mini' 'small' 'normal' 'medium' 'large';
    size: { type: String, validator: s => sizeValidator(s) },
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number]},   //normal表示代表行高
    options: { type: Array, default: []},
    indeterminate: { type: Boolean, default: false }, //是否有全选按钮
    keyRefer: {
      type: Object,
      default: ()=> ( {label: 'label', value: 'value',disabled: 'disabled'})
    },  //  label, value 对应的字段名
    min: { type: Number, default: 0 }, //可被勾选的 checkbox 的最小数量
    max: { type: Number }, //可被勾选的 checkbox 的最大数量
    fill: { type: String, default: '#20a0ff' }, //按钮：背景颜色
    textColor: { type: String, default: '#ffffff' }, //按钮：字体颜色
  },

  computed: {},

  watch: {
    value(val){
      this.childCheckbox = val;
      //有全选的状态， 要和全选按钮联动
      if(this.indeterminate){
        this.judgeCheckboxAllStatus();
      }
    }
  },

  render(h) {

    let width,height;
    this.width && (width = convertUnits(this.width));
    this.height && (height = convertUnits(this.height));

    const checkboxAllDom = <el-checkbox
      value={ this.checkAll }
      onInput= { e => this.handleModelAll(e)}
      indeterminate={ this.isIndeterminate }
    >全选 </el-checkbox>;

    const checkboxDom = (item) => (
      <el-checkbox
        key={item[this.keyRefer.value]}
        label={item[this.keyRefer.value]}
        disabled={item[this.keyRefer.disabled]}
        name={this.name}
      >
        { item[this.keyRefer.label] }
      </el-checkbox>
    )

    const checkBtnDom = (item) => (
      <el-checkbox-button
        class={ [this.recls('btn',[this.formsize])]}
        key={item[this.keyRefer.value]}
        label={item[this.keyRefer.value]}
        disabled={item[this.keyRefer.disabled]}>
        { item[this.keyRefer.label] }
      </el-checkbox-button>
    )

    const checkboxGroupDom = <el-checkbox-group
      value= { this.childCheckbox }
      style={{width: width,  'line-height': height}}
      textColor={ this.textColor }
      onInput= { (e) =>  this.handleModel(e) }
    >
      {  this.options.map((item) => (
        this.type === 'button' ? checkBtnDom(item) : checkboxDom(item)
      ))}
    </el-checkbox-group>

    return (
      <div
        class={ this.recls() }
        style={{ width: this.width }}
      >
        { this.indeterminate && checkboxAllDom }
        { this.indeterminate && <div class="indeterminate-gap"/> }
        { checkboxGroupDom }
      </div>
    )
  },

  methods: {
    //全选 改变
    handleModelAll: function(e){
      this.checkAll = e;
      this.isIndeterminate = false;
      let  allOptions = this.options.map( item =>  (item[this.keyRefer.value]));
      this.childCheckbox = e ? allOptions : [];
      this.$emit('input', this.childCheckbox)
    },

    //checkgroup 值变化
    handleModel: function(e){
      this.childCheckbox = e;
      //有全选的状态， 要和全选按钮联动
      if(this.indeterminate){
        this.judgeCheckboxAllStatus();
      }
      this.$emit('input', this.childCheckbox)
    },

    //根据checkbox的选择判断全选按钮的状态
    judgeCheckboxAllStatus: function(){
      let checkedCount = this.childCheckbox.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
    },
  },

  created() {
    //有全选的状态， 要和全选按钮联动
    if(this.indeterminate){
      this.judgeCheckboxAllStatus();
    }
  },

  mounted() {
  },
});
