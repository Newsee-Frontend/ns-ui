const Drawer = {
  state: {
    switch: false,
  },
  mutations: {
    TOGGLEDRAWERSTATE: state => {
      state.switch = !state.switch;
    },
  },
  actions: {
    toggleDrawerState({ commit }, data) {
      commit('TOGGLEDRAWERSTATE', data);
    },
  },
};
export default Drawer;
