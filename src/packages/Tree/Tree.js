import create from '../../create/create';
import VTree from './components/tree';

export default create({
  name: 'tree',
  components: {
    VTree,
  },

  data() {
    return {};
  },
  props: {
    //树节点信息
    treeModel: {
      type: Array,
      default: () => [],
    },

    //normalModel, 目前单选
    value: {
      type: [String, Number],
    },

    //show checkbox
    showCheckbox: {
      type: Boolean,
      default: false,
    },

    //是否是多选
    multiple: {
      type: Boolean,
      default: false,
    },
    isObj: { type: Boolean },  //指代属性


    modelFormat: {
      type: String,
      default: 'key',
    },

    //是否可拖拉
    draggable: {
      type: Boolean,
      default: false,
    },

    //节点是否允许被放在节点下
    dropJudge: {
      type: Function,
    },

    //checkbox 的情况下，在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    checkStrictly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    SelectList() {
      if (this.isObj) {
        return this.multiple ? this.value.map(item => item.id) : this.value.id;
      }
      else {
        return this.multiple ? this.value.map(item => id) : this.value;
      }

    },

  },

  watch: {
    SelectList: {
      handler(newVal, oldval) {
        this.$nextTick(() => {
          this.$refs.tree.nodeSelected(newVal);
        });
      },
      deep: true,
    },
    value(val) {
      if (val) {
        this.$nextTick(() => {
          //set selectData
          this.nodeSelectedByKey([val]);
          this.$refs.tree.nodeSelected(nodes[0]);
        });
      }
    },
  },


  render(h) {
    const tpl = function(node, parent, index) {
      return h(
        'div',
        {},
        this.$scopedSlots.default ? this.$scopedSlots.default({ node, parent, index }) : node.title,
      );
    };
    return (
      <div class={[this.recls(), this.showCheckbox ? this.recls('multiple') : {}]}>
        <v-tree
          ref="tree"
          data={this.treeModel}
          halfcheck={!this.checkStrictly}
          scoped={this.checkStrictly}
          draggable={this.draggable}
          dropJudge={this.dropJudge}
          tpl={tpl.bind(this)}
          multiple={this.showCheckbox}
          radio={!this.multiple}
          onAsync-load-nodes={this.asyncLoad}
          onNode-click={this.nodeClick}
          onNode-check={this.nodeCheck}
          onNode-expand={this.nodeExpand}
        />
      </div>
    );
  },

  methods: {
    //单选情况，手动set select的值(组件中保存了一个上一次前一次选中的node值)
    setRadioValue() {
      let selectNodes = this.$refs.tree.getNodes({ selected: true }, this.treeModel, true);
      if (selectNodes.length === 1) {
        this.$refs.tree.setNodeAttr(selectNodes[0], 'selected', false);
        this.$refs.tree.nodeSelected(selectNodes[0]);
      }
    },

    //异步加载
    asyncLoad(...arg) {
      this.$emit('loadNode', ...arg);
    },

    /**
     * model data to filter change
     * @param nodeList
     * @returns {*}
     */
    modelFilter(nodeList) {
      if (this.multiple) {
        if (this.allinfo) {
          return selectNodes;
        }
        else {
          return modelData.map(obj => obj[this.modelFormat]);
        }
      }
      else {
        //点击 节点 是否 同步  checkbox 的状态
        if (2) {
          return selectNodes[0][this.modelFormat];
        }
        else {

        }

      }
    },


    //node 点击 (node, selected, position, parent)
    nodeClick(...arg) {
      let selectNodes = this.getSelectedNodes();

      // let id = selectNodes.length > 0 ? selectNodes[0].id : '';

      // get model data
      const modelData = modelFilter(selectNodes);

      this.$emit('input', modelData);

      //node click是否有点击的位置，有点击位置，则外传node-click
      if (arg[2]) {
        this.$emit('nodeClick', ...arg);
      }
    },

    //node check
    nodeCheck(...arg) {
      if (this.multiple) {

        let selectNodes = this.getSelectedNodes();
        // get model data
        const modelData = modelFilter(selectNodes);

        this.$emit('nodeCheck', ...arg);
      }

    },

    //node 展开
    nodeExpand(...arg) {
      this.$emit('nodeExpand', ...arg);
    },

    /**
     * 外暴方法，增加nodes
     * @param node 当前的节点
     * @param children 增加的子节点
     */
    addNodes: function(node, children) {
      this.$refs.tree.addNodes(node, children);
    },

    /**
     * 外暴方法，删除节点
     */
    delNode: function(...arg) {
      this.$refs.tree.delNode(...arg);
    },

    /**
     * 外暴方法，更新节点（主要更新文字的操作）
     */
    updateNode: function(node, updateObj) {
      if (updateObj) {
        Object.assign(node, updateObj);
      }
    },

    /**
     * 外暴方法，自定义select node
     */
    nodeSelectedByKey: function(ids) {
      if (ids instanceof Array) {
        ids.forEach((id) => {
          let nodes = this.$refs.tree.getNodes({ id: id }, this.list, true);
          nodes.length > 0 && (this.$refs.tree.nodeSelected(nodes[0]));
        });
      }
    },

    /**
     * 外暴方法，获取所选的节点
     */
    getSelectedNodes: function() {
      return this.$refs.tree.getSelectedNodes();
    },

    /**
     * 外暴方法，获取check节点
     */
    getCheckedNodes: function() {
      return this.$refs.tree.getCheckedNodes();
    },

  },

  created() {
    if (!this.multiple) {

      //store 数据获取
      this.$nextTick(() => {
        this.setRadioValue();
      });
    }
  },
});
