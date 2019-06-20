const getters = {
  //user
  token: state => state.User.userinfo.token,
  userName: state => state.User.userinfo.userName,
  avatar: state => state.User.userinfo.avatar,
  theme: state => state.User.userinfo.theme,

  //layout
  visitedPages: state => state.PageTabs.visitedPages,
  sideBarList: state => state.Sidebar.sideBarList,

  //form demo
  optionsDataTemplate: state => state.Form.optionsDataTemplate,
  selectTreeOptions: state => state.Tree.selectTreeOptions,

  //table demo
  tableHead: state => state.Table.tableHead,
};
export default getters;
