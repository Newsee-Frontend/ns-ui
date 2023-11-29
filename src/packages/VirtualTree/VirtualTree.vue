<template>
  <div
    class="el-tree ns-virtual-tree"
    :class="{
      'el-tree--highlight-current': highlightCurrent,
      'is-dragging': !!dragState.draggingNode,
      'is-drop-not-allow': !dragState.allowDrop,
      'is-drop-inner': dragState.dropType === 'inner'
    }"
    role="tree"
  >
    <RecycleScroller
      v-if="height && !isEmpty"
      ref="recycleScroller"
      :style="{
        height: height,
        'overflow': 'auto',
        // 'scroll-behavior': 'smooth',
        'padding-right': '10px'
      }"
      key-field="key"
      :items="dataList"
      :item-size="itemSize"
      :buffer="50"
    >
      <template slot-scope="{ active, item }">
        <ElTreeVirtualNode
          v-if="active"
          :style="`height: ${itemSize}px;`"
          :node="item"
          :item-size="itemSize"
          :render-content="renderContent"
          :show-checkbox="showCheckbox"
          :render-after-expand="renderAfterExpand"
          @node-expand="handleNodeExpand"
        />
      </template>
    </RecycleScroller>
    <template v-else-if="!height">
      <el-tree-node
        v-for="child in visibleChildNodes"
        :key="getNodeKey(child)"
        :node="child"
        :props="props"
        :itemSize="itemSize"
        :show-checkbox="showCheckbox"
        :render-content="renderContent"
        :render-after-expand="renderAfterExpand"
        @node-expand="handleNodeExpand"
      ></el-tree-node>
    </template>
    <div v-if="isEmpty" class="el-tree__empty-block">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
    <div
      v-show="dragState.showDropIndicator"
      ref="dropIndicator"
      class="el-tree__drop-indicator"
    ></div>
  </div>
</template>

<script>
import TreeStore from './components/model/tree-store'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { getNodeKey, findNearestComponent } from './components/model/util'
import ElTreeNode from './components/tree-node'
import ElTreeVirtualNode from './components/virtual-tree-node'
import emitter from './components/mixins/emitter'
import { addClass, removeClass } from './components/utils/dom'
import create from '../../create/create';
export default create({
  name: 'virtual-tree',

  components: {
    // VirtualList,
    RecycleScroller,
    ElTreeNode,
    ElTreeVirtualNode
  },

  mixins: [emitter],
  props: {
    /**
     * 展示数据
     */
    data: {
      type: Array
    },

    /**
     * 内容为空的时候展示的文本
     */
    emptyText: {
      type: String,
      default () {
        return '暂无数据'
      }
    },

    /**
     *  是否在第一次展开某个树节点后才渲染其子节点
     */
    renderAfterExpand: {
      type: Boolean,
      default: true
    },

    /**
     * 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
     */
    nodeKey: String,

    /**
     * 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
     */
    checkStrictly: {
      type: Boolean,
      default: false
    },

    /**
     * 是否默认展开所有节点
     */
    defaultExpandAll: {
      type: Boolean,
      default: false
    },

    /**
     * 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
     */
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    /**
     * 	是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。
     */
    checkOnClickNode: {
      type: Boolean,
      default: false
    },
    checkDescendants: {
      type: Boolean,
      default: false
    },
    /**
     * 虚拟固定的高度
     */
    itemSize: {
      type: Number,
      default: 30
    },
    /**
     * 展开子节点的时候是否自动展开父节点
     */
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    /**
     * 默认勾选的节点的 key 的数组
     */

    defaultCheckedKeys: Array,
    /**
     * 默认展开的节点的 key 的数组
     */
    defaultExpandedKeys: Array,

    /**
     * 默认选中的节点（用于无checkbox场景）
     */
    currentNodeKey: [String, Number],

    /**
     * 树节点的内容区的渲染 Function
     */
    renderContent: Function,

    /**
     * 节点是否可被选择
     */
    showCheckbox: {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启拖拽节点功能
     */
    draggable: {
      type: Boolean,
      default: false
    },


    /**
     * 判断节点能否被拖拽
     */
    allowDrag: Function,

    /**
     * 拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
     */
    allowDrop: Function,

    /**
     * 判断是否可拖拉 resolve(true) - 允许拖拽   resolve(false) - 不允许拖拽
     */
    dropJudge: Function,

    /**
     *  配置选项，具体看下表
     */
    // eslint-disable-next-line vue/require-prop-types
    props: {
      default () {
        return {
          children: 'children',
          label: 'label',
          disabled: 'disabled'
        }
      }
    },

    /**
     * 是否懒加载子节点，需与 load 方法结合使用
     */
    lazy: {
      type: Boolean,
      default: false
    },

    /**
     * 是否高亮当前选中节点，默认值是 false。
     */
    highlightCurrent: Boolean,

    /**
     * 加载子树数据的方法，仅当 lazy 属性为true 时生效
     */
    load: Function,

    /**
     * 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
     */
    filterNodeMethod: Function,

    /**
     * 是否每次只打开一个同级树节点展开
     */
    accordion: Boolean,

    /**
     * 相邻级节点间的水平缩进，单位为像素
     */
    indent: {
      type: Number,
      default: 18
    },

    /**
     * 自定义树节点的图标
     */
    iconClass: String,
    /**
     * 树高度， 虚拟滚动一定要加
     */
    height: {
      type: [String, Number],
      default: 0
    },

    /**
     * 计算希望渲染的tree节点数
     */
    keeps: {
      type: Number,
      default: 40
    }
  },

  data () {
    return {
      store: null,
      root: null,
      currentNode: null,
      treeItems: null,
      checkboxItems: [],
      dragState: {
        showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true
      },
      treeNodeName: this.height ? 'ElTreeVirtualNode' : 'ElTreeNode'
    }
  },

  computed: {
    children: {
      set (value) {
        this.data = value
      },
      get () {
        return this.data
      }
    },

    treeItemArray () {
      return Array.prototype.slice.call(this.treeItems)
    },

    isEmpty () {
      const { childNodes } = this.root
      return (
        !childNodes ||
        childNodes.length === 0 ||
        childNodes.every(({ visible }) => !visible)
      )
    },

    visibleChildNodes () {
      return this.root.childNodes.filter(() => {
        return !this.isEmpty
      })
    },

    dataList () {
      return this.smoothTree(this.root.childNodes)
    }
  },

  watch: {
    defaultCheckedKeys (newVal) {
      this.store.setDefaultCheckedKey(newVal)
    },

    defaultExpandedKeys (newVal) {
      this.store.defaultExpandedKeys = newVal
      this.store.setDefaultExpandedKeys(newVal)
    },

    data (newVal) {
      this.store.setData(newVal)
    },

    currentNodeKey (key) {
      if (key) {
        this.store.setCurrentNodeKey(key)
      }
    },

    checkboxItems (val) {
      Array.prototype.forEach.call(val, (checkbox) => {
        checkbox.setAttribute('tabindex', -1)
      })
    },

    checkStrictly (newVal) {
      this.store.checkStrictly = newVal
    }
  },

  methods: {
    smoothTree (treeData) {
      return treeData.reduce((smoothArr, data) => {
        if (data.visible) {
          // Mark different types to avoid being optimized out when assembled into the same dom
          data.type = this.showCheckbox
            ? `${data.level}-${data.checked}-${data.indeterminate}`
            : `${data.level}-${data.expanded}`
          smoothArr.push(data)
        }
        if (data.expanded && data.childNodes.length) {
          smoothArr.push(...this.smoothTree(data.childNodes))
        }

        return smoothArr
      }, [])
    },

    /**
     * @public
     *  对树节点进行筛选操作
     */
    filter (value) {
      if (!this.filterNodeMethod) { throw new Error('[Tree] filterNodeMethod is required when filter') }
      this.store.filter(value)
    },

    /**
     * @public
     *  自定义滚动
     *  @param {String, Number} key 节点key值
     */
    scrollToItem (key) {
      if (this.height && !this.isEmpty) {
        const virtualInstance = this.$children.find(
          (c) => c.$options.name === 'RecycleScroller'
        )
        // Automatically scroll the target item to the top
        const index = virtualInstance.items.findIndex((e) => {
          return e.key === key
        })
        this.$nextTick(() => {
          virtualInstance.scrollToItem(index)
        })
      } else {
        throw new Error(
          'scrollToItem can only be used when using virtual scrolling'
        )
      }
    },

    /**
     * @public
     *  自定义滚动到具体问题
     *  @param {String, Number} y 滚动的高度值
     */
    scrollToPosition (y) {
      if (this.height && !this.isEmpty) {
        const virtualInstance = this.$children.find(
          (c) => c.$options.name === 'RecycleScroller'
        )
        this.$nextTick(() => {
          virtualInstance.scrollToPosition(y)
        })
      } else {
        throw new Error(
          'scrollToItem can only be used when using virtual scrolling'
        )
      }
    },

    /**
     * @public
     *  获取滚动的位置（一般与scrollToPosition结合使用）
     */
    getPosition () {
      const virtualInstance = this.$children.find(
        (c) => c.$options.name === 'RecycleScroller'
      )
      let { start } = virtualInstance.getScroll()
      return start
    },

    /**
     * @public
     *  获取节点的key值
     */
    getNodeKey (node) {
      return getNodeKey(this.nodeKey, node.data)
    },

    /**
     * @public
     *  获取节点的path值
     *  @param {String, Number} data 节点key值
     */
    getNodePath (data) {
      if (!this.nodeKey) { throw new Error('[Tree] nodeKey is required in getNodePath') }
      const node = this.store.getNode(data)
      if (!node) return []
      const path = [node.data]
      let parent = node.parent
      while (parent && parent !== this.root) {
        path.push(parent.data)
        parent = parent.parent
      }
      return path.reverse()
    },

    /**
     * @public
     *  若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组
     *   @param {Boolean} leafOnly 是否只是叶子节点，默认值为 false
     *   @param {Boolean} includeHalfChecked 是否包含半选节点，默认值为 false
     */
    getCheckedNodes (leafOnly, includeHalfChecked) {
      return this.store.getCheckedNodes(leafOnly, includeHalfChecked)
    },

    /**
     * @public
     *  若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
     *  @param {Boolean} leafOnly 是否只是叶子节点，默认值为 false
     */
    getCheckedKeys (leafOnly) {
      return this.store.getCheckedKeys(leafOnly)
    },

    /**
     * @public
     * 获取当前被选中节点的 data，若没有节点被选中则返回 null
     */
    getCurrentNode () {
      const currentNode = this.store.getCurrentNode()
      return currentNode ? currentNode.data : null
    },


    /**
     * @public
     * 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
     * @returns {*|null}
     */
    getCurrentKey () {
      if (!this.nodeKey) { throw new Error('[Tree] nodeKey is required in getCurrentKey') }
      const currentNode = this.getCurrentNode()
      return currentNode ? currentNode[this.nodeKey] : null
    },

    /**
     * @public
     * 设置目前勾选的节点，使用此方法必须设置 node-key 属性
     * @param nodes 接收勾选节点数据的数组
     * @param leafOnly 是否只是叶子节点，默认值为 false
     */
    setCheckedNodes (nodes, leafOnly) {
      if (!this.nodeKey) { throw new Error('[Tree] nodeKey is required in setCheckedNodes') }
      this.store.setCheckedNodes(nodes, leafOnly)
    },

    /**
     * @public
     * 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
     * @param keys 勾选节点的 key 的数组
     * @param leafOnly boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false
     */
    setCheckedKeys (keys, leafOnly) {
      if (!this.nodeKey) { throw new Error('[Tree] nodeKey is required in setCheckedKeys') }
      this.store.setCheckedKeys(keys, leafOnly)
    },

    /**
     * @public
     * 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性
     * @param data  勾选节点的 key 或者 data
     * @param checked  boolean 类型，节点是否选中
     * @param deep boolean 类型，是否设置子节点 ，默认为 false
     */
    setChecked (data, checked, deep) {
      this.store.setChecked(data, checked, deep)
    },

    /**
     * @public
     * 设置所有节点的勾选状态
     * @param checked
     */
    setCheckedAll (checked = true) {
      this.store.setCheckedAll(checked)
    },

    /**
     * @public
     * 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点所组成的数组
     * @returns {*}
     */
    getHalfCheckedNodes () {
      return this.store.getHalfCheckedNodes()
    },

    /**
     * @public
     *  若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组
     * @returns {*}
     */
    getHalfCheckedKeys () {
      return this.store.getHalfCheckedKeys()
    },

    /**
     * @public
     * 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
     * @param node  待被选节点的 node
     */
    setCurrentNode (node) {
      if (!this.nodeKey) { throw new Error('[Tree] nodeKey is required in setCurrentNode') }
      this.store.setUserCurrentNode(node)
    },

    /**
     * @public
     * 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
     * @param key 待被选节点的 key，若为 null 则取消当前高亮的节点
     */
    setCurrentKey (key) {
      if (!this.nodeKey) { throw new Error('[Tree] nodeKey is required in setCurrentKey') }
      this.store.setCurrentNodeKey(key)
    },

    /**
     * @public
     * 根据 data 或者 key 拿到 Tree 组件中的 node
     * @param data 要获得 node 的 key 或者 data
     * @returns {*}
     */
    getNode (data) {
      return this.store.getNode(data)
    },

    /**
     * @public
     * 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性
     * @param data 要删除的节点的 data 或者 node
     */
    remove (data) {
      this.store.remove(data)
    },

    /**
     * @public
     * 为 Tree 中的一个节点追加一个子节点
     * @param data 要追加的子节点的 data
     * @param parentNode 子节点的 parent 的 data、key 或者 node
     */
    append (data, parentNode) {
      this.store.append(data, parentNode)
    },

    /**
     * @public
     * 为 Tree 的一个节点的前面增加一个节点
     * @param data 要增加的节点的 data
     * @param refNode 要增加的节点的后一个节点的 data、key 或者 node
     */
    insertBefore (data, refNode) {
      this.store.insertBefore(data, refNode)
    },

    /**
     * @public
     * 为 Tree 的一个节点的后面增加一个节点
     * @param data 要增加的节点的 data
     * @param refNode 要增加的节点的后一个节点的 data、key 或者 node
     */
    insertAfter (data, refNode) {
      this.store.insertAfter(data, refNode)
    },


    handleNodeExpand (nodeData, node, instance) {
      this.broadcast(this.treeNodeName, 'tree-node-expand', node)
      /**
       * 节点被展开时触发的事件
       * @event node-expand
       * @property nodeData  传递给 data 属性的数组中该节点所对应的对象
       * @property node  节点对应的 Node
       * @property instance  节点组件本身
       */
      this.$emit('node-expand', nodeData, node, instance)
    },

    /**
     * @public
     * 更新子节点内容
     * @param key  需要更新的父节点的key值
     * @param data  需要更新的内容
     */
    updateKeyChildren (key, data) {
      if (!this.nodeKey) { throw new Error('[Tree] nodeKey is required in updateKeyChild') }

      let node = this.getNode(key)
      node.loaded = true
      this.store.updateChildren(key, data)
    },

    /**
     * @public
     * 获取最后的树完整的数据
     * @returns {*[]}
     */
    getFullData () {
      let res = []

      const deepS = (root, data) => {
        root.childNodes.forEach(i => {
          data.push(i.data)

          if (i.childNodes.length > 0) {
            i.data[this.props.children] = []
            deepS(i, i.data[this.props.children])
          }
        })
      }

      deepS(this.root, res)
      return res
    },

    /**
     *
     * @returns {*}
     */
    getExpandKeys () {
      let nodeList = this.store._getAllNodes()
      return nodeList.filter(node => node.expanded).map(node => node.data[this.props.id])
    },

    initTabIndex () {
      this.treeItems = this.$el.querySelectorAll(
        '.is-focusable[role=treeitem]'
      )
      this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]')
      const checkedItem = this.$el.querySelectorAll(
        '.is-checked[role=treeitem]'
      )
      if (checkedItem.length) {
        checkedItem[0].setAttribute('tabindex', 0)
        return
      }
      this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0)
    },

    handleKeydown (ev) {
      const currentItem = ev.target
      if (currentItem.className.indexOf('el-tree-node') === -1) return
      const keyCode = ev.keyCode
      this.treeItems = this.$el.querySelectorAll(
        '.is-focusable[role=treeitem]'
      )
      const currentIndex = this.treeItemArray.indexOf(currentItem)
      let nextIndex
      if ([38, 40].indexOf(keyCode) > -1) {
        // up、down
        ev.preventDefault()
        if (keyCode === 38) {
          // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
        } else {
          nextIndex =
            currentIndex < this.treeItemArray.length - 1 ? currentIndex + 1 : 0
        }
        this.treeItemArray[nextIndex].focus() // 选中
      }
      // 始终使用箭头，避免expand-on-click-node=false时不展开
      const expandIcon = currentItem.querySelector('[class*="el-icon-"]')
      if ([37, 39].indexOf(keyCode) > -1 && expandIcon) {
        // left、right 展开
        ev.preventDefault()
        expandIcon.click() // 选中
      }
      const hasInput = currentItem.querySelector('[type="checkbox"]')
      if ([13, 32].indexOf(keyCode) > -1 && hasInput) {
        // space enter选中checkbox
        ev.preventDefault()
        hasInput.click()
      }
    }
  },

  created () {
    this.isTree = true
    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load,
      currentNodeKey: this.currentNodeKey,
      checkStrictly: this.checkStrictly,
      checkDescendants: this.checkDescendants,
      defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod
    })

    this.root = this.store.root

    let dragState = this.dragState

    this.$on('tree-node-drag-start', (event, treeNode) => {
      if (
        typeof this.allowDrag === 'function' &&
        !this.allowDrag(treeNode.node)
      ) {
        event.preventDefault()
        return false
      }
      event.dataTransfer.effectAllowed = 'move'

      // wrap in try catch to address IE's error when first param is 'text/plain'
      try {
        // setData is required for draggable to work in FireFox
        // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
        event.dataTransfer.setData('text/plain', '')
      } catch (e) {
        console.log(e)
      }
      dragState.draggingNode = treeNode
      /**
       * 节点开始拖拽时触发的事件
       * @event node-drag-start
       * @property node  被拖拽节点对应的 Node
       * @property event  event
       */
      this.$emit('node-drag-start', treeNode.node, event)
    })

    this.$on('tree-node-drag-over', (event, treeNode) => {
      const dropNode = findNearestComponent(
        event.target,
        treeNode.$options.name
      )
      const oldDropNode = dragState.dropNode
      if (oldDropNode && oldDropNode !== dropNode) {
        removeClass(oldDropNode.$el, 'is-drop-inner')
      }
      const draggingNode = dragState.draggingNode
      if (!draggingNode || !dropNode) return

      let dropPrev = true
      let dropInner = true
      let dropNext = true
      let userAllowDropInner = true
      if (typeof this.allowDrop === 'function') {
        dropPrev = this.allowDrop(draggingNode.node, dropNode.node, 'prev')
        userAllowDropInner = dropInner = this.allowDrop(
          draggingNode.node,
          dropNode.node,
          'inner'
        )
        dropNext = this.allowDrop(draggingNode.node, dropNode.node, 'next')
      }
      event.dataTransfer.dropEffect = dropInner ? 'move' : 'none'
      if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
        if (oldDropNode) {
          /**
           * 拖拽离开某个节点时触发的事件
           * @event node-drag-leave
           * @property draggingNode  被拖拽节点对应的 Node
           * @property oldDropNode  所离开节点对应的 Node
           * @property event  event
           */
          this.$emit(
            'node-drag-leave',
            draggingNode.node,
            oldDropNode.node,
            event
          )
        }
        /**
         * 拖拽进入其他节点时触发的事件
         * @event node-drag-enter
         * @property draggingNode  被拖拽节点对应的 Node
         * @property dropNode  所离开节点对应的 Node
         * @property event  event
         */
        this.$emit('node-drag-enter', draggingNode.node, dropNode.node, event)
      }

      if (dropPrev || dropInner || dropNext) {
        dragState.dropNode = dropNode
      }

      if (dropNode.node.nextSibling === draggingNode.node) {
        dropNext = false
      }
      if (dropNode.node.previousSibling === draggingNode.node) {
        dropPrev = false
      }
      if (dropNode.node.contains(draggingNode.node, false)) {
        dropInner = false
      }
      if (
        draggingNode.node === dropNode.node ||
        draggingNode.node.contains(dropNode.node)
      ) {
        dropPrev = false
        dropInner = false
        dropNext = false
      }

      const targetPosition = dropNode.$el.getBoundingClientRect()
      const treePosition = this.$el.getBoundingClientRect()

      let dropType
      const prevPercent = dropPrev
        ? dropInner
          ? 0.25
          : dropNext
            ? 0.45
            : 1
        : -1
      const nextPercent = dropNext
        ? dropInner
          ? 0.75
          : dropPrev
            ? 0.55
            : 0
        : 1

      let indicatorTop = -9999
      const distance = event.clientY - targetPosition.top
      if (distance < targetPosition.height * prevPercent) {
        dropType = 'before'
      } else if (distance > targetPosition.height * nextPercent) {
        dropType = 'after'
      } else if (dropInner) {
        dropType = 'inner'
      } else {
        dropType = 'none'
      }

      const iconPosition = dropNode.$el
        .querySelector('.el-tree-node__expand-icon')
        .getBoundingClientRect()
      const dropIndicator = this.$refs.dropIndicator
      if (dropType === 'before') {
        indicatorTop = iconPosition.top - treePosition.top
      } else if (dropType === 'after') {
        indicatorTop = iconPosition.bottom - treePosition.top
      }
      dropIndicator.style.top = indicatorTop + 'px'
      dropIndicator.style.left = iconPosition.right - treePosition.left + 'px'

      if (dropType === 'inner') {
        addClass(dropNode.$el, 'is-drop-inner')
      } else {
        removeClass(dropNode.$el, 'is-drop-inner')
      }

      dragState.showDropIndicator =
        dropType === 'before' || dropType === 'after'
      dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner
      dragState.dropType = dropType

      /**
       * 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）
       * @event node-drag-over
       * @property draggingNode  被拖拽节点对应的 Node
       * @property dropNode  所离开节点对应的 Node
       * @property event  event
       */
      this.$emit('node-drag-over', draggingNode.node, dropNode.node, event)
    })

    this.$on('tree-node-drag-end', async (event) => {
      const { draggingNode, dropType, dropNode } = dragState
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'

      const done = (draggingNode, dropNode) => {
        if (draggingNode && dropNode) {
          const draggingNodeCopy = { data: draggingNode.node.data }
          if (dropType !== 'none') {
            draggingNode.node.remove()
          }
          if (dropType === 'before') {
            dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node)
          } else if (dropType === 'after') {
            dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node)
          } else if (dropType === 'inner') {
            dropNode.node.insertChild(draggingNodeCopy)
          }
          if (dropType !== 'none') {
            this.store.registerNode(draggingNodeCopy)
          }

          removeClass(dropNode.$el, 'is-drop-inner')
          /**
           * 拖拽结束时（可能未成功）触发的事件
           * @event node-drop
           * @property draggingNode  被拖拽节点对应的 Node
           * @property dropNode  结束拖拽时最后进入的节点
           * @property dropType  被拖拽节点的放置位置（before、after、inner）
           * @property event  event
           */
          this.$emit(
            'node-drag-end',
            draggingNode.node,
            dropNode.node,
            dropType,
            event
          )
          if (dropType !== 'none') {
            /**
             * 拖拽成功完成时触发的事件
             * @event node-drop
             * @property draggingNode  被拖拽节点对应的 Node
             * @property dropNode  结束拖拽时最后进入的节点
             * @property dropType  被拖拽节点的放置位置（before、after、inner）
             * @property event  event
             */
            this.$emit(
              'node-drop',
              draggingNode.node,
              dropNode.node,
              dropType,
              event
            )
          }
        }
        if (draggingNode && !dropNode) {
          /**
           * 拖拽结束时（可能未成功）触发的事件
           * @event node-drop
           * @property draggingNode  被拖拽节点对应的 Node
           * @property dropNode  结束拖拽时最后进入的节点
           * @property dropType  被拖拽节点的放置位置（before、after、inner）
           * @property event  event
           */
          this.$emit('node-drag-end', draggingNode.node, null, dropType, event)
        }
      }
      if (this.dropJudge) {
        this.dropJudge(draggingNode.node, dropNode.node, (res) => {
          if (res) {
            done(draggingNode, dropNode)
          }
        })
      } else {
        done(draggingNode, dropNode)
      }

      dragState.showDropIndicator = false
      dragState.draggingNode = null
      dragState.dropNode = null
      dragState.allowDrop = true
    })
  },

  mounted () {
    this.initTabIndex()
    this.$el.addEventListener('keydown', this.handleKeydown)
  },

  updated () {
    this.treeItems = this.$el.querySelectorAll('[role=treeitem]')
    this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]')
  }
})
</script>
<style lang="scss">
 @import "style/index";
</style>
