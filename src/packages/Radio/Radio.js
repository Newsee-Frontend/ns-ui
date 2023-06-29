import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'radio',

  data() {
    return {
      childRadio: this.value,
    };
  },
  props: {
    /**
     * 绑定值
     */
    value: [String, Number, Boolean],

    /**
     * 宽度
     */
    width: [String, Number],

    /**
     * 选择项
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * 按钮样式
     * @values 'normal','button'
     */
    type: { type: String, default: 'normal' }, 

    /**
     * 尺寸
     * @values 'mini', 'small', 'normal', 'medium', 'large'
     */
    size: { type: String, validator: s => sizeValidator(s) },

    /**
     * 按钮：背景颜色
     */
    fill: { type: String, default: '#20a0ff' },

    /**
     * 按钮：字体颜色
     */
    textColor: { type: String, default: '#ffffff' },

    /**
     * 是否禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 选择项映射
     */
    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },
    
    /**
     * 单选框组
     */
    isGroup: { type: Boolean, default: true },

    /**
     * 非单选框组 Radio 的 value
     */
    label: [String, Number, Boolean],
  },

  computed: {},

  watch: {
    value(val) {
      this.childRadio = val;
    },
  },

  render(h) {
    const radioDom = item => {
      return h(
        this.type === 'button' ? `el-radio-button` : `el-radio`,
        {
          props: {
            label: item[this.keyRefer.value],
            key: item[this.keyRefer.value],
            disabled: item[this.keyRefer.disabled],
          },
        },
        item[this.keyRefer.label]
      );
    };

    const radioGroup = (
      <el-radio-group
        class={this.recls()}
        value={this.childRadio}
        onInput={e => this.handlemodel(e)}
        disabled={this.disabled}
        fill={this.fill}
        textColor={this.textColor}
        style={{ width: this.convert_width }}
        on-change={this.change}
      >
        {this.options.map(item => radioDom(item))}
      </el-radio-group>
    );

    const radioSingle = (
      <el-radio
        class={`${this.recls()} ${this.recls('single')}`}
        value={this.childRadio}
        onInput={e => this.handlemodel(e)}
        onChange={this.change}
        label={this.label}
        disabled={this.disabled}
      >
        {this.$slots.default}
      </el-radio>
    );

    return this.isGroup ? radioGroup : radioSingle;
  },

  methods: {
    handlemodel(e) {
      this.childRadio = e;
      this.$emit('input', this.childRadio);
    },
    change(value) {
      /**
       * 当绑定值变化时触发的事件
       * @property {String} value  -更新后的值
       */
      this.$emit('change', value);
    },
  },
});
