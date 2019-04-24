import config from '../config/config'

export default {
  computed: {
    formsize() {
      console.log(99999999);
      console.log(this)
      const size = this.$options.propsData && this.$options.propsData.size

      console.log(size);


      return size ? size : config.formsize;
    }
  }
};
