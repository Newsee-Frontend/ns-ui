import create from '../../create/create';
import Dialog from '../Dialog/Dialog';

export default create({
  name: 'form-item',
  props: {
    prop: { type: String },
    label: { type: [Number, String] },
    'label-width': { type: String },
    required: { type: Boolean, default: false },
    rules: { type: [String, Object, Array], default: null },
    type: { type: String, default: 'string' },
    requireMsg: { type: String, default: null },
    trigger: { type: String, default: 'blur' },
    error: { type: String },
    'show-message': { type: Boolean, default: true },
    /*
       cueType - 表单验证提示展现类型
       1、all:（包含错误错误和正确的展现)
       2、only-error:（只有错误的展现）
       3、only-error-hover:（只有错误的展现，且鼠标移入展现错误提示)
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
        {this.$slots.label?  <span slot={'label'} > {this.$slots.label}</span> : null }
      </el-form-item>
    );
  },

  methods: {
    resetField: function() {
      this.$refs[this.recls()].resetField();
    },

    clearValidate: function() {
      this.$refs[this.recls()].clearValidate();
    },
  },
});
