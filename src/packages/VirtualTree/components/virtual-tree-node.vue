<template>
  <div
    v-show="node.visible"
    ref="node"
    class="el-tree-node"
    :class="{
      'is-expanded': expanded,
      'is-current': node.isCurrent,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked,
      'is-selectNode': node.id === tree.currentNodeKey,
      'is-showChecked': this.showCheckbox
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.draggable"
    @click.stop="handleClick"
    @contextmenu="($event) => this.handleContextMenu($event)"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div class="el-tree-node__content" :style="`height: ${itemSize}px;`">
      <span
        aria-hidden="true"
        :style="{
          // 'width': (node.level - 1) * tree.indent + 'px',
          'flex': `0 0 ${(node.level - 1) * tree.indent}px` ,
        }"
      ></span>
      <span
        v-if="showCheckbox"
        :class="[
          {
            'is-leaf': node.isLeaf,
            expanded: !node.isLeaf && expanded,
          },
          'el-tree-node__expand-icon',
          'el-tree-node__expand-icon-no-transition',
          tree.iconClass ? tree.iconClass : 'el-icon-caret-right',
        ]"
        @click.stop="handleExpandIconClick"
      ></span>


      <ns-icon-class
        class="el-tree-node__expand-icon"
        v-else-if="!node.isLeaf"
        @click.native.stop="handleExpandIconClick"
        :icon-class="expanded ? 'close-block' : 'open-block'"
      ></ns-icon-class>


      <template v-else>
        <el-tooltip
          v-if="node.data.iconClass"
          effect="dark"
          :content="node.data.iconTitle"
          :disabled="!node.data.iconTitle"
          placement="top-start"
        >
          <ns-icon-svg  :class="['el-tree-node__expand-icon', node.data.iconClass]"
                        :icon-class="node.data.iconClass"></ns-icon-svg>
        </el-tooltip>

        <ns-icon-class
          class="el-tree-node__expand-icon"
          v-else icon-class="padding-block"></ns-icon-class>
      </template>

      <el-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @change="handleCheckChange"
      ></el-checkbox>

      <span
        v-if="node.loading && !node.isLeaf"
        class="el-tree-node__loading-icon el-icon-loading"
      ></span>

      <node-content v-if="showCheckbox" :node="node" showCheckbox></node-content>

      <tree-line
        v-else
        :node="node"
        :showLabelLine="false"
        :indent="tree.indent"
      >
        <!-- 自定义label的slot -->
        <template #node-label  v-if="tree.$scopedSlots.default">
          <node-content  :node="node"></node-content>
        </template>
      </tree-line>
    </div>
  </div>
</template>

<script type="text/jsx">
import ElCheckbox from "./packages/checkbox";
import emitter from "./mixins/emitter";
import commonMethods from "./mixins/common-methods";
import TreeLine from "./packages/tree-line/index.es"

export default {
  name: "ElTreeVirtualNode",
  componentName: "ElTreeVirtualNode",

  components: {
    ElCheckbox,
    TreeLine,
    NodeContent: {
      props: {
        node: {
          required: true,
        },

        showCheckbox: {
          type: Boolean,
          default: false
        }
      },
      render(h) {
        const parentWidget = this.showCheckbox? this.$parent : this.$parent.$parent;
        const tree = parentWidget.tree;
        const node = this.node;
        const { data, store, parent } = node;
        const parentData = parent.level? parent.data :  {}
        return parentWidget.renderContent
          ? parentWidget.renderContent.call(parentWidget._renderProxy, h, {
              _self: tree.$vnode.context,
              node,
              data,
              store,
            })
          : tree.$scopedSlots.default
          ? tree.$scopedSlots.default({ node, data, parent: parentData})
          : h(
              "span",
              {
                class: "el-tree-node__label",
              },
              node.label
            );
      },
    },
  },

  mixins: [emitter, commonMethods],

  props: {
    itemSize: {
      type: Number,
      default: 30,
    },
    node: {
      default() {
        return {};
      },
    },
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null,
    };
  },

  watch: {
    "node.indeterminate"(val) {
      this.handleSelectChange(this.node.checked, val);
    },

    "node.checked"(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },

    "node.expanded"(val) {
      this.$nextTick(() => (this.expanded = val));
      if (val) {
        this.childNodeRendered = true;
      }
    },
  },
  methods: {},

  created() {
    this.init(this.$parent.$parent);
  },
};
</script>
