<template>
  <div :class="[
       recls(),
        {'is-expand':isExpanded},
        {'is-collapse':!isExpanded},
       'first-nav  menu-wrapper noselect'
       ]"
       @mouseleave="navMouseLeave($event)"
  >
    <!--主菜单部分（1级菜单部分）-->
    <div class="main-menu">
      <ul class="main-menu__content">
        <li
          v-for="child in root.childNodes"
          :index="child.index"
          :key="child.key"
          v-bind:class="['main-menu__item',{'is-active':child.active}]"
          @mouseenter="nodeMouseEnter(child, $event)"
          @mouseleave="nodeMouseLeave(child, $event)"
          @click="menuNodeClick(child)"
          v-if="child.visible"
        >
          <div class="oneline-ellipsis">
            <icon-svg :icon-class="child.icon || ''"></icon-svg>
            <span>{{child.label}}</span>
            <!--<span class="first-slot">-->
            <!--<slot name="first-slot" :item="child"></slot>-->
            <!--</span>-->
          </div>
        </li>
      </ul>

      <div class="main-menu__expanded">
        <el-tooltip
          :content="isExpanded?'展开':'收起'"
          effect="dark"
          placement="right"
          :hide-after="800"
        >
          <icon-class :icon-class="isExpanded?'CombinedShapex':'CombinedShapeCopyx'" @click="toggleExpand"/>
        </el-tooltip>
      </div>
    </div>

    <!--副菜单部分（ 2-n 级菜单部分）-->
    <transition name="slide-fade">
      <div :class="['sub-menu',{'is-expand':hasChildNodes}]" v-if="hasChildNodes">
        <div class="sub-menu__title">
          <span>{{ node.label }}</span>
        </div>

        <div class="sub-menu__content">
          <nav-menu-node :node="node" :keyRefer="keyRefer" @node-click="menuNodeClick"></nav-menu-node>
        </div>

        <div class="sub-menu__turning">
          <icon-class icon-class="el-icon-arrow-down"/>
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
  import create from '../../../../create/create';

  import Emitter from '../../../../mixins/emitter';

  import collapseTransition from './transitions/collapse-transition';
  import iconClass from '../../../Icon-class/Icon-class';
  import navMenuNode from './navMenu-node';

  import MenuStore from './menu-store';

  import defaultKeyRefer from './keyRefer';
  import { delaynav } from '../../utils';

  export default create({
    name: 'multiple-navMenu',
    mixins: [Emitter],
    components: { iconClass, navMenuNode, collapseTransition },
    data() {
      return {
        isRootMenu: true,

        node: {},
        store: null,
        root: null,

        subNavDelay: true,
        isExpanded: this.expanded,

      };
    },
    props: {
      data: {
        type: Array, default() {
          return [];
        },
      },
      expanded: { type: Boolean, default: true },//是否展开
      defaultExpandAll: { type: Boolean, default: false },//是否默认展开所有菜单栏节点
      defaultExpandedKeys: {
        type: Array, default: () => {
          return ['0-1', '10-1'];
        },
      },//初始化的展开节点key队列,注意：defaultExpandAll必须为false，才能设置
      defaultActive: { type: String, default: '0-0-0' },//初始化的active的节点key
      enterDelay: { type: Number, default: 160 },
      leaveDelay: { type: Number, default: 200 },
      keyRefer: {
        type: Object, default() {
          return defaultKeyRefer;
        },
      },
    },
    computed: {
      hasChildNodes() {
        return this.node && this.node.childNodes && this.node.childNodes.length > 0;
      },
    },
    watch: {
      //监听组件数据变化
      data(newVal) {
        this.store.setNodeData(newVal);//重新设置注入组件数据
      },
    },
    created() {
      console.log('created-created-created');
      console.log(this.data);

      this.store = new MenuStore({
        data: this.data,
        keyRefer: this.keyRefer,
        defaultExpandAll: this.defaultExpandAll,
        defaultExpandedKeys: this.defaultExpandedKeys,
        defaultActive: this.defaultActive,
      });

      this.root = this.store.root;

      console.log('root-root');
      console.log(this.root);
      console.log(this.root.childNodes);
      console.log('root-root');

    },
    methods: {

      /**
       * 离开整个菜单栏
       */
      navMouseLeave() {
        delaynav(
          () => {
            // this.node = {};
          },
          this.leaveDelay,
          this,
        );
      },

      /**
       * nav mouse enter
       * @param node
       * @param event
       */
      nodeMouseEnter(node, event) {
        console.log('nodeMouseEnter-nodeMouseEnter');
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

        //如果是叶子节点 - 设置active前，先要清除所有的active状态
        if (node.isLeaf) {

          //remove all
          node.removeActive(this.root);

          //set active state
          node.setActive();//set active state for node

        }

        /**
         * 事件广播
         * 需要传入 组件名称  事件名称 当前节点node信息对象
         */
        this.broadcast('menu-node', 'menu-node-click', node);

        this.$emit('node-click', node, instance);//向外抛出 事件 node-expand
      },


      toggleExpand() {
        this.isExpanded = !this.isExpanded;
      },


    },
  });
</script>
<style rel="stylesheet/scss" lang="scss">
  @import '../../style/multiple/index';
</style>
