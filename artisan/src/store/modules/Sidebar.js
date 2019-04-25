import { sideBarService } from '../../service/Sidebar';

const SideBar = {
  state: {
    sideBarList: JSON.parse(sessionStorage.getItem('nav')),
  },
  mutations: {
    SET_SIDEBARDATA: (state, data) => {
      state.sideBarList = data;
      sessionStorage.setItem('nav', JSON.stringify(data));
    },
  },
  actions: {
    GenerateSideBar({ commit }, data) {
      sideBarService({ user: 123 }).then(res => {
        const side = res.resultData || [];

        commit('SET_SIDEBARDATA', side.filter(i => i.hide));
      });
    },
  },
};
export default SideBar;
