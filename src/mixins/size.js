import config from '../config/config';
import convertunits from '../utils/from/convertunits';


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
      return width ? convertunits(width) : undefined;
    },
  },
};

export const height = {
  computed: {
    convert_height() {
      const height = this.$options.propsData && this.$options.propsData.height;
      return height ? convertunits(height) : undefined;
    },
  },
};

