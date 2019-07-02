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
    data: {
      type: Array,
      default: () => [],
    },

    //normalModel, 目前单选
    value: {
      type: [String, Number, Object, Array],
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

    isObjectData: {
      type: Boolean,
      default: false
    },  //指代属性, v-model 是否是id还是node节点

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

  watch: {
    value: {
      handler(newVal, oldVal) {
        //只支持初始化时
        if(Object.keys(oldVal || '').length) return
        this.$nextTick(()=>{
          if(newVal instanceof Array){
            newVal.forEach(item => this.nodeSelected(item))
          }else{
            this.nodeSelected(newVal);
          }
        });
      },
      deep: true,
    }
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
          data={this.data}
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
      this.$nextTick(()=>{
        let selectNodes = this.$refs.tree.getNodes({ selected: true }, this.data, true);
        if (selectNodes.length > 0) {
          this.$refs.tree.setNodeAttr(selectNodes[0], 'selected', false);
          this.$refs.tree.nodeSelected(selectNodes[0]);
        }
      });
    },

    //异步加载
    asyncLoad(...arg) {
      this.$emit('loadNode', ...arg);
    },


    //node 点击 (node, selected, position, parent)
    nodeClick(...arg) {
      let selectNodes = this.getSelectedNodes();
      let modelData;
      if(this.isObjectData){
        modelData = this.multiple? selectNodes: selectNodes[0]
      }else{
        let ids = selectNodes.map(item => item.id);
        modelData = this.multiple? ids : ids[0]
      }

      this.$emit('input', modelData);

      //node click是否有点击的位置，有点击位置，则外传node-click
      if (arg[2]) {
        this.$emit('nodeClick', ...arg);
      }
    },

    //node check
    nodeCheck(...arg) {
      this.$emit('nodeCheck', ...arg);
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

    //选中节点
    nodeSelected: function(data){
      if(this.isObjectData){
        this.$refs.tree.nodeSelected(data)
      }else{
        let nodes = this.$refs.tree.getNodes({ id: data }, this.data, true);
        nodes.length > 0 && (this.$refs.tree.nodeSelected(nodes[0]));
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
      // store 数据获取
      this.setRadioValue();
    }
  },
});
