import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import delayEvent from '../../utils/delay-event';
import create from '../../create/create';
import mixins from './mixins';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'select-tree',
  components: { Treeselect },
  mixins: mixins,
  data() {
    return {
      modelConsistsStore: 'BRANCH_PRIORITY',
    };
  },
  props: {
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸

    modelConsists: { type: String },
    sortModelBy: { type: String, default: 'ORDER_SELECTED' },//显示值/model值同步排序，"ORDER_SELECTED", "LEVEL" or "INDEX".
    flat: { type: Boolean, default: false },//平面模式，设置后，父子节点都可同步选择。
    defaultExpandLevel: { type: Number, default: 0 },//默认展开的层级，0 - 全部收齐，1-展开所有第一层级的几点

    /**
     * 是否禁止节点可以被选中（将其视为可折节点，类似于叠文件夹开关）
     * 一旦禁止之后 modelConsists 属性将会失效，应为几个父节点都失去了选中的功能
     */
    disableBranchNodes: { type: Boolean, default: false },


    isFuzzyMatching: { type: Boolean, default: true },//是否启用模糊查询（前端查询)
    flattenSearchResults: { type: Boolean, default: false },//扁平化的搜索结果，父子节点以扁平化的展示形式出现
    //Which keys of a node object to filter on.
    filterMatchKeys: {
      type: [String, Array], default() {
        return ['label'];
      },
    },


    noOptionsText: { type: String, default: 'No options available.' },
    noResultsText: { type: String, default: 'No results found...' },
    noChildrenText: { type: String, default: 'No child nodes' },


  },

  computed: {},

  watch: {
    modelConsists(val) {
      console.log('watch-modelConsists');
      console.log(val);
      this.modelConsistsStore = val;
    },
  },
  render(h) {
    return (
      <Treeselect
        value={this.childSelectTree}

        class={[this.recls([this.formsize])]}

        normalizer={this.normalizer}

        placeholder={this.placeholder}
        options={this.options}
        maxHeight={this.menuHeight}
        openDirection={this.menuOpenDirection}

        multiple={this.multiple}
        disabled={this.disabled}
        clearable={this.clearable}
        limit={this.limit}
        limitText={this.limitText}
        append-to-body={this.appendToBody}
        value-consists-of={this.modelConsistsStore}
        sort-value-by={this.sortModelBy}
        default-expand-level={this.defaultExpandLevel}
        flat={this.flat}
        disable-branch-nodes={this.disableBranchNodes}

        alwaysOpen={this.isMenuOpened}

        allowClearingDisabled={true}
        allowSelectingDisabledDescendants={true}


        disableFuzzyMatching={true}
        matchKeys={this.filterMatchKeys}
        flatten-search-results={this.flattenSearchResults}

        noOptionsText={this.noOptionsText}
        noResultsText={this.noResultsText}
        noChildrenText={this.noChildrenText}


        onInput={e => this.handleModelSelectTree(e)}
        on-select={this.select}
        on-deselect={this.deselect}
        on-open={this.menuOpen}
        on-close={this.menuClose}
        on-search-change={this.searchChange}

      >
      </Treeselect>
    );
  },


  methods: {
    /**
     * select tree select every node
     * @param value - current node information which is selected
     */
    select(value) {
      this.$emit('select', value);
    },
    /**
     * deselect tree select every node
     * @param value - current node information which is deselected
     */
    deselect(value) {
      this.$emit('deselect', value);
    },

    /**
     * menu open event
     */
    menuOpen() {
      this.$emit('menu-open');
    },
    /**
     * menu close event
     * @param value  - select model value
     */
    menuClose(value) {
      this.$emit('menu-close', value);
    },

    /**
     * search query changes - 查询条件改变
     * @param query - 查询条件
     */
    searchChange(query) {
      this.$emit('search-change', query);
    },

  },
  created() {

  },

  mounted() {
    delayEvent(
      this,
      _ => {
        this.modelConsistsStore = this.modelConsists;
      }, 0);
  },


});

