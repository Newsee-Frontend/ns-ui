import Input from '../../Input/Input';

export default {
  name: 'testContent',
  components: { Input },
  props: {
    value: [Object],
    value2: [String],
  },
  data() {
    return {
      childInterval: this.value,
    };
  },
  watch: {
    value(val) {
      this.childInterval = val;
    },
  },

  render(h) {
    const xxx = () => {
      return h('Input', {
        domProps: {
          value: this.childInterval.ipt,
        },
        on: {
          input: event => {
            // this.$emit('input', event.target.value);
            this.childInterval.ipt = event;
          },
        },
      });
    };

    return (
      <div
        value={this.childInterval}
        onInput={e => {
          // console.log(1111111);
          // console.log(e);
          // console.log(this.childInterval);
          // this.childInterval = e;
          // this.$emit('input', this.childInterval);
        }}
      >
        {xxx()}
      </div>
    );
  }
};
