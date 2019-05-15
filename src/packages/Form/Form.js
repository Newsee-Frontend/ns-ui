import create from '../../create/create';

export default create({
  name: 'form',

  data() {
    return {

    };
  },
  props: {
    model: { type: Object },
    rules: { type: Object },
    inline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    'label-position': { type: String, default: 'right' },
    'label-width': { type: String },
    'label-suffix': { type: String },
    'show-message': { type: Boolean, default: true },
    cueType: {type: String, default: 'only-error'},
  },

  computed: {},

  watch: {},

  render(h) {
    return(
      <el-form
        className={this.recls()}
        ref="form"
        size={this.size}
        model={this.model}
        rules={this.rules}
        inline={this.inline}
        disabled={this.disabled}
        label-position={this.labelPosition}
        label-width={this.labelWidth}
        label-suffix={this.labelSuffix}
        show-message={this.showMessage}
      >
        {
          this.$slots.default
        }
      </el-form>
    )
  },

  methods: {
    //校验
    validate: function(cb){
      this.$refs.form.validate(cb)
    },

    //重置
    resetFields: function() {
      this.$refs.form.resetFields()
    },

    //清除校验结果
    clearValidate: function(){
      this.$refs.form.clearValidate()
    }
  },

  mounted() {
  },
});
