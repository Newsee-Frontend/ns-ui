import defaultKeyRefer from '../keyRefer';

/**
 * key refer => normalizer
 */
export default {
  props: {
    keyRefer: {
      type: Object, default() {
        return defaultKeyRefer;
      },
    },
  },
  computed: {
    normalizer() {
      return (node) => {
        let obj = {};
        Object.keys(this.keyRefer).forEach(k => {
          obj[k] = node[this.keyRefer[k]];

        });
        return obj;
      };
    },
  },
};
