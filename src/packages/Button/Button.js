import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'button',
  data() {
    return {};
  },

  props: {
    /**
     * 尺寸
     * @values medium / small / mini
     */
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },

    /**
     * 类型
     * @values primary / success / warning / danger / info / text
     */
    type: { type: String },

    /**
     * 是否朴素按钮
     */
    plain: { type: Boolean, default: false },

    /**
     * 是否圆角按钮
     */
    round: { type: Boolean, default: false },

    /**
     * 是否圆形按钮
     */
    circle: { type: Boolean, default: false },

    /**
     * 是否加载中状态
     */
    loading: { type: Boolean, default: false },

    /**
     * 是否禁用状态
     */
    disabled: { type: Boolean, default: false },

    /**
     * 图标，已有的图标库中的图标名
     */
    icon: { type: String },

    /**
     * 是否默认聚焦
     */
    autofocus: { type: Boolean, default: false },

    /**
     * 原生 type 属性
     * @values button / submit / reset
     */

    'native-type': { type: String, default: 'button' }, //原生 type 属性  button,submit,reset
  },

  render(h) {
    return (
      <el-button
        class={this.recls([this.formsize])}
        type={this.type}
        plain={this.plain}
        round={this.round}
        loading={this.loading}
        disabled={this.disabled}
        icon={this.icon}
        autofocus={this.autofocus}
        native-type={this.nativeType}
        circle={this.circle}
        on-click={this.click}
      >
        {
          this.$slots.default
        }
      </el-button>
    );
  },

  methods: {
    click() {
      /**
       * 点击事件
       * @event click
       */
      this.$emit('click');
    },
  },
});
