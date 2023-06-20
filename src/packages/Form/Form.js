import create from '../../create/create';

export default create({
  name: 'form',
  props: {
    /**
     * 表单数据对象
     */
    model: { type: Object },

    /**
     * 表单验证规则
     */
    rules: { type: Object },

    /**
     * 行内表单模式
     */
    inline: { type: Boolean, default: false },

    /**
     * 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
     */
    'label-position': { type: String, default: 'right' },

    /**
     * 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
     */
    'label-width': { type: String },

    /**
     * 表单域标签的后缀
     */
    'label-suffix': { type: String },

    /**
     * 是否显示校验错误信息
     */
    'show-message': { type: Boolean, default: true },

    cueType: { type: String, default: 'only-error' },

    /**
     * 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
     */
    disabled: { type: Boolean, default: false },
  },
  computed: {
    fromClass() {
      return this.recls();
    },
  },
  render(h) {
    return h(
      'el-form',
      {
        ref: this.fromClass,
        class: this.fromClass,
        props: {
          model: this.model,
          rules: this.rules,
          inline: this.inline,
          disabled: this.disabled,
          'label-position': this.labelPosition,
          'label-width': this.labelWidth,
          'label-suffix': this.labelSuffix,
          'show-message': this.showMessage,
        },
      },
      this.$slots.default
    );
  },
  methods: {
    /**
     * @public
     * 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用
     * @param {Function} cb 
     */
    validate: function(cb) {
      this.$refs[this.fromClass].validate(cb);
    },

    /**
     * @public
     * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
     */
    resetFields: function() {
      this.$refs[this.fromClass].resetFields();
    },

    /**
     * @public
     * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     */
    clearValidate: function(props) {
      this.$refs[this.fromClass].clearValidate(props);
    },
  },
});
