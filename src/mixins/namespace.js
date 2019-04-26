import config from '../config/config';

export default {
  computed: {
    namespace() {
      return `${config.namespace}${config.separator}`;
    },
  },
};
