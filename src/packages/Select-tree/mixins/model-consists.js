import delayEvent from '../../../utils/delay-event';


const modelConsistsMap = {
  'all': 'ALL',//选中的任何节点都将包含在值数组中，但是不包含半选中节点
  'branch-first': 'BRANCH_PRIORITY',//分支优先级”（默认）- 如果选中父级分支节点，则其所有子节点都将排除在值数组中。
  'leaf-first': 'LEAF_PRIORITY',//如果选中父级分支节点，其父节点本身将被排除在外，则其所有子节点都将包含在值数组中
  'all-with-indeterminate': 'ALL_WITH_INDETERMINATE',//任何被检查的节点都将包含在值数组中，包括不确定的节点
};


/**
 * model consists - model
 * contents contained in model - 切换可选择多种模式来确定model 以及 value 展示 的内容形态
 */
export default {
  props: {
    modelConsists: {
      type: String, default: 'branch-first', validator: m => {
        return modelConsistsMap.hasOwnProperty(m);
      },
    },
  },
  data() {
    return {
      modelConsistsStore: 'BRANCH_PRIORITY',
    };
  },
  watch: {
    modelConsists(val) {
      console.log('watch-modelConsists');
      console.log(val);
      this.modelConsistsStore = modelConsistsMap[val];
    },
  },
  mounted() {
    delayEvent(
      this,
      _ => {
        this.modelConsistsStore = modelConsistsMap[this.modelConsists];
      }, 0);
  },
};
