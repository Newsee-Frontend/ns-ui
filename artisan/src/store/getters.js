const getters = {
  //user
  token: state => state.User.userinfo.token,
  userName: state => state.User.userinfo.userName,
  avatar: state => state.User.userinfo.avatar,
  theme: state => state.User.userinfo.theme,

  //layout
  visitedPages: state => state.PageTabs.visitedPages,
  navMenuType: state => state.NavMenu.navMenuType,//菜单栏类型
  navMenuList: state => state.NavMenu.navMenuList,//菜单栏数据

  //form demo
  optionsDataTemplate: state => state.Form.optionsDataTemplate,
  selectTreeOptions: state => state.Tree.selectTreeOptions,

  //table demo
  tableHead: state => state.Table.tableHead,

  //requestHead
  requestHead: state => state.RequestHead.base,
};
export default getters;
