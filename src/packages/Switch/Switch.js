import create from '../../create/create';

export default create({
  name: 'switch',

  data() {
    return {
      childSwitch: this.value,
    };
  },
  props: {
    /**
     * 绑定值
     */
    value: [Boolean, String, Number],

    /**
     * switch 的宽度（像素）
     */
    switchWidth: { type: Number },

    width: { type: [String, Number], default: '100%' },

    height: { type: [String, Number], default: '32px' },

    /**
     * switch 打开时的文字描述
     */
    activeText: { type: String, default: '' },

    /**
     * switch 关闭时的文字描述
     */
    inactiveText: { type: String, default: '' },

    /**
     * switch 打开时的背景色
     */
    activeColor: { type: String, default: '#20A0FF' },

    /**
     * switch 关闭时的背景色
     */
    inactiveColor: { type: String, default: '#C0CCDA' },

    /**
     * switch 打开时的值
     */
    activeValue: { type: [Boolean, String, Number], default: true },

    /**
     * switch 关闭时的值
     */
    inactiveValue: { type: [Boolean, String, Number], default: false },

    /**
     * switch 打开时所显示图标的类名，设置此项会忽略 active-text
     */
    activeIconClass: { type: String, default: null },

    /**
     * switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text
     */
    inactiveIconClass: { type: String, default: null },

    /**
     * 是否禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * switch 对应的 name 属性
     */
    name: { type: String, default: '' },
  },

  watch: {
    value(val) {
      this.childSwitch = val;
    },
  },

  render(h) {
    return (
      <el-switch
        class={this.recls()}
        style={{ width: this.convert_width, height: this.convert_height }}
        value={this.childSwitch}
        onInput={e => this.handleModel(e)}
        onChange={this.change}
        activeText={this.activeText}
        inactiveText={this.inactiveText}
        activeColor={this.activeColor}
        inactiveColor={this.inactiveColor}
        activeValue={this.activeValue}
        inactiveValue={this.inactiveValue}
        activeIconClass={this.activeIconClass}
        inactiveIconClass={this.inactiveIconClass}
        width={this.switchWidth}
        disabled={this.disabled}
        name={this.name}
      ></el-switch>
    );
  },

  methods: {
    handleModel: function(e) {
      this.childSwitch = e;
      this.$emit('input', this.childSwitch);
    },

    change: function(val) {
      /**
       * switch 状态发生变化时的回调函数
       * @event change
       * @property { Boolean } val  新状态的值
       */
      this.$emit('change', val);
    },
  },
});
