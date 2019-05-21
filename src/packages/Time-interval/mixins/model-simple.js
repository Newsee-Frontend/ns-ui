export default {
  methods: {
    valueMethods(key) {
      return this.childInterval[this.keyRefer[key]];
    },
    inputMethods(val, key) {
      this.childInterval[this.keyRefer[key]] = val;
    },
  },
};
