import Treeselect from '@riophae/vue-treeselect';
import create from '../../create/create';
import mixins from './mixins';
import { sizeValidator } from '../../utils/props/validator';


export default create({
  name: 'select-tree',
  components: { Treeselect },
  mixins: mixins,
  data() {
    return {};
  },
  props: {
    size: { type: String, validator: s => sizeValidator(s) }, //尺寸
    flat: { type: Boolean, default: false },//平面模式，设置后，父子节点都可同步选择。
    defaultExpandLevel: { type: Number, default: 0 },//默认展开的层级，0 - 全部收齐，1-展开所有第一层级的几点

    /**
     * 是否禁止节点可以被选中（将其视为可折节点，类似于叠文件夹开关）
     * 一旦禁止之后 modelConsists 属性将会失效，应为几个父节点都失去了选中的功能
     */
    disableBranchNodes: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },//是否启用搜索查询（前端查询)
    isFuzzyMatching: { type: Boolean, default: true },//是否启用模糊查询（前端查询)
    flattenSearchResults: { type: Boolean, default: false },//扁平化的搜索结果，父子节点以扁平化的展示形式出现
    //Which keys of a node object to filter on.
    filterMatchKeys: {
      type: [String, Array], default() {
        return ['label'];
      },
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
        sort-value-by={this.reSortModelBy}
        default-expand-level={this.defaultExpandLevel}
        flat={this.flat}
        disable-branch-nodes={this.disableBranchNodes}

        alwaysOpen={this.isMenuOpened}

        allowClearingDisabled={true}
        allowSelectingDisabledDescendants={true}


        searchable={this.searchable}
        disableFuzzyMatching={true}
        matchKeys={this.filterMatchKeys}
        flatten-search-results={this.flattenSearchResults}

        noOptionsText={this.noOptionsText}
        noResultsText={this.noResultsText}
        noChildrenText={this.noChildrenText}


        async={this.async}


        auto-load-root-options={this.autoLoadRootOptions}

        load-options={this.loadOptions}


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

  },
});

