import create from '../../create/create-basic';

export default create({
  name: 'icon-svg',
  props: {
    // 唯一标识
    iconClass: {
      type: [String],
      required: true,
      default: '',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass ? this.iconClass : ''}`;
    },
  },
  render(h) {
    return (
      <svg class={this.recls()} ref={this.recls()} aria-hidden="true" on-click={this.click}>
        <use xlinkHref={this.iconName} />
      </svg>
    );
  },
  methods: {
    /**
     * 点击事件
     * @event click
     */
    click() {
      this.$emit('click');
    },
  },
});
