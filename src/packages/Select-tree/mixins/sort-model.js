const sortMap = {
  order: 'ORDER_SELECTED', //按照选择的顺序
  level: 'LEVEL', //按照层级排序，如A，B，A-1，B-1。A-1-1，B-1-1
  index: 'INDEX', //按照各节点级顺序，如A，A-1，A-1-1，B，B-1，B-1-1
};

/**
 * model / value sort - 显示排序
 * 可选值："order", "level" or "index".
 */
export default {
  props: {
    sortModelBy: {
      type: String,
      default: 'order',
      validator: s => {
        return sortMap.hasOwnProperty(s);
      },
    },
  },
  computed: {
    reSortModelBy() {
      return sortMap[this.sortModelBy];
    },
  },
};
