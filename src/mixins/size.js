import config from '../config/config';
import convertunits from '../utils/from/convertunits';


export const size = {
  computed: {
    formsize() {
      const size = this.$options.propsData && this.$options.propsData.size;
      /**
       * size use to judge exist or not, but not use to computed formsize，
       * and use size can not data linkage，should use this.size replace.
       */
      return size ? this.size : config.formsize;
    },
  },
};


export const width = {
  computed: {
    convert_width() {
      const width = this.$options.propsData && this.$options.propsData.width;
      return width ? convertunits(width || this.width) : undefined;
    },
  },
};

export const height = {
  computed: {
    convert_height() {
      const height = this.$options.propsData && this.$options.propsData.height;
      return height ? convertunits(height || this.height) : undefined;
    },
  },
};

