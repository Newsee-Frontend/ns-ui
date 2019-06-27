export default {
  data() {
    return {
      keyReferNomal: {
        id: 'id',
        children: 'children',
        title: 'title',
        disabled: 'disabled',
        isHasChild: 'isHasChild',
        expanded: 'expanded',
      },
    };
  },

  methods: {
    /**
     * 转化数组 为树节点
     * @param list 原始数据
     * @param config  配置节点 lazy（配置懒加载）, expandedIndex（默认展示层级）,expandAllNodes是否全部展开
     * @returns {*}  树节点数据
     */
    transformKeyFun(list = [], config = {}) {
      let keyRefer = Object.assign(this.keyReferNomal, this.keyRefer);
      list.forEach((item) => {
        //设置树对应的字段
        Object.keys(keyRefer).forEach(key => {
          let hitKey = keyRefer[key];
          this.$set(item, key, item[hitKey]);
        });

        if (
          (config.expandedIndex > 0 && !(config.lazy && item.isHasChild && item.children.length === 0))
          || config.expandAllNodes
        ) {
          this.$set(item, 'expanded', true);
        }
        else {
          this.$set(item, 'expanded', false);
        }


        if (item.children && item.children.length > 0) {
          if (config.expandedIndex> -1) config.expandedIndex--;
          this.transformKeyFun(item.children, config);
        }

        //树的懒加载
        else if (config.lazy && item.isHasChild) {
          this.$set(item, 'async', true);
        }
      });
      return list;
    },
  },
};
