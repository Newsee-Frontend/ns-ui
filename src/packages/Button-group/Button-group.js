import create from '../../create/create';

export default create({
  name: 'button-group',
  render(h) {
    return <el-button-group class={this.recls()}>{this.$slots.default}</el-button-group>;
  },
});
