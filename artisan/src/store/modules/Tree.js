import { selectTreeService } from '../../service/Form/select-tree';

const SelectTreeOptions = {
  state: {
    selectTreeOptions: [],
  },
  mutations: {
    SET_SELECT_TREE_DATA: (state, data) => {
      state.selectTreeOptions = data;
    },
  },
  actions: {
    generateSelectTree({ commit }, data) {
      selectTreeService({ query: 'select-tree' }).then(res => {
        const options = res.resultData || [];
        commit('SET_SELECT_TREE_DATA', options);
      });
    },
  },
};
export default SelectTreeOptions;
