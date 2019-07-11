import create from '../../create/create';

export default create({
  name: 'loading-block',

  data() {
    return {};
  },
  props: {
    simple: { type: Boolean, default: false },
  },
  render(h) {
    return (
      <div class={this.recls()}>
        {
          !this.simple ?

            <div class={this.recls('content')}>

              {
                this.$slots.default ?
                  this.$slots.default :
                  <div class={'loading-img'}/>
              }
            </div>
            : null
        }
      </div>
    );
  },
});
