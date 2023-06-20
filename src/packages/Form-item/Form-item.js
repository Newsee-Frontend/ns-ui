import create from '../../create/create';
import Dialog from '../Dialog/Dialog';

export default create({
  name: 'form-item',
  props: {
    /**
     * 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
     */
    prop: { type: String },

    /**
     * 标签文本
     */
    label: { type: [Number, String] },

    /**
     * 表单域标签的的宽度，例如 '50px'。支持 auto。
     */
    'label-width': { type: String },

    /**
     * 是否必填，如不设置，则会根据校验规则自动生成
     */
    required: { type: Boolean, default: false },

    /**
     * 表单验证规则
     */
    rules: { type: [String, Object, Array], default: null },

    type: { type: String, default: 'string' },

    requireMsg: { type: String, default: null },

    trigger: { type: String, default: 'blur' },

    /**
     * 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息
     */
    error: { type: String },

    /**
     * 是否显示校验错误信息
     */
    'show-message': { type: Boolean, default: true },
    /**
     * 表单验证提示展现类型 1、all:（包含错误错误和正确的展现) 2、only-error:（只有错误的展现） 3、only-error-hover:（只有错误的展现，且鼠标移入展现错误提示)
     */
    cueType: { type: String, default: 'only-error' },
  },

  computed: {
    formItemClass() {
      return [
        this.recls(),
        { 'cue-all': this.cueType === 'all' },
        { 'cue-only-error': this.cueType === 'only-error' },
        { 'cue-only-error-hover': this.cueType === 'only-error-hover' },
      ];
    },
  },
  render(h) {
    return (
      <el-form-item
        ref={this.recls()}
        class={this.formItemClass}
        prop={this.prop}
        label={this.label}
        label-width={this.labelWidth}
        required={this.required}
        error={this.error}
        show-message={this.showMessage}
        rules={this.rules}
      >
        {this.$slots.default}
        {this.$slots.label ? <span slot={'label'}> {this.$slots.label}</span> : null}
      </el-form-item>
    );
  },

  methods: {
    /**
     * @public
     * 对该表单项进行重置，将其值重置为初始值并移除校验结果
     */
    resetField: function() {
      this.$refs[this.recls()].resetField();
    },

    /**
     * @public
     * 移除该表单项的校验结果
     */
    clearValidate: function() {
      this.$refs[this.recls()].clearValidate();
    },
  },
});
