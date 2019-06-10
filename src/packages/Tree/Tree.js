import create from '../../create/create';
import VTree from './components/tree'
import transformNodes from './mixins/transformNodes.js'
export default create({
  name: 'tree',
  components: {
    VTree
  },
  mixins: [transformNodes],

  data() {
    return {
      list: []
    }
  },
  props: {
    //是否懒加载
    lazy: {
      type: Boolean,
      default: false
    },

    //show checkbox
    showCheckbox: {
      type: Boolean,
      default: false
    },

    //是否是多选
    multiple: {
      type: Boolean,
      default: false
    },

    //是否全部展开所有的节点
    expandAllNodes: {
      type: Boolean,
      default: false
    },

    //是否可拖拉
    draggable: {
      type: Boolean,
      default: false
    },

    //节点是否允许被放在节点下
    dropJudge: {
      type: Function
    },

    //checkbox 的情况下，在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    checkStrictly: {
      type: Boolean,
      default: false
    }


  },
  computed: {},

  watch: {},


  render(h) {
    const tpl = function(node, parent, index){
      return h(
        'div',
        {},
        this.$scopedSlots.default? this.$scopedSlots.default({node, parent, index}) :  node[this.keyRefer.title]
        )
    };

    return(
      <div class={[this.recls(), this.showCheckbox? this.recls('multiple'): {}]}>
        <v-tree
          ref="tree"
          data={this.list}
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
    )
  },

  methods: {
    //初始化树节点
    initTree(list, expandLevel){
      if(list instanceof Array){
        this.list = this.transformKeyFun(list, expandLevel);
      }else{
        throw 'the function initTree, argument must be Array'
      }
    },

    //异步加载
    asyncLoad(...arg){
      this.$emit('loadNode', ...arg);
    },

    //node 点击
    nodeClick(...arg){
      this.$emit('nodeClick',...arg)
    },

    //node check
    nodeCheck(...arg){
      this.$emit('nodeCheck',...arg)
    },

    //node 展开
    nodeExpand(...arg){
      this.$emit('nodeExpand',...arg)
    },

    /**
     * 外暴方法，增加nodes
     * @param node 当前的节点
     * @param children 增加的子节点
     */
    addNodes: function(node, children){
      this.transformKeyFun(children);
      this.$refs.tree.addNodes(node, children)
    },

    /**
     * 外暴方法，删除节点
     */
    delNode: function(...arg){
      this.$refs.tree.delNode(...arg);
    },

    /**
     * 外暴方法，更新节点（主要更新文字的操作）
     */
    updateNode: function(node, updateObj){
      if(updateObj){
        Object.assign(node,updateObj)
      }
    },

    /**
     * 外暴方法，自定义select node
     */
    nodeSelectedByKey: function(ids){
      if(ids instanceof Array){
        ids.forEach((id) => {
          let nodes = this.$refs.tree.getNodes({id: id}, this.list, true);
          nodes.length > 0 && (this.$refs.tree.nodeSelected(nodes[0]));
        })
      }
    },

    /**
     * 外暴方法，获取所选的节点
     */
    getSelectedNodes: function(){
      return this.$refs.tree.getSelectedNodes()
    },

    /**
     * 外暴方法，获取check节点
     */
    getCheckedNodes: function(){
      return this.$refs.tree.getCheckedNodes()
    }

  }
});
