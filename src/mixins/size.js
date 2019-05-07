import config from '../config/config';

export const size = {
  computed: {
    formsize() {
      const size = this.$options.propsData && this.$options.propsData.size;
      return size ? size : config.formsize;
    },
  },
};


export const width = {
  computed: {
    convert_width() {
      const width = this.$options.propsData && this.$options.propsData.width;
      console.log(33333333);
      console.log(this.$options.propsData);
      return width;
    },
  },
};

export const height = {
  computed: {
    convert_height() {
      return this.height || null;
    },
  },
};

