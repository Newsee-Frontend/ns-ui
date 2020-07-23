<!--多级 - 侧边导航菜单 - node-->
<template>
  <div class="menu-item">
    <div
      :class="[
        'menu-node__content',
        {
          'is-root': isRoot,
          'is-active': node.active,
        },
      ]"
      :style="{ 'padding-left': nodePaddingLeft }"
      @click.stop="menuNodeClick(node)"
      v-show="node.visible"
    >
      <span
        :class="[
          {
            'is-leaf': node.isLeaf || node.isChildrenAllHidden,
            expanded: !node.isLeaf && node.expanded,
          },
          'menu-node__expand-icon',
          'el-icon-caret-right',
        ]"
      ></span>
      <span class="menu-node__label">
        {{ node.label }}
      </span>
      <span class="menu-slot">
        <slotRender :node="node" :slotRander="node.slotRander"></slotRender>
      </span>
    </div>
    <collapse-transition>
      <div
        class="menu-node__children"
        role="group"
        :aria-expanded="node.expanded"
        v-show="node.expanded"
        v-if="!node.isLeaf"
      >
        <nav-menu-node
          v-for="(child, index) in node.childNodes"
          :key="index"
          :node="child"
          :keyRefer="keyRefer"
          @node-click="handleChildNodeExpand"
        >
        </nav-menu-node>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter';
import collapseTransition from './transitions/collapse-transition';
import slotRender from './slotRender';

export default {
  name: 'nav-menu-node',
  mixins: [Emitter],
  components: {
    slotRender,
    collapseTransition,
  },
  props: {
    node: { type: Object },
    keyRefer: { type: Object },
  },
  data() {
    return {
      isActive: false,
      parentMenu: {},
    };
  },
  computed: {
    level() {
      return this.node.level;
    },
    isRoot() {
      return this.level === 1;
    },
    nodePaddingLeft() {
      return (this.level - 1) * 16 + 'px';
    },
  },
  watch: {
    node(val) {},
  },
  methods: {
    setParentMenu() {
      const parent = this.$parent;

      /**
       * 第一层循环时，node-element-tree 的父组件 还是 最外层的 cx-tree （通过判断 是否有 isCXTree 字段值)
       * 之后，每一层的父组件都是上一层的 node-element-tree， 自己再做递归
       * 所取到的tree字段也是其父组件的tree
       */
      if (parent.isRootMenu) {
        this.parentMenu = parent;
      } else {
        this.parentMenu = parent.parentMenu;
      }
    },

    menuNodeClick() {
      console.log('当前点击的节点');
      console.log(this.node);

      if (this.node.level > 1) {
        this.node.expanded = !this.node.expanded;
      }

      this.$emit('node-click', this.node, this); //节点展开事件 -  抛出
    },

    /**
     * 内层  子树组件 展开节点
     * @param node
     * @param instance
     */
    handleChildNodeExpand(node, instance) {
      /**
       * 事件广播
       * 需要传入 组件名称  事件名称 当前节点node信息对象
       */
      this.broadcast('menu-node', 'menu-node-click', node);

      this.$emit('node-click', node, instance);
    },
  },
  created() {
    this.setParentMenu();

    const parentMenu = this.parentMenu;
    if (!parentMenu) {
      console.warn("Can not find node's menu. menu data is error");
    }

    //remove all
    this.$on('menu-node-click', node => {
      console.log(
        '当前手风琴模式：对 menu-node-click 事件回抛进行接收，判断 节点 node - branchID字段值，并关闭不对应的节点'
      );
      //判断 接收 menu-node-click 事件所对应的参数node 是否 为当前节点node
      if (this.node.key !== node.key) {
        // this.node.removeActive();
      }
    });
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
/*@import '../SideMenu/style/menu-node';*/
</style>
