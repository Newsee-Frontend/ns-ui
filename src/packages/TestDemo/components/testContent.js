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
      console.log('watch');
      console.log(val);
      this.childInterval = val;
    },
  },

  render(h) {

    const xxx = () => {
      return h('Input', {
        domProps: {
          value2: this.childInterval.ipt,
        },
        on: {
          input: (event) => {
            console.log(2222222)
            console.log(event);
            // this.$emit('input', event.target.value);
            this.$emit('input', event);
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
        }
        }
      >
        {
          xxx()
        }
      </div>
    );
  },
  methods: {},
  created() {
  },
};
