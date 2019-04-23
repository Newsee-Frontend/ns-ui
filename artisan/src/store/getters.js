const getters = {
  token: state => state.User.info.token,
  userName: state => state.User.info.userName,
  avatar: state => state.User.info.avatar,
  drawerState: state => state.Drawer.switch,
  sideBarList: state => state.Sidebar.sideBarList,
};
export default getters;
