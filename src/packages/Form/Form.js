import create from '../../create/create';

export default create({
  name: 'form',
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
  computed: {
    fromClass() {
      return this.recls();
    },
  },
  render(h) {
    return (
      h(
        'el-form',
        {
          ref: this.fromClass,
          'class': this.fromClass,
          props: {
            model: this.model,
            rules: this.rules,
            inline: this.inline,
            'label-position': this.labelPosition,
            'label-width': this.labelWidth,
            'label-suffix': this.labelSuffix,
            'show-message': this.showMessage,
          },
        },
        this.$slots.default,
      )
    );
  },
  methods: {
    /**
     * validate
     * @param cb
     */
    validate: function(cb) {
      this.$refs[this.fromClass].validate(cb);
    },

    resetFields: function() {
      this.$refs[this.fromClass].resetFields();
    },

    clearValidate: function() {
      this.$refs[this.fromClass].clearValidate();
    },
  },
});

