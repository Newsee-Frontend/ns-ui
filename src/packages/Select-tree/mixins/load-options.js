import { LOAD_ROOT_OPTIONS, LOAD_CHILDREN_OPTIONS, ASYNC_SEARCH } from '@riophae/vue-treeselect';

export default {
  props: {

    autoLoadRootOptions: { type: Boolean, default: true },//装载时自动加载options。当设置为false时，打开菜单时加载options。
    async: { type: Boolean, default: false },//Whether to enable async search mode.
  },

  methods: {
    loadOptions({ action, parentNode, searchQuery, callback }) {
      console.log('loadOptions');
      console.log(action);
      if (action === LOAD_ROOT_OPTIONS) {
        this.$emit('load-root-options', { callback });
      }
      else if (action === LOAD_CHILDREN_OPTIONS) {
        this.$emit('load-children-options', { parentNode, callback });
      }
      else if (action === ASYNC_SEARCH) {
        this.$emit('async-search', { searchQuery, callback });
      }
    },
  },
};
