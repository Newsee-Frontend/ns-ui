<template>
  <ul class="halo-tree">
    <treeLi
      v-for="(item, index) in data"
      :key="item.id ? item.id : index"
      @drop.stop.native="drop(item, $event)"
      @dragover.stop.native="dragover"
      :item="item"
      :index="index"
      v-bind="childBind"
    />
  </ul>
</template>
<script>
import TreeLi from './treeLi';
// import './tree.css'
import mixins from '../mixins/mixins';
import { findNearestComponent } from '../utils';

export default {
  name: 'TreeUl',
  mixins: [mixins],
  inheritAttrs: false,
  components: { TreeLi },
  inject: ['isLeaf', 'childChecked', 'parentChecked', 'emitEventToTree'],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    parent: {
      type: Object,
      default: () => null,
    },
    dragAfterExpanded: {
      type: Boolean,
      default: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    allowGetParentNode: {
      type: Boolean,
      default: false,
    },
    dropJudge: {
      type: Function,
    },
    allowDropGap: {
      type: Boolean,
    },
  },
  computed: {
    childBind() {
      const { data, ...otherObj } = this.$props;
      const dataLength = data.filter(node => node.visible !== false).length;
      return Object.assign({}, this.$attrs, otherObj, {
        dataLength,
        level: this.treeLevel,
      });
    },
    treeLevel() {
      return this.level + 1;
    },
  },
  methods: {
    /* @method drop node
     * @param node droped node
     * @param ev  $event
     */
    async drop(node, ev) {
      ev.preventDefault();
      ev.stopPropagation();
      $('.halo-tree li').removeClass('active-before active-after');
      let guid = ev.dataTransfer.getData('guid');
      let { node: dropNodeComponent, type } = this.getDropNodeInfo(ev);
      let isNotInsert = this.allowDropGap && type !== 'inner';
      let { node: dragNode, parent: parentNode } = this.getDragNode(guid);
      // if drag node's parent is enter node or root node
      if ((!isNotInsert && parentNode === node) || parentNode === null || dragNode === node)
        return false;
      // drag from parent node to child node
      if (this.hasInGenerations(dragNode, node)) return false;

      // zx增加判断， 是否可以插入
      let po = await new Promise(resolve => {
        if (this.allowDropGap) {
          return this.dropJudge && this.dropJudge(dragNode, node, type, resolve);
        } else {
          return this.dropJudge && this.dropJudge(dragNode, node, resolve);
        }
      });

      if (!po) return false;

      //原来节点删除
      let dragHost = parentNode.children;
      dragHost.splice(dragHost.indexOf(dragNode), 1);

      //drop对应处添加节点
      if (isNotInsert) {
        let nodeParent = dropNodeComponent.parent;
        let dropHost = nodeParent.children;
        let index = (dropHost || []).indexOf(node);
        let lastIndex = type === 'before' ? index : index + 1;
        dropHost.splice(lastIndex, 0, dragNode);
      } else {
        if ((node.children || []).length === 0) {
          this.$set(node, 'children', [dragNode]);
        } else {
          node.children.push(dragNode);
        }
        this.$set(node, 'expanded', this.dragAfterExpanded);
      }
      this.dragNodeEnd({ dragNode: dragNode, targetNode: node, event: ev });
    },
    /* @method drag node
     * @param node draged node
     * @param ev  $event
     */
    drag(node, ev) {
      let guid = this.guid();
      this.setDragNode(guid, node, this.parent);
      ev.dataTransfer.setData('guid', guid);
    },
    /* @method dragover node
     * @param ev  $event
     */
    dragover(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (!this.allowDropGap) return;
      // 增加位置判断，
      const { node, type } = this.getDropNodeInfo(ev);
      $('.halo-tree li').removeClass('active-before active-after');
      if (type !== 'inner') {
        node.$el.classList.add(`active-${type}`);
      }
    },
    /**
     * drop node 基本信息
     */
    getDropNodeInfo(ev) {
      const dragingLi = findNearestComponent(ev.target, 'TreeLi');
      const dragingLiPosition = dragingLi.$el.getBoundingClientRect();
      const distance = ev.clientY - dragingLiPosition.top;
      const liHeight = dragingLiPosition.height;
      const type =
        distance > liHeight * 0.75 ? 'after' : distance > liHeight * 0.25 ? 'inner' : 'before';
      return { node: dragingLi, type };
    },
    /* @event passing the drag-node-end event to the parent component
     * @param node clicked node
     */
    dragNodeEnd(obj = {}) {
      this.emitEventToTree('drag-node-end', obj);
    },
  },
  created() {
    if (this.allowGetParentNode === true) {
      const data = this.data;
      const hasParent = data[0] && typeof data[0].parent === 'function';
      if (!hasParent) {
        const parent = this.parent;
        this.data.forEach(item => {
          item.parent = () => parent;
        });
      }
    }
  },
};
</script>
