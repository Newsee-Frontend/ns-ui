import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'button',
  data() {
    return {};
  },

  props: {
    //尺寸可选 medium,small,mini
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },
    type: { type: String }, //类型 primary,success,warning,danger,info,text
    plain: { type: Boolean, default: false }, //是否朴素按钮
    round: { type: Boolean, default: false }, //是否为原型按钮
    loading: { type: Boolean, default: false }, //是否加载中状态
    disabled: { type: Boolean, default: false }, //是否禁用状态
    icon: { type: String }, //图标，已有的图标库中的图标名
    autofocus: { type: Boolean, default: false }, //是否默认聚焦
    'native-type': { type: String, default: 'button' }, //原生 type 属性  button,submit,reset
    circle: { type: Boolean, default: false }, //尺寸 是否为圆形
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
      this.$emit('click');
    },
  },
});
