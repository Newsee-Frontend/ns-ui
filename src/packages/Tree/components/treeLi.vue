<template>
  <li v-if="itemVisible" :class="liClass">
    <div class="tree-node-el" :draggable="draggable" @dragstart="drag(item, $event)">
      <!--展开 收缩-->
      <!--checkbox的树图形-->
      <span @click="expandNode(item)" v-if="multiple">
         <i
           :class="{
            'el-icon-caret-right': true,
            'expanded-icon':item.expanded,
            'leaf-icon': !(hasChildren  || item.async || item.loading) }"
         ></i>
      </span>
      <!--一般的树图形-->
      <span @click="expandNode(item)" v-else>
        <icon-class
          v-if="hasChildren || item.async"
          :icon-class="item.expanded? 'close-block' : 'open-block'"
        ></icon-class>
         <icon-class
           v-else
           icon-class="padding-block"
         ></icon-class>
      </span>

      <!--多选框-->
      <el-checkbox
        v-if="multiple"
        :disabled="item.disabled"
        :indeterminate="item.checked && item.halfcheck"
        v-model="item.checked"
        @change="changeNodeCheckStatus(item, $event)">
      </el-checkbox>

      <!--懒加载loading-->
      <i v-if="item.loading && item.expanded" class="el-icon-loading"></i>

      <!--内容渲染-->
      <Render
        :node="item"
        :multiple="multiple"
        :parent="parent"
        :index="index"
        :tpl="tpl"
        :nodeMouseOver="nodeMouseOver"
        :level="level"
      >
      </Render>
    </div>
    <template v-if="showNextUl">
      <collapse-transition>
        <TreeUl
          v-show="item.expanded"
          :dragAfterExpanded="dragAfterExpanded"
          :draggable="draggable"
          :tpl="tpl"
          :data="item.children"
          :halfcheck="halfcheck"
          :scoped="scoped"
          :parent="item"
          :canDeleteRoot="canDeleteRoot"
          :multiple="multiple"
          :level="level"
          :maxLevel="maxLevel"
          :topMustExpand="topMustExpand"
          :dropJudge="dropJudge"
          :allowGetParentNode="allowGetParentNode">
        </TreeUl>
      </collapse-transition>
    </template>
  </li>
</template>
<script>
  import mixins from '../mixins/mixins';
  import Render from './render';
  import CollapseTransition from './collapse-transition';
  import iconClass from '../../../packages/Icon-class/Icon-class';

  export default {
    name: 'TreeLi',
    mixins: [mixins],
    components: {
      Render,
      CollapseTransition,
      iconClass,
    },
    beforeCreate() {
      this.$options.components.TreeUl = require('./treeUl').default;
    },
    props: {
      item: {
        type: Object,
        default: () => {
        },
      },
      index: Number,
      dataLength: {
        type: Number,
        default: 0,
      },
      parent: {
        type: Object,
        default: () => null,
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      draggable: {
        type: Boolean,
        default: false,
      },
      dragAfterExpanded: {
        type: Boolean,
        default: true,
      },
      halfcheck: {
        type: Boolean,
        default: false,
      },
      scoped: {
        type: Boolean,
        default: false,
      },
      canDeleteRoot: {
        type: Boolean,
        default: false,
      },
      tpl: Function,
      maxLevel: Number,
      level: Number,
      topMustExpand: Boolean,
      allowGetParentNode: Boolean,
      dropJudge: Function,
    },
    inject: [
      'isLeaf',
      'childChecked',
      'parentChecked',
      'nodeSelected',
      'emitEventToTree',
      'setAttr',
    ],
    computed: {
      itemVisible() {
        const { visible = true } = this.item;
        return visible;
      },
      hasExpanded() {
        // 已经展开过
        let { hasExpanded = false, expanded = false } = this.item;
        return this.itemVisible && (expanded || hasExpanded);
      },
      liClass() {
        const index = this.index;
        let res;
        if (this.parent) {
          res = {
            leaf: this.isLeaf(this.item),
          };
        } else {
          // top node
          res = {
            'first-node': index === 0,
            'only-node': this.dataLength === 1,
            'second-node': index === 1,
          };
        }
        return res;
      },
      hasChildren() {
        const item = this.item;
        return item.children && item.children.length > 0;
      },
      showNextUl() {
        return (
          !this.isLeaf(this.item) &&
          this.maxLevel > this.level &&
          this.hasExpanded
        );
      },
      position() {
        return { level: this.level, index: this.index };
      },
    },
    watch: {
      'item.checked': {
        handler() {
          this.checkedChange();
        },
        immediate: true,
      },
      'item.halfcheck': {
        handler() {
          this.checkedChange();
        },
        immediate: true,
      },
    },
    methods: {
      /* @method drag node
       * @param node draged node
       * @param ev  $event
       */
      drag(node, ev) {
        let guid = this.guid();
        this.setDragNode(guid, node, this.parent);
        ev.dataTransfer.setData('guid', guid);
      },
      /* @method expand or close node
       * @param node current node
       */
      expandNode(node) {
        const expended = !node.expanded;
        this.$set(node, 'expanded', expended);
        this.$set(node, 'hasExpanded', true);
        // node.expanded = expended;
        // node.hasExpanded = true;
        //zx修改，增加children 为空数组
        if (node.async && (!node.children || (node.children && node.children.length === 0))) {
          node.async = false;  //加载一次后不在异步加载
          this.emitEventToTree('async-load-nodes', node);
        }

        this.emitEventToTree('node-expand', node, expended, this.position);
      },
      /* @event passing the node-check event to the parent component
       * @param node clicked node
       */
      nodeCheck(node, checked) {
        this.$set(node, 'checked', checked);
        if (!this.scoped) {
          const halfcheck = this.halfcheck;
          if (halfcheck) {
            this.$set(node, 'halfcheck', false);
          }
          this.childChecked(node, checked, halfcheck);
        }
      },
      /* @event passing the node-mouse-over event to the parent component
       * @param node overed node
       */
      nodeMouseOver(node, index, parent) {
        this.emitEventToTree('node-mouse-over', node, index, parent);
        // this.$emit('node-mouse-over', node)
      },
      /*
       *@method change the check box status method
       *@param node current node
       *@param $event event object
       */
      changeNodeCheckStatus(node, $event) {
        const checked = $event;
        this.nodeCheck(node, checked);
        this.emitEventToTree('node-check', node, checked, this.position);
      },
      theParentChecked(checked, halfcheck) {
        const parentNode = this.parent;
        this.parentChecked(parentNode, checked, halfcheck);
      },
      checkedChange() {
        const { checked = false } = this.item;
        if (!this.scoped) {
          this.theParentChecked(checked, this.halfcheck);
        }
      },
    },
  };
</script>
