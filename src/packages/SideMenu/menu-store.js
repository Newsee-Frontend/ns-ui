import Node from './node';

export default class TreeStore {
  constructor(options) {
    //绑定对应的属性值 到 constructor 中
    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }

    this.root = new Node({
      data: this.data,
      store: this,
    });
  }

  /**
   * set data - 设置注入组件数据
   * @param newVal
   */
  setNodeData(newVal) {
    const isDataChanged = newVal !== this.root.data;
    console.log(
      isDataChanged ? '导航菜单数据变化，前后数据不一样' : '导航菜单数据变化，前后数据一样'
    );
    if (isDataChanged) {
      //执行 root 中的 setTreeData 方法后，等于重头创建了一个数据root 数据对象
      this.root.setNodeData(newVal);
    } else {
      // this.root.updateChildren();
    }
  }
}
