import create from '../../create/create';

export default create({
  props: {
    model: { type: Object },
    rules: { type: Object },
    inline: { type: Boolean, default: false },
    'label-position': { type: String, default: 'right' },
    'label-width': { type: String },
    'label-suffix': { type: String },
    'show-message': { type: Boolean, default: true },
    cueType: { type: String, default: 'only-error' },
  },
  created() {
  },
  render(h) {
    return (
      <el-form
        class={'ns-form'}
        ref={'form'}
        model={this.model}
        rules={this.rules}
        inline={this.inline}
        label-position={this.labelPosition}
        label-width={this.labelWidth}
        label-suffix={this.labelSuffix}
        show-message={this.showMessage}
      >
        <slot></slot>
      </el-form>
    );
  },
  methods: {
    //校验
    validate: function(cb) {
      this.$refs.form.validate(cb);
    },

    //重置
    resetFields: function() {
      this.$refs.form.resetFields();
    },

    //清除校验结果
    clearValidate: function() {
      this.$refs.form.clearValidate();
    },
  },
});

