/**
 * getPropertyFromData
 * @param node
 * @param prop
 * @returns {*}
 */
const getPropertyFromData = function(node, prop) {
  const keyRefer = node.store.keyRefer; //当前节点  props 属性（用户可自定义设置更改)
  const data = node.data || {}; //当前节点数据
  const keyTrans = keyRefer[prop]; //props  中对应字段的属性值
  //若为函数
  if (typeof keyTrans === 'function') {
    return keyTrans(data, node);
  }
  //若为字符串
  else if (typeof keyTrans === 'string') {
    // console.log(JSON.stringify(data, null, 4))
    // console.log(JSON.stringify(data[AttVal], null, 4))
    return data[keyTrans]; //用该字段值到节点数据中取值输出
  }
  //若为不存在（未定义)（ 用户可自定义设置更改后，props中不存在该字段key )
  else if (typeof keyTrans === 'undefined') {
    const dataProp = data[prop]; //用该字段key到节点数据中取值输出
    return dataProp === undefined ? '' : dataProp;
  }
};

/**
 * object assign
 * @param target
 * @returns {*}
 */
export const objectAssign = function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

export default class Node {
  constructor(options) {
    // console.log('constructor - options');
    // console.log(options);
    // console.log(this.store);

    this.data = null; //树 渲染数据
    this.parentNode = null; //父 node 信息
    this.childNodes = []; //存放  子node节点数据

    this.expanded = false; //开闭状态
    this.active = false; //是否激活

    this.level = 0; //初始化的时候层级 0
    this.index = 0; //当前层级下的索引值
    this.key = '';

    //绑定对应的属性值 到 constructor 中
    for (let name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    //若该层存在 parentNode 字段的内容 （ 非最顶层 )
    //我们已经约定 最顶层 level = 0 了
    if (this.parentNode) {
      this.level = this.parentNode.level + 1; //该层级 递增1

      this.key = (this.parentNode.key ? this.parentNode.key + '-' : '') + this.index;
    } else {
      // this.key = this.index + '';
    }

    // console.log('当前对象的值');
    // console.log(this);
    // console.log(this.data);
    // console.log('当前对象的值');

    //设置注入组件数据
    this.setNodeData(this.data);

    const store = this.store;

    //插槽
    this.slotRander = store.slotRander;

    //初始化展开
    this.initExpand(store);

    const defaultActive = store.defaultActive;

    if (defaultActive && defaultActive === this.key) {
      this.setActive();
    }
  }

  //是否可见
  get visible() {
    return getPropertyFromData(this, 'visible');
  }

  //还否儿子们都不可见
  get isChildrenAllHidden() {
    return this.childNodes.every(node => !node.visible);
  }

  //get label in node
  get label() {
    return getPropertyFromData(this, 'label');
  }

  //get icon in node
  get icon() {
    return getPropertyFromData(this, 'icon');
  }

  get isLeaf() {
    return getPropertyFromData(this, 'isLeaf');
  }

  setNodeData(data) {
    // console.log('树组件的data:');
    // console.log(data);
    if (!Array.isArray(data)) {
      // markNodeData(this, data);
    }

    this.data = data;
    this.childNodes = [];
    let children;

    //data为一个数组的话 （最外层渲染的情况下）
    if (this.data instanceof Array) {
      children = this.data;
    }
    //data为不为一个数组的话 （内层层渲染的情况下）
    else {
      children = getPropertyFromData(this, 'children') || []; //往下层层遍历的情况下 ，若对象下没有children 字段 ，则赋值为空数组
    }

    for (let i = 0, j = children.length; i < j; i++) {
      this.insertChild({ data: children[i] }, i);
      // this.label = children[i].label;
      // this.childNodes.push(this);
    }

    // console.log('childNodes-childNodes-childNodes')
    // console.log(this.childNodes)
  }

  /**
   * insertChild
   * @param child     子节点 数据
   * @param index
   * @param batch
   */
  insertChild(child, index, batch) {
    // console.log('insertChild');
    // console.log(child)
    objectAssign(child, {
      parentNode: this,
      store: this.store,
      index: index,
    });
    child = new Node(child); //子节点数据  => 子节点 node 对象

    this.childNodes.push(child); //推入子节点数组中

    //若该层存在 child 字段的内容 （ 此层的子级相对于此层（父级）， level值大1 )
    child.level = this.level + 1; //其子级层级 level 递增 1
  }

  //init expanded state
  initExpand(store) {
    //默认展开所有节点的情况下，直接修改其 expanded 状态值为 true
    if (store.defaultExpandAll) {
      this.expanded = true;
    } else {
      //层级2层的默认全部打开- 顶层和主菜单（第一层)需要打开，不然副菜单是无法正常显示的
      if (this.level < 2) {
        this.expanded = true;
      }

      const defaultExpandedKeys = store.defaultExpandedKeys;

      if (this.key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
        this.expanded = true;
      }
    }
  }

  /**
   * set active state for node
   * @param callback
   */
  setActive(callback) {
    const done = () => {
      let parent = this.parentNode;

      while (parent.level > 0) {
        parent.active = true;
        parent = parent.parentNode;
      }

      this.active = true;
      if (callback) callback();
    };
    done();
  }

  /**
   * remove active state
   * @param node
   * @param callback
   */
  removeActive(node, callback) {
    const done = node => {
      let childNodes = node.childNodes;
      node.active = false;

      if (childNodes && childNodes.length > 0) {
        childNodes.forEach(child => {
          done(child);
        });
      }

      if (callback) callback();
    };

    done(node);
  }
}
