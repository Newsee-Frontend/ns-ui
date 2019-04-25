import create from '../../utils/create';
export default create({
  name: 'badge',
  data() {
    return {};
  },
  props: {
    value: [String, Number],
    //最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
    max:  { type: Number, default: 99},
    //小圆点
    isDot: { type: Boolean, default: false },
    //隐藏 badge
    hidden: { type: Boolean, default: false },
  },
  render(h) {
    return(
      <el-badge
        class={this.recls()}
        value={this.value}
        max={this.max}
        is-dot={this.isDot}
        hidden={this.hidden}
      >
        {this.$slots.default}
      </el-badge>
    )
  }
});
