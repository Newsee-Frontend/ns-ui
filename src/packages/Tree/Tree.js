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
    return {};
  },
  props: {

    //节点数组
    data: {
      type: Array,
      default: []
    },

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

    //初始化的时候， 是否全部展开所有的节点
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
      <div class={this.recls()}>
        <v-tree
          ref="tree"
          data={this.data}
          halfcheck
          draggable={this.draggable}
          dropJudge={this.dropJudge}
          tpl={tpl.bind(this)}
          multiple={this.showCheckbox}
          radio={!this.multiple}
          onAsync-load-nodes={this.asyncLoad}
          onNode-click={this.nodeClick}
        />
      </div>
    )
  },

  methods: {
    //异步加载
    asyncLoad(...arg){
      this.$emit('loadNode', ...arg);
    },

    //node 点击
    nodeClick(...arg){
      this.$emit('nodeClick',...arg)
    },

    /**
     * 增加nodes
     * @param node 当前的节点
     * @param children 增加的子节点
     */
    addNodes: function(node, children){
      this.transformKeyFun(children);
      this.$refs.tree.addNodes(node, children)
    },

    /**
     * 删除节点
     */
    delNode: function(...arg){
      this.$refs.tree.delNode(...arg);
    },

    /**
     * 自定义select node
     */
    nodeSelected: function(node){
      this.$refs.tree.nodeSelected(node);
    },

    /**
     * 获取所选的节点
     */
    getSelectedNodes: function(){
      return this.$refs.tree.getSelectedNodes()
    }
  },

  created() {

  },

  mounted() {
  },
});
