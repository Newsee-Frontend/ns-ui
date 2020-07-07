/*
 * side-bar key refer
 * created: 2017/12/20
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
const keyRefer = {
  funcId: 'funcId', //func-ID
  label: 'menuMenuname', //显示名称
  icon: 'menuIconcls', //图标
  children: 'childMenus', //子集菜单

  visible: 'syStatus', //隐藏 syStatus
  isLeaf: 'isLeaf',//是否叶子节点
  menuRouter: 'menuMenusubname', //路径符号

  templatePath:'templatePath',//模板
  behavior:'behavior', //交互/集成模式
  url:'url',//ifarme 或者 外链 跳转/集成的地址




  menuIndex: 'menuIndex', //序号 syOrderindex
  virtualLabel: 'syPyqc',//虚拟节点的名称 - 暂时存在，后续去除
  isVirtual:'isVirtual',//是否虚拟几点 -  暂时存在，后续去除

};

export default keyRefer;

