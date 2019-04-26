import { sideBarService } from '../../service/Sidebar';

const SideBar = {
  state: {
    sideBarList: JSON.parse(sessionStorage.getItem('nav')),
  },
  mutations: {
    SET_SIDEBAR_DATA: (state, data) => {
      state.sideBarList = data;
      sessionStorage.setItem('nav', JSON.stringify(data));
    },
  },
  actions: {
    generateSideBar({ commit }, data) {
      sideBarService({ user: 123 }).then(res => {
        const side = res.resultData || [];

        commit('SET_SIDEBAR_DATA', side.filter(i => i.hide));
      });
    },
  },
};
export default SideBar;
