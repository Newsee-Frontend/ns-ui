import create from '../../create/create';

export default create({
  name: 'header',
  render(h) {
    return h(
      'div',
      {
        class: `${this.recls()} clear`,
        attrs: {
          id: 'Header',
        },
      },
      this.$slots.default
    );
  },
});
