import create from '../../utils/create-basic';

export default create({
  name: 'icon-svg',
  props: {
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
      <svg
        class={this.recls()}
        ref={this.recls()}
        aria-hidden="true"
        on-click={this.click}>
        <use xlinkHref={this.iconName}/>
      </svg>
    );
  },
  methods: {
    click() {
      this.$emit('click');
    },
  },
});


