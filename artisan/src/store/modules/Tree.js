import { selectTreeService } from '../../service/Form/select-tree';

const SelectTreeOptions = {
  state: {
    selectTreeOptions: [],

    treeTempData: {},
  },
  mutations: {
    SET_SELECT_TREE_DATA: (state, data) => {
      state.selectTreeOptions = data;
    },

    SET_TREE_DATA: (state, data)  => {
      if(data.key){
        state.treeTempData[data.key] = data.list;
      }
    }
  },
  actions: {
    generateSelectTree({ commit }, data) {
      selectTreeService({ query: 'select-tree' }).then(res => {
        const options = res.resultData || [];
        commit('SET_SELECT_TREE_DATA', options);
      });
    },

    setTreeData({commit},data){
      commit('SET_TREE_DATA',data)
    }
  },
};
export default SelectTreeOptions;
