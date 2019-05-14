
/**
 * mode value - two way binding
 */
export default {
  props: {
    value: [String, Number, Array, Object],
  },
  data() {
    return {
      childSelectTree: this.value,
    };
  },
  watch: {
    value(val) {
      console.log('watch-value');
      console.log(val);
      this.childSelectTree = val;
    },
  },
  methods: {
    handleModelSelectTree(e) {
      this.childIpt = e;
      this.$emit('input', this.childIpt);
    },
  },
};
