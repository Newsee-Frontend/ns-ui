import config from '../config/config';

export default {
  computed: {
    formsize() {
      const size = this.$options.propsData && this.$options.propsData.size;
      return size ? size : config.formsize;
    },
  },
};
