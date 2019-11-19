import { listColumnService } from '../../service/Table';

const Table = {
  state: {
    tableHead: [],
  },
  mutations: {
    SET_TABLE_HEAD: (state, data) => {
      state.tableHead = data;
    },
  },
  actions: {
    setTableHead({ commit }, data) {
      commit('SET_TABLE_HEAD', data);
    },
    generateTableHead({ commit }, query) {
      return listColumnService(query).then(res => {
        const head = res.resultData.columns || [];
        console.log('请求到的表头数据：');
        console.log(head);
        commit('SET_TABLE_HEAD', head);
      });
    },
  },
};
export default Table;
