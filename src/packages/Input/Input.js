export default {
  name: 'input',
  props: {
    fatherIpt: [String, Number],
    width: {type: [String, Number], default: '200px'},
    height: {type: [String, Number], default: '32px'},
    name: {type: String, default: ''},
    type: {type: String, default: 'text'},
    placeholder: {type: String, default: null},
    size: {type: String, default: 'small'}, //高度size
    spec: {type: String}, //宽度size尺寸值（small，medium，normal，large,adapt）
    'prefix-icon': {type: String}, //输入框头部图标
    'suffix-icon': {type: String}, //输入框尾部图标
    customIcon: {type: String},
    rows: {type: Number, default: 3},
    minlength: {type: [Number, String]}, //最小输入长度
    maxlength: {type: [Number, String], default: 300}, //最大输入长度
    disabled: {type: Boolean, default: false},
    autofocus: {type: Boolean, default: false},
    readonly: {type: Boolean, default: false},
    clearable: {type: Boolean, default: false},
  },
  data() {
    return {
      childIpt: '',
      LimitLen: 300,
      sizeMap: {
        small: '90px',
        medium: '120px',
        normal: '200px',
        large: '400px',
        adapt: '100%',
        customMade: '340px',
        max: '758px',
      },
    };
  },
  computed: {
    input_width() {
      /*
          有 spec 属性则采用 spec 的值所对应的宽度作为宽度值， 否则采用 width 属性值。
          如果spec有值，请注意值是否正确（small，medium，normal，large），可以为 null。
         */
      if (this.spec) {
        return this.sizeMap[this.spec];
      }

      return this.width;
    },
    input_height() {
      alert(this.height)
      return this.height;
    },
    maxlen() {
      return this.maxlength ? parseInt(this.maxlength) : this.LimitLen;
    },
  },

  render(h) {

  },

  watch: {
    childIpt() {
      this.$emit('input', this.childIpt);
    },
    fatherIpt() {
      this.childIpt = this.fatherIpt;
    },
  },

  model: {
    prop: 'fatherIpt',
    event: 'input',
  },

  created() {
    this.childIpt = this.fatherIpt;
  },

  methods: {
    /**
     * change
     * @param value
     */
    change(value) {
      this.$emit('change', value);
    },
    /**
     * blur
     * @param value
     */
    blur(value) {
      this.$emit('blur', value);
    },
    /**
     * focus
     * @param value
     */
    focus(value) {
      this.$emit('focus', value);
    },
    /**
     * icon-click
     * @param value
     */
    iconClick(value) {
      this.$emit('iconClick', value);
    },
  },
};
