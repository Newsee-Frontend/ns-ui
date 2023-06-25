import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'cascader',

  data() {
    return {
      childCascader: this.value,
    };
  },

  props: {
    /**
     * 选中项绑定值
     */
    value: Array,

    /**
     * 可选项数据源，键名可通过 Props 属性配置
     */
    options: Array,

    /**
     * 配置选项
     */
    props: {
      type: Object,
      default: () => ({
        value: 'value',
        label: 'label',
        children: 'children',
      }),
    },

    /**
     * 输入框占位文本
     */
    placeholder: { type: String, default: '请选择' },

    /**
     * 尺寸
     */
    size: { type: String, validator: s => sizeValidator(s) },

    /**
     * 宽度
     */
    width: [String, Number],

    /**
     * 高度 
     */
    height: [String, Number],

    /**
     * 次级菜单的展开方式
     * @values 'click','hover'
     */
    expandTrigger: { type: String, default: 'click' },

    /**
     * 是否禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 是否支持清空选项
     */
    clearable: { type: Boolean, default: false },

    /**
     * 输入框中是否显示选中值的完整路径
     */
    showAllLevels: { type: Boolean, default: true },

    /**
     * 是否允许选择任意一级的选项
     */
    changeOnSelect: { type: Boolean, default: false }, 

    /**
     * 是否可搜索选项
     */
    filterable: { type: Boolean, default: false },
  },

  computed: {
    convert_style() {
      return {
        width: this.convert_width,
        height: this.convert_height,
        lineHeight: this.convert_height,
      };
    },
  },

  watch: {
    value(val) {
      this.childCascader = val;
    },
  },

  render(h) {
    return (
      <el-cascader
        class={this.recls([this.formsize])}
        value={this.value}
        onInput={e => this.handleModel(e)}
        onChange={this.change.bind(this)}
        options={this.options}
        clearable={this.clearable}
        placeholder={this.placeholder}
        expandTrigger={this.expandTrigger}
        disabled={this.disabled}
        filterable={this.filterable}
        showAllLevels={this.showAllLevels}
        changeOnSelect={this.changeOnSelect}
        style={this.convert_style}
      ></el-cascader>
    );
  },

  methods: {
    handleModel: function(e) {
      this.childCascader = e;
      this.$emit('input', this.childCascader);
    },

    change: function(value) {
      /**
       * 当选中节点变化时触发
       * @event change
       * @property { Array }  value 选中节点的值
       */
      this.$emit('change', value);
    },
  },
});
