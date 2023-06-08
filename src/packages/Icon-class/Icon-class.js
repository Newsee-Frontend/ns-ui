import create from '../../create/create-basic';

export default create({
  name: 'icon-class',
  props: {
    // 唯一标识
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
    return <i class={`${this.recls()} ${this.iconName}`} on-click={this.click} />;
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
