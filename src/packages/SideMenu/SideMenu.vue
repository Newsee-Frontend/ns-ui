<!--多级 - 侧边导航菜单-->
<template>
  <div
    :class="[
      recls(),
      { 'is-expand': mainExpanded },
      { 'is-collapse': !mainExpanded },
      'first-nav noselect',
    ]"
    @mouseleave="navMouseLeave($event)"
  >
    <!--主菜单部分（1级菜单部分）-->
    <div class="main-menu">
      <ul class="main-menu__content">
        <el-tooltip
          popper-class="main-menu__tooltip"
          :content="child.label"
          placement="right"
          :disabled="mainExpanded || isSubMenuExist"
          :hide-after="1000"
          v-for="child in root.childNodes"
          :index="child.index"
          :key="child.key"
        >
          <li
            v-bind:class="['main-menu__item', { 'is-active': child.active }]"
            @mouseenter="nodeMouseEnter(child, $event)"
            @mouseleave="nodeMouseLeave(child, $event)"
            @click="menuNodeClick(child)"
            v-if="child.visible"
          >
            <icon-svg :icon-class="child.icon || ''"></icon-svg>
            <span>{{ child.label }}</span>
            <slotRender :node="child" :slotRander="slotRander"></slotRender>
          </li>
        </el-tooltip>
      </ul>

      <div class="main-menu__expanded">
        <el-tooltip
          :content="mainExpanded ? '展开' : '收起'"
          effect="dark"
          placement="right"
          :hide-after="800"
        >
          <icon-class
            :icon-class="mainExpanded ? 'CombinedShapex' : 'CombinedShapeCopyx'"
            @click="toggleExpand"
          />
        </el-tooltip>
      </div>
    </div>

    <!--副菜单部分（ 2-n 级菜单部分）-->
    <transition name="slide-fade">
      <div :class="['sub-menu', { 'is-expand': hasChildNodes }]" v-if="isSubMenuExist">
        <div class="sub-menu__title">
          <span>{{ node.label }}</span>
        </div>

        <div class="sub-menu__content">
          <nav-menu-node :node="node" :keyRefer="keyRefer" @node-click="menuNodeClick">
            <template slot="first-slot" slot-scope="scope">
              <slot name="first-slot" :node="scope"></slot>
            </template>
          </nav-menu-node>
        </div>

        <div class="sub-menu__turning">
          <icon-class icon-class="el-icon-arrow-down" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import create from '../../create/create';

import Emitter from '../../mixins/emitter';

import collapseTransition from './transitions/collapse-transition';
import iconClass from '../Icon-class/Icon-class';
import navMenuNode from './SideMenu-node';
import slotRender from './slotRender';

import MenuStore from './menu-store';

import defaultKeyRefer from './keyRefer';
import { delaynav } from '../SideBar/utils';

export default create({
  name: 'side-menu',
  mixins: [Emitter],
  components: { iconClass, navMenuNode, slotRender, collapseTransition },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    expanded: { type: Boolean, default: true }, //是否展开
    defaultExpandAll: { type: Boolean, default: false }, //是否默认展开所有菜单栏节点
    defaultExpandedKeys: {
      type: Array,
      default: () => {
        return [];
      },
    }, //初始化的展开节点key队列,注意：defaultExpandAll必须为false，才能设置
    defaultActive: { type: String, default: '0-0-0' }, //初始化的active的节点key
    enterDelay: { type: Number, default: 160 },
    leaveDelay: { type: Number, default: 200 },
    keyRefer: {
      type: Object,
      default() {
        return defaultKeyRefer;
      },
    },
    slotRander: { type: Function },
    closeByLeafClick: { type: Boolean, default: false }, //是否点击叶子节点关闭伸缩副菜单
  },
  data() {
    return {
      isRootMenu: true,

      node: {},
      store: null,
      root: null,

      subNavDelay: true,

      mainExpanded: this.expanded,
      subExpanded: false,
    };
  },
  computed: {
    hasChildNodes() {
      return this.node && this.node.childNodes && this.node.childNodes.length > 0;
    },
    isSubMenuExist() {
      return this.hasChildNodes && this.subExpanded;
    },
  },
  watch: {
    //监听组件数据变化
    data: {
      handler: function(newVal) {
        this.store.setNodeData(newVal); //重新设置注入组件数据
      },
      deep: true,
    },
  },
  methods: {
    /**
     * 离开整个菜单栏
     */
    navMouseLeave() {
      delaynav(
        () => {
          this.subExpanded = false;
          this.node = {};
        },
        this.leaveDelay,
        this
      );
    },

    /**
     * nav mouse enter
     * @param node
     * @param event
     */
    nodeMouseEnter(node, event) {
      console.log('nodeMouseEnter-nodeMouseEnter');
      this.subExpanded = true;
      this.node = node;
    },

    /**
     * nav mouse leave
     * @param node
     */
    nodeMouseLeave(node) {
      // this.$emit('mouse-leave', item[this.keyRefer.menuIndex] - 1, item);
    },

    /**
     * 菜单节点点击
     * @param node
     * @param instance
     */
    menuNodeClick(node, instance) {
      console.log('菜单节点点击');
      console.log(node);

      //首级节点
      if (node.level === 1) {
        this.subExpanded = true;
        this.node = node;
      }

      /**
       * 如果是叶子节点 - 设置active前，先要清除所有的active状态
       * 设置点击叶子节点关闭副菜单
       */
      if (node.isLeaf) {
        //remove all
        node.removeActive(this.root);

        //set active state
        node.setActive(); //set active state for node

        if (this.closeByLeafClick) {
          this.subExpanded = false;
        }
      }

      /**
       * 事件广播
       * 需要传入 组件名称  事件名称 当前节点node信息对象
       */
      this.broadcast('menu-node', 'menu-node-click', node);

      this.$emit('node-click', node, instance); //向外抛出 事件 node-expand
    },

    /**
     * 切换菜单栏展开/收起 状态
     */
    toggleExpand() {
      this.mainExpanded = !this.mainExpanded;
      this.$emit('toggle-expand', this.mainExpanded);
    },

    /**
     * set active dynamic in menu node - 根据激活ID设置激活链路节点
     * 1、find the node（target node) that need to be set
     * 2、remove all active from root node （loop down)
     * 3、set active state form target node （loop up)
     * @param activeId
     */
    setActive(activeId) {
      if (!activeId) return;

      const activeArr = activeId.split('-');

      if (!activeArr || !activeArr.length) return;

      let targetNode = this.root;

      //find the node（target node) that need to be set
      activeArr.forEach(key => {
        try {
          targetNode = targetNode.childNodes[key];
        } catch (e) {
          throw `menu active key (${activeId}) is wrong. There is no node level for this active ID`;
        }
      });

      //remove all
      targetNode.removeActive(this.root);
      //set active state
      targetNode.setActive();
    },
  },
  created() {
    this.store = new MenuStore({
      data: this.data,
      keyRefer: this.keyRefer,
      defaultExpandAll: this.defaultExpandAll,
      defaultExpandedKeys: this.defaultExpandedKeys,
      defaultActive: this.defaultActive,
      slotRander: this.slotRander,
    });

    this.root = this.store.root;

    // console.log('root-root');
    // console.log(this.root);
    // console.log(this.root.childNodes);
    // console.log('root-root');
  },
});
</script>

<style rel="stylesheet/scss" lang="scss">
/*@import './style/index';*/
</style>
