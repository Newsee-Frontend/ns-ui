import create from '../../utils/create';

export default create({
  name: 'header',
  render(h) {
    return (
      <div class={`${this.recls()} clear`}>
        {
          this.$slots.default
        }
      </div>
    );
  },
});


