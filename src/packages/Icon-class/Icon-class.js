import create from '../../create/create-basic';

export default create({
  name: 'icon-class',
  props: {
    iconClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return this.iconClass.indexOf('el-icon-') === 0
        ? this.iconClass
        : `iconfont icon-${this.iconClass}`;
    },
  },
  render(h) {
    return (
      <i
        class={`${this.recls()} ${this.iconName}`}
        on-click={this.click}/>
    );
  },
  methods: {
    //click时触发的事件
    click() {
      this.$emit('click');
    },
  },
});
